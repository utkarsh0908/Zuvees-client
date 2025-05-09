export const updateOrderStatus = async (orderId, status, riderId) => {
  const res = await fetch(`http://localhost:3001/api/admin/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, riderId }),
  });

  if (!res.ok) {
    throw new Error('Failed to update order status');
  }

  return res.json();
};
