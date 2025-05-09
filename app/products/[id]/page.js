import SingleProduct from "~/components/SingleProduct";

export default async function ProductPage({ params }) {
  const { id } = await params;

  let product = {};
  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`);
    product = await res.json();
  } catch(e) {
    console.log(e);
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return <SingleProduct product={product} />;
}
