import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderModel from "@/model/Orders";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users
    const getOrders = await OrderModel.find();
    if (!getOrders) {
      console.log("error while fetching data ");
    }

    // Return users
    return NextResponse.json(
      { message: "Order Detail retrieved successfully", getOrders },
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
