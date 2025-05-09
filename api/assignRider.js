export const assignRiderToOrder = async (orderId, riderId) => {
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/admin/assign-order`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, riderId }),
  });

  if (!res.ok) {
    throw new Error('Failed to assign rider');
  }

  return res.json();
};
