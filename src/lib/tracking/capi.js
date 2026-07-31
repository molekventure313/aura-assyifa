import { hashUserData } from '../utils/hash';

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
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    console.warn('Meta CAPI credentials missing, skipping CAPI event.');
    return null;
  }

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
