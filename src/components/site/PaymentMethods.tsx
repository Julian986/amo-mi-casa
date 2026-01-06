import { Wallet } from "lucide-react";

export default function PaymentMethods() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-stone-900">Métodos de pago</h3>
      <ul className="mt-3 space-y-2 text-sm text-stone-700">
        <li className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-stone-600" />
          Mercado Pago (tarjeta o billetera, 1 pago)
        </li>
      </ul>
    </div>
  );
}


