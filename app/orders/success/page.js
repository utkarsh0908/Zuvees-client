'use client';

import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function OrderSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <CheckCircleOutlineIcon color="success" style={{ fontSize: 80 }} />
      <Typography variant="h4" className="mt-4 font-bold">
        Thank you for your order!
      </Typography>
      <Typography variant="body1" className="mt-2 text-gray-600">
        Your order has been placed successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={() => router.push('/products')}
      >
        Continue Shopping
      </Button>
    </div>
  );
}
