// App.tsx
import "./App.css";
import desserts from "@/../data.json";
import DessertCard from "./components/DessertCard";
import { useState } from "react";
import OrderTotal from "./components/OrderTotal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function App() {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [confirmOrder, setConfirmOrder] = useState(false);

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
        {/* Confirm Order  */}
        {confirmOrder && (
          <div className="fixed inset-0 bg-rose-900/40  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <img
                className=""
                src="/assets/images/icon-order-confirmed.svg"
                alt="order-confirmed"
              />{" "}
              <h2 className="text-2xl font-bold text-black my-4">
                Order Confirmed
              </h2>
              <p className="text-rose-400 mb-4 pb-4">
                We hope you enjoy your food!
              </p>
              <div className="bg-rose-50 p-4 rounded-xl my-4">
                {Object.entries(cartItems).map(([name, quantity]) => {
                  const dessert = desserts.find((d) => d.name === name);
                  if (!dessert) return null;

                  const total = dessert.price * quantity;

                  return (
                    <div
                      key={name}
                      className="flex justify-between items-center border-b p-3 rounded-xl"
                    >
                      <div className="flex items-center">
                        <img
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                          src={dessert.image.thumbnail}
                          alt={dessert.name}
                        />
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
                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-semibold text-rose-900 ">
                        ${total.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
                {/* Order Total */}
                <OrderTotal cartItems={cartItems} desserts={desserts} />
              </div>
              <Button
                onClick={() => {
                  setCartItems({});
                  setConfirmOrder(false);
                }}
                className="w-full mt-4 bg-red hover:bg-red-800"
              >
                Start New Order
              </Button>
            </div>
          </div>
        )}

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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(name, 0)}
                        className="w-7 h-7 p-1 border-rose-400 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}

                {/* Order Total */}
                <OrderTotal cartItems={cartItems} desserts={desserts} />

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
                  <Button
                    onClick={() => setConfirmOrder(true)}
                    className="w-full bg-red hover:bg-red-800"
                  >
                    Confirm Order
                  </Button>
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
