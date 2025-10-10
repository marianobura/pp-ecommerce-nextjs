import Link from 'next/link';
import BaseText from '@/components/base/BaseText';

export default function CartItems({
  cart,
  removeFromCart,
  className,
}: {
  cart: any[];
  removeFromCart: (id: number) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 overflow-y-auto ${className}`}>
      {cart.map((product) => (
        <div
          key={product.id}
          className="group flex items-center gap-4 rounded-2xl transition-all hover:gap-0 hover:bg-neutral-100"
        >
          <Link
            href={`/products/${product?.id}`}
            className="shrink-0 rounded-2xl bg-neutral-100 p-2"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="size-16 rounded-2xl object-cover transition-transform group-hover:scale-110 md:size-20"
            />
          </Link>
          <div className="flex flex-col gap-2 pr-3">
            <div className="flex flex-col">
              <BaseText variant="text-semibold" className="line-clamp-1 break-all">
                {product.title}
              </BaseText>
              <BaseText variant="small" className="text-neutral">
                ${product.price}
              </BaseText>
            </div>
            <BaseText
              variant="small"
              className="text-primary w-fit cursor-pointer"
              onClick={() => removeFromCart(product.id)}
            >
              Remove from cart
            </BaseText>
          </div>
        </div>
      ))}
    </div>
  );
}
