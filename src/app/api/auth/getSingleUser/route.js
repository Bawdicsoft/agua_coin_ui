import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AuthModel from "@/models/User.model";

export async function GET() {
  const { userId } = req.json;
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users
    const users = await AuthModel.findOne({});

    // Return users
    return NextResponse.json(
      { message: "Users retrieved successfully", users },
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
