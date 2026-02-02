'use client';

import { useTransition, useOptimistic } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/actions/cart-actions';

interface AddToCartButtonProps {
  productId: number;
  userId?: string;
  initialCount?: number;
}

export function AddToCartButton({ 
  productId, 
  userId, 
  initialCount = 0 
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    initialCount,
    (state: number) => state + 1
  );

  const handleAddToCart = () => {
    if (!userId) {
      // Redirect to login or show toast
      return;
    }

    startTransition(async () => {
      // Optimistically update UI
      addOptimisticCount(null);
      
      // Call server action
      const result = await addToCart( productId );
      
    //   if (!result.success) {
    //     // Error handling - useOptimistic will revert
    //     console.error('Failed to add to cart');
    //   }
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending || !userId}
      className="flex items-center gap-2"
      variant="default"
    >
      <ShoppingBag className="w-4 h-4" />
      {isPending ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
