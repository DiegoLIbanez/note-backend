import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error Connection to mongoDb: ${error.message}`);
    process.exit(1);
  }
};
