import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // replace with your key

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json({ session });
  } catch (error) {
    console.error("Stripe session fetch error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
