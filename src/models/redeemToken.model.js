import mongoose from "mongoose";

const RedeemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      // required: [true, "Name is required"],
    },
    email: {
      type: String,
    },
    from: {
      type: String,
      // required: [true, "Wallet address is required"],
    },
    to: {
      type: String,
      // required: [true, "Wallet address is required"],
    },
    TokenType: {
      type: String,
      // required: true,
    },
    TokenQuantity: {
      type: String,
      // required: true,
    },
    totalAmount: {
      type: String,
    },
    TokenAddress: {
      type: String,
    },
    tokenStatus: {
      type: String,
    },
    currentRate: {
      type: String,
    },
    transactionHash: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const RedeemModel =
  mongoose.models.RedeemDetail || mongoose.model("RedeemDetail", RedeemSchema);

export default RedeemModel;
