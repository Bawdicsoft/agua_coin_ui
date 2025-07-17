import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import MessageModel from "../../../models/message.model";
// import MessageModel from "../../../models/Message.model"; // Adjust the path as necessary

export async function POST(request) {
  try {
    const { userId, message } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing userId or message" },
        { status: 400 }
      );
    }

    await connectDB();

    const newMessage = await MessageModel.create({
      userId,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
