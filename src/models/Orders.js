import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    TokenType: {
      type: String,
    },
    quantity: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    tokenAddress: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
    },
    tokenStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.OrderDetails || mongoose.model("OrderDetails", OrderSchema);

export default OrderModel;
