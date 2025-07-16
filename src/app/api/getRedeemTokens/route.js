import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import RedeemModel from "../../../models/redeemToken.model.js";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users
    const RedeemDetail = await RedeemModel.find({});

    // Return users
    return NextResponse.json(
      { message: "Redeem Detail retrieved successfully", RedeemDetail },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving redeem Data:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
