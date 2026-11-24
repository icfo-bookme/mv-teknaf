export const EVENTS = {
  phone: "phone_click",
  whatsapp: "whatsapp_click",
  lead: "generate_lead",
};

const allowedEvents = new Set(Object.values(EVENTS));

export function trackEvent(event, location) {
  if (
    typeof window === "undefined" ||
    process.env.NEXT_PUBLIC_GTM_ID === "" ||
    !allowedEvents.has(event) ||
    !location
  ) {
    return;
  }

  const locationKey = event === EVENTS.lead ? "form_location" : "cta_location";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    [locationKey]: location,
    page_path: window.location.pathname,
  });
}
