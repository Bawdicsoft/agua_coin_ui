import RedeemModel from "../../../models/redeemToken.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

// Your Mongoose/Prisma model

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    await connectDB();
    // Example: Fetch user-specific orders from DB
    const getRedeem = await RedeemModel.find({ userId }); // Adjust query as needed

    return NextResponse.json({ getRedeem }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
