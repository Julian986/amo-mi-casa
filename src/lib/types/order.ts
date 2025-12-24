export type OrderStatus = "pending" | "approved" | "rejected" | "cancelled" | "refunded";

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  image?: string;
};

export type OrderCustomer = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalCode?: string;
};

export type Order = {
  _id?: string;
  orderId: string; // ID único generado por nosotros (ej: ORD-2025-001)
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: "transfer" | "mercadopago";
  // Mercado Pago
  preferenceId?: string; // ID de la preferencia de MP
  paymentId?: string; // ID del pago de MP (viene en el webhook)
  mpStatus?: string; // status de MP (approved, pending, rejected, etc.)
  // Estado
  status: OrderStatus;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  // Notas
  notes?: string;
};



