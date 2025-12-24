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

1. Ve a tu cuenta de Mercado Pago Developers
2. Selecciona tu aplicación
3. Ve a "Webhooks"
4. Agrega la URL: `https://tu-dominio.com/api/mercadopago/webhook`
5. Selecciona los eventos: `payment`, `merchant_order`

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
