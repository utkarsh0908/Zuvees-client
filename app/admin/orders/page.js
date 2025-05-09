import AdminOrdersPage from '~/components/AdminPage';

async function getOrdersAndRiders() {
  const [ordersRes, ridersRes] = await Promise.all([
    fetch('http://localhost:3001/api/admin/orders'),
    fetch('http://localhost:3001/api/admin/riders')
  ]);

  if (!ordersRes.ok || !ridersRes.ok) {
    throw new Error('Failed to fetch orders or riders');
  }

  const [orders, riders] = await Promise.all([
    ordersRes.json(),
    ridersRes.json()
  ]);

  return { orders, riders };
}

export default async function AdminPage() {
  const { orders, riders } = await getOrdersAndRiders();

  return <AdminOrdersPage orders={orders} riders={riders} />;
}
