"use client";

import { buildWhatsAppLink } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/siteConfig";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  label?: string;
  variant?: "floating" | "inline";
}

// Renders nothing (returns null) when siteConfig.contact.whatsappNumber is
// empty, per the requirement to never hardcode a placeholder number.
export function WhatsAppButton({
  message = siteConfig.whatsappMessages.general,
  className = "",
  label = "Chat on WhatsApp",
  variant = "floating",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);
  if (!href) return null;

  const handleClick = () => track("whatsapp_click", { message });

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`btn-secondary ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={label}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.36 4 15c0 2.36.68 4.55 1.86 6.42L4 29l7.78-1.81A11.9 11.9 0 0 0 16.02 27C22.63 27 28 21.64 28 15S22.63 3 16.02 3Zm0 21.7c-2.02 0-3.9-.58-5.5-1.58l-.4-.24-4.6 1.07 1.1-4.48-.26-.42A9.63 9.63 0 0 1 6.3 15c0-5.36 4.37-9.72 9.72-9.72 5.36 0 9.72 4.36 9.72 9.72 0 5.36-4.36 9.7-9.72 9.7Zm5.32-7.27c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.75.94-.92 1.13-.17.2-.34.22-.63.07-.29-.15-1.2-.44-2.3-1.42-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.19 3.02.15.2 2.06 3.14 4.99 4.4.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.11.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34Z" />
      </svg>
    </a>
  );
}
