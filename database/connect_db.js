import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log("Conectado a la base de datos con exito");
    
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error.message}`);
    
  }
}