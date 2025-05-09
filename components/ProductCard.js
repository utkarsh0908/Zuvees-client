"use client"

import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <Card className="flex flex-col h-[400px] w-[300px] shadow-md">
      <CardMedia
        image={`/images/${product.image}`}
        title={product.name}
        style={{
          height: 200,
          objectFit: 'cover',
        }}
      />
      <CardContent className="flex flex-col justify-between flex-grow">
        <Typography variant="h6" className="font-semibold">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">{product.description}</Typography>
        
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push(`/products/${product._id}`)}
          fullWidth
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
