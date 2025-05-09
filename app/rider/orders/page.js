'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';

export default function RiderOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});
  const rider = useSelector((state) => state.user.user);

  useEffect(() => {
    if (rider?._id) {
      fetchOrders(rider._id);
    }
  }, [rider]);

  const fetchOrders = async (riderId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rider/orders?riderId=${riderId}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
      alert('Error fetching orders. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, status) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: status }));
  };

  const submitStatusUpdate = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/rider/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      fetchOrders(rider._id);
    } catch (err) {
      console.error(err);
      alert('Error updating order status.');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" className="mb-6">Assigned Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No orders assigned</TableCell>
              </TableRow>
            ) : (
              orders.map((order) => {
                const isStatusEditable = order.status === 'Paid' || order.status === 'Delivered';
                return (
                  <TableRow key={order._id}>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.deliveryAddress}</TableCell>
                    <TableCell>
                      <FormControl fullWidth disabled={isStatusEditable}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={statusUpdates[order._id] || order.status}
                          label="Status"
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          <MenuItem value="Undelivered">Undelivered</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        color="primary"
                        className="mt-2"
                        disabled={isStatusEditable}
                        onClick={() => submitStatusUpdate(order._id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
