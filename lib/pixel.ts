const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_URL;

function visitorId() {
  let id = sessionStorage.getItem("visitor_id");
  if (!id) {
    id = Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("visitor_id", id);
  }
  return id;
}

// Sends an event to your own admin app (shown on the Pixel Events page)
export function logEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    fetch(`${ADMIN_API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        visitorId: visitorId(),
        source: sessionStorage.getItem("traffic_source") || "direct",
        page: window.location.pathname,
        label: data?.content_name,
        value: data?.value,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block the site
  }
}

export function trackPixel(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  logEvent(event, data);

  const w = window as any;
  const send = () => w.fbq("track", event, data);

  if (w.fbq) {
    send();
    return;
  }

  // The Pixel script may still be loading: retry for up to 5 seconds
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (w.fbq) {
      clearInterval(timer);
      send();
    } else if (tries > 20) {
      clearInterval(timer);
    }
  }, 250);
}
