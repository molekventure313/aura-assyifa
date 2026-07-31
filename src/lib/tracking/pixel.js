// Client-side Meta Pixel helpers
export function initPixel(pixelId) {
  if (!pixelId || typeof window === 'undefined') return;

  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', pixelId);
}

export function trackEvent(eventName, params = {}, eventId = null) {
  if (typeof window === 'undefined' || !window.fbq) return;
  
  const options = eventId ? { eventID: eventId } : undefined;
  window.fbq('track', eventName, params, options);
}

export function trackPageView() {
  trackEvent('PageView');
}

export function trackLead(params = {}, eventId = null) {
  trackEvent('Lead', params, eventId);
}

export function trackFormSubmit(params = {}, eventId = null) {
  trackEvent('Lead', params, eventId);
}

export function generateEventId() {
  return `evt_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
}

export function getPixelCookies() {
  if (typeof document === 'undefined') return { fbp: null, fbc: null };
  
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  return {
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc')
  };
}
