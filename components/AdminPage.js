// components/AdminPage.js
'use client';
import { assignRiderToOrder } from '~/api/assignRider';
import { updateOrderStatus } from '~/api/updateOrderStatus'; 


import { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const AdminOrdersPage = ({ orders: initialOrders, riders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [assignments, setAssignments] = useState(() =>
    initialOrders.reduce((acc, order) => {
      if (order.assignedRiderId) {
        acc[order._id] = order.assignedRiderId;
      }
      return acc;
    }, {})
  );

  const handleRiderSelect = async (orderId, riderId) => {
    setAssignments((prev) => ({ ...prev, [orderId]: riderId }));
  
    try {
      await assignRiderToOrder(orderId, riderId);
    } catch (error) {
      console.error(error);
      alert('Error assigning rider');
    }
  };
  

  const handleStatusChange = async (orderId) => {
    const riderId = assignments[orderId];
    if (!riderId) {
      alert('Please assign a rider before shipping.');
      return;
    }
  
    try {
      const updated = await updateOrderStatus(orderId, 'Shipped', riderId);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: updated.status } : o))
      );
    } catch (error) {
      console.error(error);
      alert('Error updating status');
    }
  };
  

  return (
    <div>
      <Typography variant="h4" className="mb-6">Manage Orders</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rider</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.userId}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.status === 'Paid' ? (
                    <FormControl fullWidth>
                      <InputLabel>Assign Rider</InputLabel>
                      <Select
                        value={assignments[order._id] || ''}
                        label="Assign Rider"
                        onChange={(e) => handleRiderSelect(order._id, e.target.value)}
                      >
                        {riders.map((rider) => (
                          <MenuItem key={rider._id} value={rider.userId}>
                            {rider.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <span>{order.assignedRider?.name || 'Assigned'}</span>
                  )}
                </TableCell>
                <TableCell>
                  {order.status === 'Paid' && (
                    <Button variant="contained" onClick={() => handleStatusChange(order._id)}>
                      Mark Shipped
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminOrdersPage;
