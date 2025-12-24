/**
 * Script de prueba para verificar conexión a MongoDB y creación de órdenes
 * Ejecutar: node test-mongodb.js
 * 
 * IMPORTANTE: Este script lee las variables de .env.local manualmente
 * Asegúrate de tener MONGODB_URI y MONGODB_DB_NAME configuradas
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Leer .env.local manualmente
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: No se encontró .env.local');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  return env;
}

const env = loadEnv();
process.env.MONGODB_URI = env.MONGODB_URI || process.env.MONGODB_URI;
process.env.MONGODB_DB_NAME = env.MONGODB_DB_NAME || process.env.MONGODB_DB_NAME;

async function testMongoDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'amo-mi-casa';

  if (!uri) {
    console.error('❌ Error: MONGODB_URI no está configurada en .env.local');
    process.exit(1);
  }

  console.log('🔌 Conectando a MongoDB...');
  console.log(`📦 Base de datos: ${dbName}`);

  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Conexión exitosa a MongoDB');

    const db = client.db(dbName);
    
    // Listar colecciones existentes
    const collections = await db.listCollections().toArray();
    console.log('\n📚 Colecciones existentes:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });

    // Verificar colección "orders"
    const ordersCollection = db.collection('orders');
    const ordersCount = await ordersCollection.countDocuments();
    console.log(`\n📦 Órdenes en la colección "orders": ${ordersCount}`);

    // Crear una orden de prueba
    console.log('\n🧪 Creando orden de prueba...');
    const testOrder = {
      orderId: `TEST-${Date.now()}`,
      items: [
        {
          id: 'test-product',
          name: 'Producto de Prueba',
          quantity: 1,
          unitPrice: 1000,
        }
      ],
      subtotal: 1000,
      total: 1000,
      customer: {
        fullName: 'Cliente de Prueba',
        email: 'test@example.com',
      },
      paymentMethod: 'test',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await ordersCollection.insertOne(testOrder);
    console.log(`✅ Orden de prueba creada con ID: ${result.insertedId}`);

    // Verificar que se guardó
    const savedOrder = await ordersCollection.findOne({ _id: result.insertedId });
    console.log(`✅ Orden verificada: ${savedOrder.orderId}`);

    // Eliminar la orden de prueba
    await ordersCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Orden de prueba eliminada');

    console.log('\n✅ ¡Todo funciona correctamente!');
    console.log('📝 La colección "orders" está lista para recibir órdenes reales.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('authentication')) {
      console.error('💡 Verifica que el usuario y contraseña en MONGODB_URI sean correctos');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.error('💡 Verifica que la URL de MongoDB sea correcta y que tu IP esté autorizada en MongoDB Atlas');
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Conexión cerrada');
    }
  }
}

testMongoDB();

