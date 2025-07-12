// Add this temporary route to remove the index
// Create a new file at /app/api/remove-index/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    await db.collection('paymentdetails').dropIndex('email_1');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: error.message
    });
  }
}