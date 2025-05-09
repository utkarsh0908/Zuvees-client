"use client";

import { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const SingleProduct = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(
    product?.variants?.[0]?.type || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.[0]?.color || ""
  );
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color.");
      return;
    }

    const selectedVariant = product?.variants?.find(
      (v) => v.type === selectedSize && v.color === selectedColor
    );

    if (!selectedVariant) {
      alert("Selected variant not available.");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: selectedVariant.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    dispatch(addToCart(cartItem));

    alert("Item added to cart!");
  };

  const currentPrice = product?.variants?.find(
    (v) => v.type === selectedSize && v.color === selectedColor
  )?.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Card className="shadow-xl">
        <CardContent className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 w-full">
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="lg:w-1/2 w-full space-y-6">
            <Typography variant="h4" fontWeight="bold">
              {product.name}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              {product.description}
            </Typography>

            <Typography variant="h6" color="green" fontWeight="bold">
              ₹{currentPrice ?? "—"}
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                label="Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {[...new Set(product?.variants?.map((v) => v.type))].map(
                  (size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                label="Color"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {[...new Set(product?.variants?.map((v) => v.color))].map(
                  (color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              fullWidth
              inputProps={{ min: 1 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleProduct;
