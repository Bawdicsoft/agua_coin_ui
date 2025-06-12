// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     walletAddress: {
//       type: String,
//       required: [true, "Wallet address is required"],
//       unique: true,
//     },
//     TokenType: {
//       type: String,
//       required: true,
//     },
//     TokenQuantity: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt
//   }
// );

// // Prevent model overwrite during hot reloads (for Next.js)
// const PaymentModel =
//   mongoose.models.PaymentDetail ||
//   mongoose.model("paymentDetail", PaymentSchema);

// export default PaymentModel;

// import mongoose from "mongoose";

// const PaymentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       // required: [true, "Name is required"],
//     },
//     email: {
//       type: String,
//     },
//     walletAddress: {
//       type: String,
//       // required: [true, "Wallet address is required"],
//     },
//     TokenType: {
//       type: String,
//       // required: true,
//     },
//     TokenQuantity: {
//       type: String,
//       // required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     totalAmount: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const PaymentModel =
//   mongoose.models.paymentDetail ||
//   mongoose.model("paymentDetail", PaymentSchema);

// export default PaymentModel;

import mongoose from "mongoose";

const paymentDetailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,

  tokenType: String,
  paymentType: String,
  walletAddress: String,
  tokenQuantity: Number,
  gramRate: Number,
  totalAmount: Number,
  paymentMethod: String,
  tokenStatus: String,
  status: String,
  transactionHash: String,
  fromAddress: String,
  toAddress: String,
  network: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PaymentDetail ||
  mongoose.model("PaymentDetail", paymentDetailSchema);
