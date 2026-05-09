import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      isPremium: {
        type: Boolean,
        default: false,
      },

      subscriptionId: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    userSchema
  );

export default User;