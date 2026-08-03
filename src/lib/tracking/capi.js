import { hashUserData } from '../utils/hash';
import { createAdminClient } from '../supabase/admin';

// Cache config in memory for the server process lifetime to avoid repeated DB calls
let _cachedConfig = null;
let _cacheExpiry = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

async function getTrackingConfig() {
  const now = Date.now();
  if (_cachedConfig && now < _cacheExpiry) {
    return _cachedConfig;
  }

  try {
    const adminClient = createAdminClient();
    const { data } = await adminClient
      .from('tracking_config')
      .select('meta_pixel_id, meta_access_token, meta_test_event_code, is_active')
      .limit(1)
      .single();

    if (data?.is_active && data?.meta_pixel_id && data?.meta_access_token) {
      _cachedConfig = {
        pixelId: data.meta_pixel_id,
        accessToken: data.meta_access_token,
        testEventCode: data.meta_test_event_code || null,
      };
    } else {
      _cachedConfig = null;
    }

    _cacheExpiry = now + CACHE_TTL_MS;
    return _cachedConfig;
  } catch (err) {
    console.warn('getTrackingConfig error:', err?.message);
    // Fallback to env vars if DB fails
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    if (pixelId && accessToken) {
      return {
        pixelId,
        accessToken,
        testEventCode: process.env.META_TEST_EVENT_CODE || null,
      };
    }
    return null;
  }
}

export async function sendCAPIEvent({ 
  eventName, 
  eventId, 
  eventTime = Math.floor(Date.now() / 1000), 
  sourceUrl, 
  userData = {}, 
  customData = {}, 
  clientIpAddress, 
  clientUserAgent, 
  fbp, 
  fbc, 
  actionSource = 'website'
}) {
  const config = await getTrackingConfig();

  if (!config) {
    console.warn('Meta CAPI credentials missing or tracking disabled, skipping CAPI event.');
    return null;
  }

  const { pixelId, accessToken, testEventCode } = config;

  try {
    const hashedUser = hashUserData(userData);
    
    const eventPayload = {
      data: [{
        event_name: eventName,
        event_time: eventTime,
        action_source: actionSource,
        event_id: eventId,
        event_source_url: sourceUrl,
        user_data: {
          ...hashedUser,
          client_ip_address: clientIpAddress,
          client_user_agent: clientUserAgent,
          fbc,
          fbp,
        },
        custom_data: customData,
      }]
    };

    if (testEventCode) {
      eventPayload.test_event_code = testEventCode;
    }

    const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...eventPayload,
        access_token: accessToken,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to send Meta CAPI event:', error);
    return null;
  }
}
