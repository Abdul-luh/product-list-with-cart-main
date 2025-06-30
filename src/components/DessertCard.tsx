// components/DessertCard.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface DessertCardPropsIface {
  item: DessertItemIface;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

interface DessertItemIface {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

export default function DessertCard({
  item,
  quantity,
  onQuantityChange,
}: DessertCardPropsIface) {
  const { image, name, category, price } = item;
  // const [quantity, setQuantity] = useState(0);
  const isAdded = quantity > 0;

  const handleAddToCart = () => {
    onQuantityChange(1);
  };

  const increment = () => {
    onQuantityChange(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    } else {
      onQuantityChange(0);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${
        isAdded ? "border border-red" : ""
      }`}
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <source media="(max-width: 767px)" srcSet={image.mobile} />
        <img
          src={image.thumbnail}
          alt={name}
          className="w-full h-40 object-cover rounded-xl"
        />
      </picture>

      <div className="p-4 flex flex-col gap-2 flex-grow relative">
        <AnimatePresence mode="wait">
          {!isAdded ? (
            <motion.div
              key="add-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2"
            >
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex items-center gap-2 border text-lg rounded-full px-6 py-2 shadow-2xl"
              >
                <img
                  src="/assets/images/icon-add-to-cart.svg"
                  alt="add-to-cart"
                />
                <span>Add to Cart</span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="quantity-control"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-6 items-center justify-between bg-red rounded-full shadow-2xl overflow-hidden px-3 py-2"
            >
              <Button
                onClick={decrement}
                size="icon"
                variant="ghost"
                className="w-5 h-5 border border-white text-white hover:text-red  rounded-full"
              >
                <Minus size={14} />
              </Button>

              <span className=" text-white font-medium">{quantity}</span>

              <Button
                onClick={increment}
                size="icon"
                variant="ghost"
                className="w-5 h-5 border border-white text-white hover:text-red rounded-full"
              >
                <Plus size={14} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex-col gap-2 flex">
          <h4 className="text-sm text-neutral-500">{category}</h4>
          <h3 className="text-base font-semibold text-neutral-900">{name}</h3>
          <p className="text-sm font-medium text-neutral-700">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
