export function trackPixel(event: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
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
