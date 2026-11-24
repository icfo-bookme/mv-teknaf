"use client";

import { EVENTS, trackEvent } from "@/lib/analytics";

export default function TrackedLink({ href, location, children, onClick, ...anchorProps }) {
  function handleClick(event) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (href.startsWith("tel:")) {
      trackEvent(EVENTS.phone, location);
    } else if (href.startsWith("https://wa.me/")) {
      trackEvent(EVENTS.whatsapp, location);
    }
  }

  return (
    <a {...anchorProps} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
