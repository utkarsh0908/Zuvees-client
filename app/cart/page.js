'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '~/store/slices/cartSlice';
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please log in to place an order.');
      router.push('/login');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address.');
      return;
    }
    console.log(user._id);
    const orderPayload = {
      userId: user._id.toString(),
      items: cartItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })),
      totalAmount,
      deliveryAddress,
      status: 'Paid'
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to place order');
      }

      dispatch(clearCart());
      router.push('/orders/success');
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Typography variant="h5" className="mb-4 text-center font-bold">
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography className="text-center">Your cart is empty.</Typography>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <Card key={item.productId}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">Price: ₹{item.price.toFixed(2)}</Typography>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.productId, Number(e.target.value))
                    }
                    size="small"
                    className="mt-2"
                    inputProps={{ min: 1 }}
                  />
                </div>
                <IconButton onClick={() => handleRemove(item.productId)} color="error">
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}

          <Divider />

          <TextField
            label="Delivery Address"
            fullWidth
            multiline
            rows={4}
            className="mt-4"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />

          <div className="text-right mt-4">
            <Typography variant="h6">Total: ₹{totalAmount.toFixed(2)}</Typography>
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
