// /pages/api/metal-history.js
import axios from "axios";

export default async function handler(req, res) {
  const { metal } = req.query;

  try {
    // Replace with real metal API like Metals-API or GoldAPI
    const response = await axios.get(
      `https://api.metals.live/v1/history/${metal.toLowerCase()}`
    );

    // Assume format: [[timestamp, price], ...]
    const history = response.data.slice(-12).map(([date, price]) => ({
      date: new Date(date * 1000).toLocaleDateString("en-US"),
      price,
    }));

    res.status(200).json({ history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch metal data" });
  }
}
