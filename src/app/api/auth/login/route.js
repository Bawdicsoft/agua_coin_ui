import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import AuthModel from "@/models/User.model";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const user = await AuthModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "AguaCoinUI",
      { expiresIn: "1d" }
    );

    // Fetch complete user data by ID (omit password)
    const userData = await AuthModel.findById(user._id).select("-password");

    // ✅ Set cookies before returning response
    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: userData,
      },
      { status: 200 }
    );

    // ✅ Set token & role cookies
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("role", user.role, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
