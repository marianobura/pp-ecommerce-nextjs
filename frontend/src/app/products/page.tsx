import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=0", { cache: "no-store" });
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
            {product.title} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
