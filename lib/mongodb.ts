import mongoose from "mongoose";

import { MONGODB_URI } from "./env";

export async function connectDB() {
  try {
    if (
      mongoose.connections[0]
        .readyState
    ) {
      return;
    }

    await mongoose.connect(
      MONGODB_URI
    );

    console.log(
      "MongoDB Connected"
    );
  } catch (error) {
    console.log(
      "MongoDB Error:",
      error
    );

    throw error;
  }
}