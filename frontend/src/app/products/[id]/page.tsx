type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=10"); 
  const data = await res.json();
  return data.products;
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>💲 {product.price}</p>
      <img src={product.thumbnail} alt={product.title} width={200} />
    </div>
  );
}
