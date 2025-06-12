import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    walletAddress: {
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
    orderDate: {
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
