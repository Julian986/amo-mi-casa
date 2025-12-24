import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

/**
 * Endpoint para obtener métricas de la tienda (admin)
 * GET /api/admin/metrics
 * 
 * Requiere autenticación: header 'x-api-key' o 'Authorization: Bearer <key>'
 */
export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    // Si no hay MongoDB configurado, retornar métricas vacías
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ 
        message: "MongoDB not configured",
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        totalRevenue: 0,
        averageTicket: 0,
        productSales: {},
      });
    }

    // Importación dinámica para evitar errores si mongodb no está instalado
    const { getOrderStats } = await import("@/lib/orders");
    
    const stats = await getOrderStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("[admin/metrics] Error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}




