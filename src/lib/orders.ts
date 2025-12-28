import { getDb } from "./mongodb";
import type { Order, OrderStatus } from "./types/order";

/**
 * Genera un ID único de orden (ej: ORD-2025-001)
 */
function generateOrderId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${year}-${random}`;
}

/**
 * Guarda una nueva orden en la base de datos
 */
export async function createOrder(
  orderData: Omit<Order, "_id" | "orderId" | "createdAt" | "updatedAt" | "status">
): Promise<Order> {
  const db = await getDb();
  const orders = db.collection<Order>("orders");

  const order: Order = {
    ...orderData,
    orderId: generateOrderId(),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await orders.insertOne(order);
  return { ...order, _id: result.insertedId.toString() };
}

/**
 * Busca una orden por preferenceId (de Mercado Pago)
 */
export async function findOrderByPreferenceId(preferenceId: string): Promise<Order | null> {
  const db = await getDb();
  const orders = db.collection<Order>("orders");
  return (await orders.findOne({ preferenceId })) as Order | null;
}

/**
 * Busca una orden por paymentId (de Mercado Pago)
 */
export async function findOrderByPaymentId(paymentId: string): Promise<Order | null> {
  const db = await getDb();
  const orders = db.collection<Order>("orders");
  return (await orders.findOne({ paymentId })) as Order | null;
}

/**
 * Actualiza el estado de una orden
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  paymentId?: string,
  mpStatus?: string
): Promise<boolean> {
  const db = await getDb();
  const orders = db.collection<Order>("orders");

  const update: Partial<Order> = {
    status,
    updatedAt: new Date(),
  };

  if (paymentId) update.paymentId = paymentId;
  if (mpStatus) update.mpStatus = mpStatus;

  const result = await orders.updateOne(
    { orderId },
    { $set: update }
  );

  return result.modifiedCount > 0;
}

/**
 * Obtiene todas las órdenes (con paginación opcional)
 */
export async function getAllOrders(
  limit = 50,
  skip = 0,
  status?: OrderStatus
): Promise<Order[]> {
  const db = await getDb();
  const orders = db.collection<Order>("orders");

  const query = status ? { status } : {};
  const cursor = orders.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);

  return (await cursor.toArray()) as Order[];
}

/**
 * Obtiene estadísticas de órdenes
 */
export async function getOrderStats() {
  const db = await getDb();
  const orders = db.collection<Order>("orders");

  const total = await orders.countDocuments();
  const approved = await orders.countDocuments({ status: "approved" });
  const pending = await orders.countDocuments({ status: "pending" });
  const rejected = await orders.countDocuments({ status: "rejected" });

  // Total facturado (solo órdenes aprobadas)
  const approvedOrders = await orders
    .find({ status: "approved" })
    .toArray() as Order[];

  const totalRevenue = approvedOrders.reduce((sum, order) => sum + order.total, 0);

  // Ventas por producto
  const productSales: Record<string, number> = {};
  approvedOrders.forEach((order) => {
    order.items.forEach((item) => {
      productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
    });
  });

  return {
    total,
    approved,
    pending,
    rejected,
    totalRevenue,
    averageTicket: approved > 0 ? totalRevenue / approved : 0,
    productSales,
  };
}







