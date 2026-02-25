import { CartItem } from "@/src/schemas";
import { useStore } from "@/src/store";
import { formatCurrency } from "@/src/utils";
import Image from "next/image";

export const ShoppingCartItem = ({ item }: { item: CartItem }) => {
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);

  return (
    <li className="flex items-center space-x-6 py-6 relative">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
          alt={`Imagen del producto ${item.name}`}
          width={100}
          height={100}
          className="h-full w-full object-cover object-center"
          loading="eager"
          unoptimized
        />
      </div>
      <div className="flex-auto space-y-2">
        <h3 className="text-foreground font-semibold">{item.name}</h3>
        <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
        <select
          className="w-24 text-center p-2 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.productId, +e.target.value)}
        >
          {Array.from({ length: item.inventory }, (_, index) => index + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0">
        <button
          type="button"
          onClick={() => removeFromCart(item.productId)}
          className="rounded-full p-1 text-destructive/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <span className="sr-only">Remove item</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
