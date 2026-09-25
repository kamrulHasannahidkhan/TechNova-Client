"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function getGuestPhone(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("guest_phone");
}

export default function GuestContactPrompt() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user) return; // logged-in users already have identity

    const handler = () => {
      const alreadyAsked = sessionStorage.getItem("guest_contact_asked");
      if (!alreadyAsked) setShow(true);
    };

    window.addEventListener("cart:first-add", handler);
    return () => window.removeEventListener("cart:first-add", handler);
  }, [session, status]);

  const handleSave = () => {
    if (phone.trim()) {
      sessionStorage.setItem("guest_phone", phone.trim());
    }
    sessionStorage.setItem("guest_contact_asked", "1");
    setShow(false);
  };

  const handleSkip = () => {
    sessionStorage.setItem("guest_contact_asked", "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-72">
      <p className="text-sm font-semibold text-gray-900 mb-1">Save your cart?</p>
      <p className="text-xs text-gray-500 mb-3">
        Leave your phone number so we can help if you lose your cart. Optional.
      </p>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3"
      />
      <div className="flex gap-2">
        <button onClick={handleSave} className="flex-1 bg-black text-white text-sm font-semibold py-2 rounded-lg">
          Save
        </button>
        <button onClick={handleSkip} className="flex-1 border border-gray-300 text-sm font-medium py-2 rounded-lg">
          Skip
        </button>
      </div>
    </div>
  );
}
