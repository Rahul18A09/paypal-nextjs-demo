import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      subscriptionId: {
        type: String,
        required: true,
        unique: true,
      },

      planId: {
        type: String,
      },

      status: {
        type: String,
      },

      email: {
        type: String,
      },

      payerId: {
        type: String,
      },

      startTime: {
        type: String,
      },

      nextBillingTime: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model(
    "Subscription",
    subscriptionSchema
  );

export default Subscription;