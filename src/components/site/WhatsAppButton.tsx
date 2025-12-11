import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_PHONE, WHATSAPP_DEFAULT_TEXT } from "@/lib/constants";

const DEFAULT_TEXT = encodeURIComponent(WHATSAPP_DEFAULT_TEXT || "Hola! Quisiera hacer una consulta");

export default function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/${WHATSAPP_PHONE}?text=${DEFAULT_TEXT}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
    >
      <FaWhatsapp className="h-7 w-7" />
    </Link>
  );
}


