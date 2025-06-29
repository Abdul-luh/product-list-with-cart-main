// components/DessertCard.tsx
import { motion, AnimatePresence } from "framer-motion";

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
            <motion.button
              key="add-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={handleAddToCart}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white flex items-center justify-center gap-2 border rounded-full shadow-2xl text-sm font-medium text-neutral-800 hover:text-red hover:border-red w-max px-6 py-3"
            >
              <img
                src="/assets/images/icon-add-to-cart.svg"
                alt="add-to-cart"
              />
              <p>Add to Cart</p>
            </motion.button>
          ) : (
            <motion.div
              key="quantity-control"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 flex gap-3 items-center justify-between bg-red rounded-full shadow-2xl overflow-hidden"
            >
              <button
                onClick={decrement}
                className="py-2 px-1 w-5 h-5 text-white border border-white rounded-full"
              >
                <img
                  src="/assets/images/icon-decrement-quantity.svg"
                  alt="decrement"
                />
              </button>
              <span className="px-4 py-3 text-white font-medium">
                {quantity}
              </span>
              <button
                onClick={increment}
                className="p-1 w-5 h-5 text-white border border-white rounded-full"
              >
                <img
                  src="/assets/images/icon-increment-quantity.svg"
                  alt="increment"
                />
              </button>
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
