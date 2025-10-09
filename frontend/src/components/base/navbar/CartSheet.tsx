import Sheet from '@/components/ui/Sheet';
import { Handbag } from 'lucide-react';
import BaseText from '@/components/base/BaseText';
import Link from 'next/link';
import BaseButton from '@/components/base/BaseButton';
import { useCart } from '@/context/CartContext';

export default function CartSheet({
  openCart,
  setOpenCart,
}: {
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}) {
  const { cart, totalItems, removeFromCart, totalPrice } = useCart();
  return (
    <Sheet open={openCart} onClose={() => setOpenCart(false)} title={`Your cart (${totalItems})`}>
      {totalItems === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2 p-3">
          <div className="flex items-center gap-2">
            <Handbag size={24} />
            <BaseText variant="text-semibold" className="text-foreground">
              Your cart is empty
            </BaseText>
          </div>
          <BaseText variant="small" className="text-foreground text-center text-balance">
            Explore our{' '}
            <Link href="/products" className="text-primary border-primary border-b">
              products
            </Link>{' '}
            and discover great deals!
          </BaseText>
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2 overflow-y-auto p-3">
            {cart.map((product) => (
              <div
                key={product.id}
                className="group flex items-center gap-4 rounded-2xl transition-colors hover:bg-neutral-100"
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
          <div className="border-t border-neutral-200">
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <BaseText variant="text">Total</BaseText>
                <BaseText variant="text-semibold">$ {totalPrice}</BaseText>
              </div>
              <div className="flex gap-3">
                <Link href="/checkout" className="grow">
                  <BaseButton variant="primary" className="w-full">
                    Checkout
                  </BaseButton>
                </Link>
                <BaseButton variant="neutral" onClick={() => setOpenCart(false)}>
                  Continue Shopping
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
}
