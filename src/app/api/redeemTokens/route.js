import { NextResponse } from "next/server";
import AuthModel from "../../../models/User.model";
import RedeemModel from "../../../models/redeemToken.model";
import connectDB from "@/lib/db";

export async function POST(request) {
  try {
    const {
      id,
      TokenAddress,
      from,
      TokenType,
      TotalQuantity,
      totalAmount,
      tokenStatus,
      currentRate,
      transactionHash,
      status,
    } = await request.json();

    console.log("Payload for redeem-Token:", {
      id,
      TokenAddress,
      from,
      TokenType,
      TotalQuantity,
      totalAmount,
      tokenStatus,
      currentRate,
      transactionHash,
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
      fromAddress: from,
      tokenType: TokenType,
      tokenQuantity: TotalQuantity,
      //   tokenRate: tokenRate,
      totalAmount: totalAmount,
      TokenAddress: TokenAddress,
      tokenStatus: tokenStatus,
      currentRate: currentRate,
      transactionHash: transactionHash,
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
