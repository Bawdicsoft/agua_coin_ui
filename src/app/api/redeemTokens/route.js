import { NextResponse } from "next/server";
import AuthModel from "@/model/User.model";
import RedeemModel from "@/model/redeemToken.model";
import connectDB from "@/lib/db";

export async function POST(request) {
  try {
    const {
      id,
      TokenAddress,
      from,
      to,
      TokenType,
      TotalQuantity,
      totalAmount,
      tokenStatus,
      currentRate,
      transactionHash,
      paymentMethod,
      status,
    } = await request.json();

    console.log("Payload for redeem-Token:", {
      id,
      TokenAddress,
      from,
      to,
      TokenType,
      TotalQuantity,
      totalAmount,
      tokenStatus,
      currentRate,
      transactionHash,
      paymentMethod,
      status,
    });

    // Connect to DB
    await connectDB();
    const User = await AuthModel.findOne({ _id: id });
    if (!User) {
      console.log("Error while getting user");
    }
    console.log("userGet Successfully from database", User.email);

    const RedeemUser = await RedeemModel.create({
      userId: id,
      name: User.name,
      email: User.email,
      from: from,
      to: to,
      TokenType: TokenType,
      TokenQuantity: TotalQuantity,
      //   tokenRate: tokenRate,
      totalAmount: totalAmount,
      TokenAddress: TokenAddress,
      tokenStatus: tokenStatus,
      currentRate: currentRate,
      transactionHash: transactionHash,
      paymentMethod: paymentMethod,
      status: status,
    });

    return NextResponse.json(
      { message: "Redeem request Send successfully to Admin" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
