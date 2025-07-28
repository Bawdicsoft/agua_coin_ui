// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderModel from "@/model/Orders";

// export async function GET(req) {
//   try {
//     // Connect to the database
//     await connectDB();

//     const authHeader = req.headers.get("authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const userId = authHeader.split(" ")[1]; // this is the value after 'Bearer'
//     // Fetch all users
//     const getSingleUserOrders = await OrderModel.find({ userId: userId });
//     if (!getSingleUserOrders) {
//       console.log("error while fetching data ");
//     }

//     // Return users
//     return NextResponse.json(
//       { message: "Order Detail retrieved successfully", getSingleUserOrders },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error retrieving users:", error);

//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import PaymentDetailModel from "../../../models/paymentDetail.model.js";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

// Your Mongoose/Prisma model

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    await connectDB();
    // Example: Fetch user-specific orders from DB
    const getPayment = await PaymentDetailModel.find({ userId }); // Adjust query as needed

    return NextResponse.json({ getPayment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
