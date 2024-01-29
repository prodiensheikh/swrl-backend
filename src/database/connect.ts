import mongoose from "mongoose";

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const mongoUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

export default async function connect() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
}
