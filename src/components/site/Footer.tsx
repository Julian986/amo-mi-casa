import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900">Categorías</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li><Link href="/c/textiles" className="hover:text-stone-900">Textiles</Link></li>
              <li><Link href="/c/cocina" className="hover:text-stone-900">Cocina</Link></li>
              <li><Link href="/c/bano" className="hover:text-stone-900">Baño</Link></li>
              <li><Link href="/c/decoracion" className="hover:text-stone-900">Decoración</Link></li>
              <li><Link href="/c/esencias" className="hover:text-stone-900">Esencias y Aromas</Link></li>
              <li><Link href="/c/iluminacion" className="hover:text-stone-900">Iluminación</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900">Ayuda</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li><Link href="/faq" className="hover:text-stone-900">Preguntas Frecuentes</Link></li>
              <li><Link href="/como-comprar" className="hover:text-stone-900">Cómo Comprar</Link></li>
              <li><Link href="/envios-cambios" className="hover:text-stone-900">Envíos / Cambios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>WhatsApp: +54 11 5056-2136</li>
              <li>Email: natalia@amomicasa.com</li>
              {/* <li>Dirección: a definir</li> */}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6 text-xs text-stone-600">
          <div>© {new Date().getFullYear()} Amo mi casa. Todos los derechos reservados.</div>
          <div className="mt-1">
            Creado por{" "}
            <a
              href="https://glomun.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-900"
            >
              glomun.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


