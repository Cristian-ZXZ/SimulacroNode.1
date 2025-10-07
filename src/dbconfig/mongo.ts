import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/eventos_logs";

export async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Conexión existosa a MongoDB");
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    throw err; 
  }
}

export default mongoose;
