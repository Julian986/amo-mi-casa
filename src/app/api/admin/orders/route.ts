import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * Endpoint para obtener todas las órdenes (admin)
 * GET /api/admin/orders?limit=50&skip=0&status=approved
 * 
 * Requiere autenticación: header 'x-api-key' o 'Authorization: Bearer <key>'
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    // Si no hay MongoDB configurado, retornar array vacío
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ 
        orders: [], 
        message: "MongoDB not configured" 
      });
    }

    // Importación dinámica para evitar errores si mongodb no está instalado
    const { getAllOrders } = await import("@/lib/orders");
    
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit") || "50");
    const skip = Number(searchParams.get("skip") || "0");
    const status = searchParams.get("status") as
      | "pending"
      | "approved"
      | "rejected"
      | "cancelled"
      | "refunded"
      | undefined;

    const orders = await getAllOrders(limit, skip, status);
    return NextResponse.json({ orders, limit, skip, status });
  } catch (error) {
    console.error("[admin/orders] Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




