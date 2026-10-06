"use client";

const WHATSAPP_NUMBER = "8801606586207"; // TODO: replace with your real WhatsApp number (country code, no +, no spaces)
const TELEGRAM_USERNAME = "yourusername"; // TODO: replace with your real Telegram username (no @)

export default function FloatingContactButtons() {
  return (
    <div className="fixed right-4 bottom-4 z-[90] flex flex-row gap-3">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.25 0 4.36.88 5.95 2.47a8.3 8.3 0 0 1 2.46 5.92c0 4.55-3.71 8.25-8.42 8.25a8.3 8.3 0 0 1-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.27-4.4c0-4.6 3.71-8.37 8.31-8.37zm-3.24 4.4c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.18 1.76 2.84 4.37 3.86 2.16.86 2.6.68 3.07.64.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.07-.11-.24-.17-.5-.3-.27-.13-1.58-.78-1.82-.87-.25-.09-.43-.13-.6.13-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.34-.8-.72-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.13-.6-1.46-.84-2-.22-.53-.44-.46-.6-.46z"/>
        </svg>
      </a>

      <a
        href={`https://t.me/${TELEGRAM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Telegram"
        className="w-12 h-12 rounded-full bg-[#229ED9] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M21.94 3.52a1.5 1.5 0 0 0-1.6-.22L2.74 10.66a1.3 1.3 0 0 0 .13 2.44l4.52 1.44 1.75 5.63c.14.46.52.78 1 .83.47.04.92-.2 1.14-.63l2.4-4.67 4.68 3.46c.25.19.56.29.87.29.19 0 .38-.04.56-.11.44-.18.76-.56.85-1.03l3.1-14.6a1.5 1.5 0 0 0-.8-1.19zM9.1 13.93l-3.6-1.15 12.8-7.9-9.2 9.05zm1.37 4.4-1.02-3.3 1.86-1.83.5 3.78a.34.34 0 0 1-.1.26l-1.24 1.09zm9-13.77-2.65 12.47-5-3.7 7.3-9.1.35.33z"/>
        </svg>
      </a>
    </div>
  );
}