

Actualización 5/1
Cosas a revisar
- Nombre de la cafetera

Tasks
- Envíos y cambios: Cambios? lo quitamos?
- Poner codigo de promocion - pedido por cliente
- Guardar el nombre y el telefono del usuario cuando pone pagar✅
- Mensaje de error del formulario de admin
- Pagar con mercado pago, pagar✅



Actualizacion 28/12

Objetivo:
- Implementar  MongoDB + admin + webhooks✅


Tasks
- Quitar el sanbox, que sigue ahi.✅

- El mismo diseño de la flecha izquierda de "Carrito" implementarla en productDetail "Volver"✅
- Scroll hacia arriba Pagina Checkout: Al ir a esta pagina no sube hasta arriba del todo en la pagina✅
- Metodos de pago, sacar el metodo de transferencia. Dejar solo MP✅
- Organizate✅


Temas de Integracion con mercado pago:

Plan paso a paso:
En este punto, el objetivo es pasar de “funciona en sandbox con tu token” a “cobra en la cuenta del cliente en producción” y dejarlo prolijo.
Lo que haría ahora (orden recomendado)
1) Tomar credenciales correctas del cliente
Copiá de la app “amo mi casa”:
Access Token de PRUEBA (para seguir testeando)
Access Token de PRODUCCIÓN (para cuando salgan a vender)
2) Configurar Vercel (entornos)
En el proyecto de Vercel:
Preview / Development (para pruebas):
MERCADOPAGO_ACCESS_TOKEN = token de prueba
MERCADOPAGO_USE_SANDBOX=true
NEXT_PUBLIC_SITE_URL = https://tuapp.vercel.app (o el preview)
Production (venta real):
MERCADOPAGO_ACCESS_TOKEN = token de producción
MERCADOPAGO_USE_SANDBOX=false
NEXT_PUBLIC_SITE_URL = https://tu-dominio.com (o https://tuapp.vercel.app si usan ese)
3) Deploy y prueba end-to-end en Vercel
Hacé una compra de prueba con sandbox desde el dominio de Vercel.
Luego una compra real (si ya quieren) con producción.
4) Checklist de “listo para vender”
Confirmar que /checkout/success|pending|failure funcionan y el mensaje es correcto.
Definir política: cuándo vaciar carrito (hoy lo vacía solo si vuelve “approved”).
Dejar MERCADOPAGO_USE_SANDBOX en false en producción.
5) (Opcional pero recomendado) Webhook + órdenes
Si querés estadísticas y confirmación confiable, el siguiente paso es webhook + guardar orden (más adelante DB).
Si querés, decime si ya tenés el proyecto deployado en Vercel y qué dominio van a usar (vercel.app o dominio propio), y te digo exactamente qué valores poner en cada variable de entorno.






- ¿Querés integrar más rápido?
Invitá a colaboradores y trabajá en equipo. Cada colaborador tiene acceso individual a tu integración y solo puede ingresar a las páginas que autorices.


- Acelerá tu integración
Al conectar el MCP Server a tu IDE, simplificás tareas de desarrollo y construís integraciones de calidad en menos tiempo.

Explorar MCP

Data
- 12 Imagenes

- Esta es la información en texto de nombres y precios:

Manteles anti manchas $ 65 mil
Bolso matero $45 mil
Lonchera niños $35 mil
Recipientes organizadores x 6 $40 mil
Vasos térmicos $35 mil
Botellita plegable $25 mil 
Pava eléctrica RETRO $50 mil
Pava eléctrica con sensor de temperatura $60 mil

## Mercado Pago (Checkout Pro) - Configuración

Este proyecto crea un link de pago dinámico según el carrito usando un endpoint server-side en Next:
- `POST /api/mercadopago/create-preference`

### Variables de entorno (local / Vercel)

Por seguridad, **NO pegues tu Access Token en el frontend**.

Configurar en tu entorno (por ejemplo en `.env.local` localmente, y en Variables de Entorno de Vercel):

- `MERCADOPAGO_ACCESS_TOKEN`: Access Token secreto de Mercado Pago (sandbox o prod).
- `NEXT_PUBLIC_SITE_URL`: base URL del sitio para `back_urls` (en dev, este repo corre con `next dev -p 5700`).
  - Ejemplo dev: `http://localhost:5700`
  - Ejemplo prod: `https://tu-dominio.com`
- `MERCADOPAGO_USE_SANDBOX` (opcional): `true` para redirigir a `sandbox_init_point`.