"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutDashboard } from "lucide-react";
import type { Order } from "@/lib/types/order";

type Metrics = {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  totalRevenue: number;
  averageTicket: number;
  productSales: Record<string, number>;
};

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  // Scroll suave hacia arriba al montar la página
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  const handleLogin = async () => {
    if (!apiKey.trim()) {
      setError("Ingresá una API key");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Probar con métricas (endpoint más simple)
      const res = await fetch("/api/admin/metrics", {
        headers: {
          "x-api-key": apiKey.trim(),
        },
      });

      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_api_key", apiKey.trim());
        await loadData(apiKey.trim());
      } else {
        // Mensaje de error fijo a pedido del cliente
        setError("Credenciales incorrectas");
      }
    } catch (e) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (key: string) => {
    try {
      // Cargar métricas
      const metricsRes = await fetch("/api/admin/metrics", {
        headers: { "x-api-key": key },
      });
      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }

      // Cargar órdenes
      const ordersRes = await fetch(
        `/api/admin/orders?limit=100&status=${statusFilter === "all" ? "" : statusFilter}`,
        {
          headers: { "x-api-key": key },
        }
      );
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      }
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  // Verificar si hay API key guardada al montar
  useEffect(() => {
    const savedKey = localStorage.getItem("admin_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setIsAuthenticated(true);
      loadData(savedKey);
    }
  }, []);

  // Recargar órdenes cuando cambia el filtro
  useEffect(() => {
    if (isAuthenticated && apiKey) {
      loadData(apiKey);
    }
  }, [statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-16 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Admin - Amo Mi Casa</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Ingresá tu API key para acceder al panel de administración
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                placeholder="Ingresá tu API key"
                className="mt-1"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
            <Button onClick={handleLogin} disabled={loading} className="w-full">
              {loading ? "Verificando..." : "Ingresar"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 mt-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Panel de Control
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem("admin_api_key");
              setApiKey("");
              setMetrics(null);
              setOrders([]);
            }}
          >
            Cerrar sesión
          </Button>
        </div>

        {/* Métricas */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Órdenes</p>
              <p className="text-2xl font-bold">{metrics.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Aprobadas</p>
              <p className="text-2xl font-bold text-green-600">{metrics.approved}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-600">{metrics.pending}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Facturación Total</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(metrics.totalRevenue)}
              </p>
            </div>
          </div>
        )}

        {/* Filtros y lista de órdenes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              >
                <option value="all">Todas las órdenes</option>
                <option value="pending">Pendientes</option>
                <option value="approved">Aprobadas</option>
                <option value="rejected">Rechazadas</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Envío
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Productos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No hay órdenes
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id || order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 text-sm font-mono">{order.orderId}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="space-y-1 min-w-[220px]">
                          <p className="font-medium">{order.customer.fullName || "Sin nombre"}</p>
                          {order.customer.email && (
                            <p className="text-gray-500 text-xs">{order.customer.email}</p>
                          )}
                          {order.customer.phone && (
                            <p className="text-gray-500 text-xs">{order.customer.phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="space-y-1 min-w-[260px]">
                          {(order.customer.street || order.customer.addressNumber) && (
                            <p className="text-gray-700 dark:text-gray-300 text-xs">
                              {[order.customer.street, order.customer.addressNumber]
                                .filter(Boolean)
                                .join(" ")}
                              {order.customer.apartment ? `, ${order.customer.apartment}` : ""}
                            </p>
                          )}
                          {(order.customer.city || order.customer.province) && (
                            <p className="text-gray-700 dark:text-gray-300 text-xs">
                              {[order.customer.city, order.customer.province].filter(Boolean).join(", ")}
                            </p>
                          )}
                          {!order.customer.street && !order.customer.addressNumber && order.customer.address && (
                            <p className="text-gray-700 dark:text-gray-300 text-xs">{order.customer.address}</p>
                          )}
                          {order.customer.postalCode && (
                            <p className="text-gray-700 dark:text-gray-300 text-xs">CP: {order.customer.postalCode}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-xs">
                              {item.name} x{item.quantity}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



