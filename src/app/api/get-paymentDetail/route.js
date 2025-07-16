import connectDB from "@/lib/db";
import PaymentDetailModel from "../../../models/paymentDetail.model.js";
import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import PaymentDetailModel from "@/model/paymentDetail.model";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users
    const getPaymentDetail = await PaymentDetailModel.find({});
    if (!getPaymentDetail) {
      console.log("error while fetching data ");
    }

    // Return users
    return NextResponse.json(
      { message: "Payment Detail retrieved successfully", getPaymentDetail },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving users:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
