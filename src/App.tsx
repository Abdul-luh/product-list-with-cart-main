// App.tsx
import "./App.css";
import desserts from "@/../data.json";
import DessertCard from "./components/DessertCard";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  // Calculate total items in cart
  const totalItems = Object.values(cartItems).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const handleQuantityChange = (itemName: string, quantity: number) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[itemName];
      } else {
        updated[itemName] = quantity;
      }
      return updated;
    });
  };

  return (
    <main className="flex flex-col p-2 md:p-4 bg-rose-50 min-h-screen w-full">
      <div className="flex flex-col gap-4 sm:flex-row max-w-[1200px] w-full mx-auto">
        {/* Desserts Section */}
        <section className="basis-5/7">
          <h1 className="font-redhat font-bold text-2xl text-rose-900">
            Desserts
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {desserts.map((dessert) => (
              <DessertCard
                key={dessert.name}
                item={dessert}
                quantity={cartItems[dessert.name] || 0}
                onQuantityChange={(quantity) =>
                  handleQuantityChange(dessert.name, quantity)
                }
              />
            ))}
          </div>
        </section>

        {/* Cart Section */}
        <section className="basis-2/7 h-min bg-white p-4 rounded-2xl">
          <h2 className="font-redhat font-bold text-2xl text-red capitalize">
            Your Cart ({totalItems})
          </h2>
          <div className="mt-4 space-y-4">
            {totalItems > 0 ? (
              <>
                {Object.entries(cartItems).map(([name, quantity]) => {
                  const dessert = desserts.find((d) => d.name === name);
                  if (!dessert) return null;

                  const total = dessert.price * quantity;

                  return (
                    <div
                      key={name}
                      className="flex justify-between items-center border-b p-3 rounded-xl"
                    >
                      <div>
                        <h4 className="font-semibold text-xl text-rose-900">
                          {name}
                        </h4>
                        <div className="flex gap-2">
                          <p className="text-lg text-red font-bold">
                            {quantity}x
                          </p>
                          <p className="text-lg text-rose-500">
                            @ ${dessert.price.toFixed(2)}
                          </p>
                          <p className="text-lg font-semibold text-rose-500 ">
                            ${total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleQuantityChange(name, 0)}
                        className="w-7 h-7 flex justify-center items-center text-red-600 text-sm border border-rose-400 rounded-full hover:bg-red-50"
                      >
                        <img
                          className=""
                          src="/assets/images/icon-remove-item.svg"
                          alt="empty-cart"
                        />{" "}
                      </button>
                    </div>
                  );
                })}

                {/* Order Total */}
                <div className="flex justify-between items-center mt-4 pt-4">
                  <span className="font-semibold text-lg text-rose-900">
                    Order Total
                  </span>
                  <span className="font-bold text-lg text-rose-900">
                    $
                    {Object.entries(cartItems)
                      .reduce((sum, [name, quantity]) => {
                        const dessert = desserts.find((d) => d.name === name);
                        return dessert ? sum + dessert.price * quantity : sum;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-center gap-4 items-center mt-4 bg-rose-50 p-4 rounded-xl">
                  <img
                    className=""
                    src="/assets/images/icon-carbon-neutral.svg"
                    alt="empty-cart"
                  />{" "}
                  <p className="text-rose-900 text-sm">
                    This is a
                    <span className="font-semibold">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>

                <div className="text-center mt-6">
                  <button className="bg-red w-full text-white px-6 py-2 rounded-full hover:bg-red-800 transition-colors">
                    Confirm Order
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px]">
                <img
                  className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-4"
                  src="/assets/images/illustration-empty-cart.svg"
                  alt="empty-cart"
                />
                <p className="text-rose-500">
                  Your added items will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
