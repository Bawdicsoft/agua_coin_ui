import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AuthModel from "@/models/User.model";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // Connect to the database
    await connectDB();

    // Fetch user by userId
    const user = await AuthModel.findOne({ _id: userId });

    // Return user
    return NextResponse.json(
      { message: "User retrieved successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving user:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
