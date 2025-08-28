import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI); // 👈 sin opciones extra
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error de conexión MongoDB", err.message);
    process.exit(1);
  }
}

export default connectDB;
