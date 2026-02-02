'use client';

import { useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { removeFromCartAction } from '@/lib/actions/cart-actions';

interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  product: {
    name: string;
    price: number;
    // image: string;
  };
}

interface CartDropdownProps {
  items: CartItem[];
  cartCount: number;
}

export function CartDropdown({ items, cartCount }: CartDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleRemove = (productId: number) => {
    startTransition(() => removeFromCartAction(productId, true));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative inline-flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D4FF00] text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 p-0">
        {/* Header */}
        <div className="px-4 py-3">
          <DropdownMenuLabel className="px-0 text-base font-semibold flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Shopping Cart
          </DropdownMenuLabel>
        </div>

        <DropdownMenuSeparator className="mx-0" />

        {/* Items List */}
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <ShoppingBag className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto">
            <div className="space-y-3 px-4 py-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                >
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    disabled={isPending}
                    className="mt-1 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <>
            <DropdownMenuSeparator className="mx-0" />

            {/* Total Price */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-lg font-bold text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Shipping & taxes calculated at checkout
              </p>
            </div>

            <DropdownMenuSeparator className="mx-0" />

            {/* Checkout Button */}
            <div className="px-4 py-3 space-y-2">
              <Link href="/cart" className="block w-full">
                <Button
                  className="w-full bg-[#D4FF00] hover:bg-[#D4FF00]/90 text-foreground font-semibold"
                  disabled={isPending}
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <button
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
