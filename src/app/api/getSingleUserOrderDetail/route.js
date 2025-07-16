import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderModel from "@/model/Orders";

export async function GET(req) {
  try {
    // Connect to the database
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = authHeader.split(" ")[1]; // this is the value after 'Bearer'
    // Fetch all users
    const getSingleUserOrders = await OrderModel.find({ userId: userId });
    if (!getSingleUserOrders) {
      console.log("error while fetching data ");
    }

    // Return users
    return NextResponse.json(
      { message: "Order Detail retrieved successfully", getSingleUserOrders },
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
