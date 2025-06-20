import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import connectDB from "@/lib/db";
import AuthModel from "@/models/User.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Cloudinary config
cloudinary.v2.config({
  cloud_name: "dfyvwloys",
  api_key: "923835526253933",
  api_secret: "JeNHRhqCYIfpkgu9hVcjwgf3P4A",
});

export async function POST(request) {
  try {
    const { name, email, password, profilePicture, role } =
      await request.json();

    console.log("Payload for create-account:", {
      name,
      email,
      // walletAddress,
      profilePicture,
      role,
    });

    // Connect to DB
    await connectDB();

    // Check if user already exists
    const existedUser = await AuthModel.findOne({ email });
    if (existedUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    let imageUrl = ""; // Default image if none uploaded

    // If profilePicture is base64 and provided, upload it to Cloudinary
    if (profilePicture) {
      try {
        const uploadedResponse = await cloudinary.v2.uploader.upload(
          profilePicture,
          {
            folder: "agua_users_profile_pictures",
            transformation: [
              { width: 1024, height: 1024, crop: "limit" }, // Resize to max 1024px
              { quality: "auto", fetch_format: "auto" }    // Compress and auto format
            ],
          }
        );
        imageUrl = uploadedResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return NextResponse.json(
          { error: "Image upload failed. Please use an image smaller than 10MB and in a supported format (JPG, PNG, etc)." },
          { status: 400 }
        );
      }
    }

    // Hash password before saving
    const hashPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = await AuthModel.create({
      name,
      email,
      password: hashPassword,
      profilePicture: imageUrl,
      // walletAddress,
      role: role || "user",
    });

    // Remove password field from response manually
    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      role: newUser.role,
    };

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      },
      process.env.JWT_SECRET || "hssssh",
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { message: "User created successfully", user: userData, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
