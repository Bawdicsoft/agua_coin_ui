// import { NextResponse } from "next/server";

// import connectDB from "@/lib/db";
// import AuthModel from "@/model/User.model";
// import PaymentModel from "@/model/paymentDetail.model";

// export async function POST(request) {
//   try {
//     const { id, tokens, gramRate, amount, paymentMethod, tokenType, status } =
//       await request.json();

//     console.log("Payload for create-account:", {
//       id,
//       tokens,
//       gramRate,
//       amount,
//       paymentMethod,
//       tokenType,
//       status,
//     });

//     // Connect to DB
//     await connectDB();

//     // Check if user already exists
//     const User = await AuthModel.findOne({ _id: id });
//     if (!User) {
//       console.log("Error while getting user");
//     }
//     console.log("userGet Succesfully from database", User.email);
//     // Save new user
//     const paymentDetail = await PaymentModel.create({
//       name: User.name,
//       email: User.email,
//       walletAddress: User.walletAddress,
//       TokenType: tokenType,
//       TokenQuantity: tokens,
//       totalAmount: amount,
//       status: status,
//     });

//     return NextResponse.json(
//       {
//         message: "Payment Send Successfully ",
//         paymentDetail: paymentDetail,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import connectDB from "@/lib/db";
import paymentDetailModel from "../../../models/paymentDetail.model";
import AuthModel from "../../../models/User.model.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      id,
      gramRate,
      amount,
      paymentMethod,
      tokenQuantity,
      tokenType,
      type,
      paymentType,
      status,
      hash,
      from,
    } = await request.json();
    console.log(
      "initial Data",
      id,
      gramRate,
      amount,
      paymentMethod,
      tokenQuantity,
      tokenType,
      type,
      paymentType,
      status,
      hash,
      from
    );
    await connectDB();

    const user = await AuthModel.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const paymentDetail = await paymentDetailModel.create({
      userId: id,
      name: user.name,
      email: user.email,
      tokenType,
      tokenQuantity: tokenQuantity,
      gramRate,
      totalAmount: amount,
      paymentMethod,
      paymentType,
      tokenStatus: type,
      status,
      transactionHash: hash || "no hash for stripe",
      fromAddress: from,
    });
    console.log(
      "data After posting",
      userId,
      name,
      email,
      tokenType,
      tokenQuantity,
      gramRate,
      totalAmount,
      paymentMethod,
      paymentType,
      tokenStatus,
      status,
      transactionHash,
      fromAddress
    );
    return NextResponse.json(
      { message: "Payment saved successfully", paymentDetail },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
