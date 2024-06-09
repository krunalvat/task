import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const mongo_url = process.env.MONGO_URL;

    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default connectDatabase;
