import { CartDropdown } from './cart-dropdown';
import { getCartItems, getCartCount } from '@/lib/actions/cart-actions';

interface CartIconProps {
  userId?: string;
}

export async function CartIcon(props?: CartIconProps) {
  const [items, cartCount] = await Promise.all([
    getCartItems(),
    getCartCount(),
  ]);

  return <CartDropdown items={items} cartCount={cartCount} />;
}
