import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

export default connectDb;
