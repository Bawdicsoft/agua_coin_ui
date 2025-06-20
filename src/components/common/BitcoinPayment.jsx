"use client";
import QRCode from "qrcode.react";

export default function BitcoinPayment() {
  const btcAddress = "bc1qyourbitcoinaddress";
  const amount = 0.001; // in BTC
  const paymentURI = `bitcoin:${btcAddress}?amount=${amount}`;

  return (
    <div>
      <h2>Send Bitcoin Payment</h2>
      <p>Amount: {amount} BTC</p>
      <p>To Address: {btcAddress}</p>
      <QRCode value={paymentURI} size={256} />
    </div>
  );
}
