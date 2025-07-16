import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import OrderModel from "../../../models/Orders.js";
import PaymentDetailModel from "../../../models/paymentDetail.model.js";
import RedeemModel from "../../../models/redeemToken.model.js";
export async function POST(request) {
  try {
    const {
      id,
      userId,
      TokenAddress,
      from,
      to,
      TokenType,
      TokenQuantity,
      tokenStatus,
      status,
      name,
      email,
      totalAmount,
    } = await request.json();

    console.log("Payload for Orders:", {
      id,
      userId,
      TokenAddress,
      from,
      to,
      TokenType,
      TokenQuantity,
      tokenStatus,
      status,
      name,
      email,
      totalAmount,
    });

    // Connect to DB
    await connectDB();

    if (tokenStatus === "redeem") {
      const delDetail = await RedeemModel.findByIdAndDelete({ _id: id });
      console.log("Order Detail del successfully");
      if (!delDetail) {
        console.log("error while deleting data");
        return;
      }
    } else {
      const delDetail = await PaymentDetailModel.findByIdAndDelete({ _id: id });
      console.log("Payment Detail del successfully");
      if (!delDetail) {
        console.log("error while deleting data");
        return;
      }
    }

    const ApprovedOrders = await OrderModel.create({
      orderId: id,
      userId: userId,
      name: name,
      email: email,
      tokenAddress: TokenAddress,
      from: from,
      to: to,
      quantity: TokenQuantity,
      TokenType: TokenType,
      tokenStatus: tokenStatus,
      status: status,
      totalAmount: totalAmount,
    });

    return NextResponse.json(
      {
        message: "Successfully Done ",
        approved: ApprovedOrders,
      },
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
