import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017/graphql");
} catch (error) {
  console.log("mongoose connection error");
  process.exit(error);
}
