# Amo Mi Casa - Tienda Online

Una hermosa tienda donde vas a encontrar cosas bellísimas.

## 🚀 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago
NEXT_PUBLIC_SITE_URL=http://localhost:5700

# MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/amo-mi-casa?retryWrites=true&w=majority
MONGODB_DB_NAME=amo-mi-casa

# Admin API Key (generar una clave segura)
ADMIN_API_KEY=tu_api_key_segura_aqui
```

### Generar ADMIN_API_KEY

Para generar una API key segura, puedes usar uno de estos métodos:

**Opción 1: Node.js (recomendado)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Opción 2: Online**
- Usa un generador de tokens seguros como: https://randomkeygen.com/
- Selecciona "CodeIgniter Encryption Keys" o similar
- Copia una clave de al menos 32 caracteres

**Opción 3: Manual**
- Crea una cadena aleatoria de al menos 32 caracteres
- Mezcla letras, números y símbolos

### Configuración en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables de `.env.local`
4. **IMPORTANTE**: Para `NEXT_PUBLIC_SITE_URL`, usa tu dominio real (ej: `https://tu-dominio.com`)
5. Para `ADMIN_API_KEY`, usa la misma clave que generaste localmente

### Webhook de Mercado Pago

**⚠️ IMPORTANTE**: Sin configurar el webhook, los pagos quedarán en estado "pending" y nunca se actualizarán automáticamente.

#### Configuración en Mercado Pago Developers:

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Inicia sesión con la cuenta de tu cliente (la que recibe los pagos)
3. Selecciona tu aplicación (ej: "amo mi casa")
4. En el menú lateral, busca **"Notificaciones Webhooks"** o **"Webhooks"**
5. Haz clic en **"Configurar notificaciones"** o **"Agregar URL"**
6. Ingresa la URL de tu webhook:
   ```
   https://amo-mi-casa.vercel.app/api/mercadopago/webhook
   ```
   (Reemplaza con tu dominio real si es diferente)
7. Selecciona los eventos que quieres recibir:
   - ✅ **payment** (obligatorio - notifica cambios en pagos)
   - ✅ **merchant_order** (opcional - notifica cambios en órdenes)
8. Guarda la configuración

#### Verificación:

- Mercado Pago puede hacer un GET a tu webhook para verificar que existe
- Si todo está bien, verás un check verde en el panel
- Los pagos aprobados deberían actualizar automáticamente el estado en `/admin`

#### Debugging:

Si los pagos siguen en "pending":
1. Verifica los logs en Vercel → tu proyecto → Logs
2. Busca mensajes que empiecen con `[webhook]`
3. Verifica que la URL del webhook en Mercado Pago sea exactamente: `https://tu-dominio.com/api/mercadopago/webhook`
4. Asegúrate de que el webhook esté configurado en **producción**, no en sandbox

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5700`

## 🔐 Panel de Administración

Accede a `/admin` para ver:
- Métricas de ventas
- Lista de órdenes
- Estadísticas de productos

**IMPORTANTE**: Necesitas configurar `ADMIN_API_KEY` en `.env.local` para acceder.

## 🚢 Producción

1. Configura todas las variables de entorno en Vercel
2. Asegúrate de usar el Access Token de **producción** de Mercado Pago
3. Configura el webhook con tu dominio real
4. Verifica que `NEXT_PUBLIC_SITE_URL` apunte a tu dominio

## 📝 Notas

- El panel admin requiere autenticación mediante API key
- Las órdenes se guardan automáticamente en MongoDB
- Los webhooks actualizan el estado de las órdenes en tiempo real
