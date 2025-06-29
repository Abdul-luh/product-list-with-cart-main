// components/OrderTotal.tsx
type OrderTotalProps = {
  cartItems: Record<string, number>;
  desserts: { name: string; price: number }[];
};

export default function OrderTotal({ cartItems, desserts }: OrderTotalProps) {
  const total = Object.entries(cartItems).reduce((sum, [name, quantity]) => {
    const dessert = desserts.find((d) => d.name === name);
    return dessert ? sum + dessert.price * quantity : sum;
  }, 0);

  return (
    <div className="flex justify-between items-center mt-4 pt-4">
      <span className="font-semibold text-lg text-rose-900">Order Total</span>
      <span className="font-bold text-lg text-rose-900">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}
