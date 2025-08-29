import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51Q47vSG124FIRgpMYy2XfP1PthkORGJdpoYLHnLtq8YZsD3YkyckDXIh2cKas6JwxGvHgVU3oFuHfunyaK5qUqtL00cIlfws6N"
);

export async function POST(req) {
  const {
    id,
    tokenQuantity,
    tokenType,
    gramRate,
    amount,
    paymentType,
    paymentMethod,
    type,
    status,
    from,
    // to,
    // network,
  } = await req.json();

  console.log(
    "stripeCheckoutData",
    id,
    tokenQuantity,
    tokenType,
    gramRate,
    amount,
    paymentType,
    paymentMethod,
    type,
    status,
    from
  );

  const session = await stripe.checkout.sessions.create({
    success_url:
      "https://agua-coin-ui.vercel.app/dashboard/user/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://example.com/cancel",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Purchase of ${tokenQuantity} tokens`,
            description: `Gram Rate: ${gramRate}`,
          },
          unit_amount: parseInt(amount) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      id: id,
      gramRate: gramRate.toString(),
      amount: amount,
      paymentMethod,
      tokenQuantity: tokenQuantity.toString(),
      tokenType: tokenType,
      type: type,
      paymentType: paymentType,
      status: status,
      from: from,
    },
  });

  return NextResponse.json({
    message: session,
  });
}
