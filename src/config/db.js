import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error de conexión MongoDB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
