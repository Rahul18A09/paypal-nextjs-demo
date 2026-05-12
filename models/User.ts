import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  subscriptionStatus: {
    type: String,
    enum: ["active", "cancelled", "none"],
    default: "none",
  },
  paypalSubscriptionId: {
    type: String,
    index: true,
  },
  trialStart: {
    type: Date,
  },
  trialEnd: {
    type: Date,
  },
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);