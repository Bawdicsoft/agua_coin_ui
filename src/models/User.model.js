import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "", // Optional default profile pic URL
    },
    walletAddress: {
      type: String,
      unique: true,
      sparse: true, // ✅ This is the key to allow unique + optional
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Prevent model overwrite during hot reloads (for Next.js)
const AuthModel =
  mongoose.models.AuthUser || mongoose.model("AuthUser", UserSchema);

export default AuthModel;
