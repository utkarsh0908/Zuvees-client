import ProductCard from "../../components/ProductCard";
import { Container, Grid, Typography } from "@mui/material";

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (e) {
    console.log('Error fetching products:', e);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <Container className="py-8">
        <Typography variant="h4" className="mb-6 text-center">
          No Products Available
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Typography variant="h4" className="mb-8 text-center">
        Gaming Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
