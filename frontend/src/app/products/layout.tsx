import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2>Products Section</h2>
      {children}
    </div>
  );
}
