app.put("/api/updateOrderStatus", async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { key: newStatus },
      { new: true }
    );

    res.json({ success: true, updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
