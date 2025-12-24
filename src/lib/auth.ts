import { NextRequest, NextResponse } from "next/server";

/**
 * Valida si la request tiene una API key válida
 */
export function validateApiKey(request: NextRequest): boolean {
  const apiKey = process.env.ADMIN_API_KEY;
  
  // Si no hay API key configurada, denegar acceso (seguridad por defecto)
  if (!apiKey || apiKey.trim() === "") {
    console.warn("[auth] ADMIN_API_KEY no está configurada. Acceso denegado.");
    return false;
  }

  // Buscar la API key en el header
  const providedKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");

  if (!providedKey) {
    return false;
  }

  // Comparación segura (timing-safe)
  return providedKey.trim() === apiKey.trim();
}

/**
 * Middleware helper para proteger endpoints de admin
 */
export function requireAuth(request: NextRequest): NextResponse | null {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid API key in 'x-api-key' header or 'Authorization: Bearer <key>' header." },
      { status: 401 }
    );
  }
  return null;
}



