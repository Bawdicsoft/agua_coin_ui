import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AuthModel from "../../../../models/User.model"; // Adjust the path as necessary

// Ensure this matches your User schema and DB setup

export async function POST(request) {
  try {
    const { userId, status } = await request.json();

    if (!userId || !status) {
      return NextResponse.json(
        { error: "Missing userId or status" },
        { status: 400 }
      );
    }

    console.log("Updating user status:", { userId, status });

    // Connect to MongoDB
    await connectDB();

    // Find and update user
    const updatedUser = await AuthModel.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
