"use client";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-[--ink] text-white px-6 py-4 flex flex-col sm:flex-row items-center gap-4 justify-between">
      <p className="text-sm text-white/80">
        We use cookies to keep you signed in and remember your cart.{" "}
        <a href="/privacy" className="underline">Learn more</a>
      </p>
      <button onClick={accept} className="bg-white text-[--ink] text-sm font-semibold px-4 py-2 rounded-lg shrink-0">
        Accept
      </button>
    </div>
  );
}
