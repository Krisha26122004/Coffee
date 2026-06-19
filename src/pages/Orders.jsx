import { useEffect, useState, useMemo } from "react";
import { FiBox, FiCheck, FiMapPin, FiTruck, FiCoffee, FiGift, FiHome } from "react-icons/fi";
import api from "../services/api";

const TRACKING_STEPS = [
  { label: "Confirmed", desc: "Order received", status: "Processing", icon: FiCheck },
  { label: "Roasting", desc: "Roasting premium beans", status: "Roasting", icon: FiCoffee },
  { label: "Assembling", desc: "Crafting custom box", status: "Assembling", icon: FiGift },
  { label: "In Transit", desc: "Shipped with courier", status: "Shipped", icon: FiTruck },
  { label: "Delivered", desc: "Arrived at your doorstep", status: "Delivered", icon: FiHome }
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/myorders")
      .then(({ data }) => {
        setOrders(data);
        if (data.length > 0) {
          setSelectedOrder(data[0]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getStepIndex = (status) => {
    switch (status) {
      case "Processing":
      case "Pending":
        return 0;
      case "Roasting":
        return 1;
      case "Assembling":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIndex = useMemo(() => {
    if (!selectedOrder) return 0;
    return getStepIndex(selectedOrder.orderStatus);
  }, [selectedOrder]);

  const progressPercentage = useMemo(() => {
    return (currentStepIndex / (TRACKING_STEPS.length - 1)) * 100;
  }, [currentStepIndex]);

  return (
    <section className="container py-8 max-w-7xl px-4 min-h-[70vh]">
      <div className="mb-6">
        <h1 className="brand-font text-4xl md:text-5xl font-bold text-[#2B160D]">My Orders</h1>
        <p className="text-[#7d6047] text-sm mt-1">
          Review your purchase history and track your packages live.
        </p>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C99854] border-t-transparent" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center coffee-shadow max-w-md mx-auto border border-orange-50 mt-10">
          <FiBox className="text-6xl text-[#D4A25A] mx-auto mb-4" />
          <h2 className="brand-font text-2xl font-bold text-[#2B160D]">No Orders Yet</h2>
          <p className="text-[#7d6047] text-sm mt-2">
            Once you place an order, it will appear here so you can track its delivery status.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          {/* Left Side: Orders List */}
          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
            {orders.map((o, idx) => {
              const isSelected = selectedOrder?._id === o._id;
              const dateStr = new Date(o.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              });
              const stepIdx = getStepIndex(o.orderStatus);

              return (
                <div
                  key={o._id || idx}
                  onClick={() => setSelectedOrder(o)}
                  className={`p-5 rounded-2xl bg-white border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#C99854] ring-2 ring-[#C99854]/10 shadow-lg"
                      : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-[#7d6047]">
                        Order #{o._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{dateStr}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        o.orderStatus === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : o.orderStatus === "Shipped"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {o.orderStatus || "Processing"}
                    </span>
                  </div>

                  <div className="mt-4 flex justify-between items-end border-t pt-3">
                    <div>
                      <p className="text-xs text-gray-400">Total Price</p>
                      <p className="text-lg font-black text-[#2B160D]">₹{o.totalPrice}</p>
                    </div>
                    <p className="text-xs font-semibold text-[#7d6047]">
                      {o.products?.length || 0} item(s)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Tracking Details & Item Breakdown */}
          {selectedOrder && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-orange-50 coffee-shadow space-y-8 animate-[fadeIn_0.2s_ease]">
              {/* Order Header Summary */}
              <div className="flex flex-wrap justify-between gap-4 border-b pb-5">
                <div>
                  <span className="text-xs font-bold text-[#C99854] uppercase tracking-wider">
                    Package Tracker
                  </span>
                  <h2 className="brand-font text-3xl font-bold text-[#2B160D] mt-1">
                    Order #{selectedOrder._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Ordered on{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">Estimated Arrival</span>
                  <span className="text-lg font-bold text-[#2B160D]">
                    {selectedOrder.orderStatus === "Delivered"
                      ? "Delivered Successfully"
                      : "Within 2 - 3 Days"}
                  </span>
                </div>
              </div>

              {/* Parcel Tracking Step Progress bar */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7d6047] mb-6">
                  Live Parcel Tracking
                </h3>

                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-6 right-6 h-1 bg-gray-100 z-0">
                    <div
                      className="h-full bg-[#C99854] transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  {/* Steps container */}
                  <div className="relative flex justify-between z-10">
                    {TRACKING_STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      const isCompleted = currentStepIndex >= idx;
                      const isActive = currentStepIndex === idx;

                      return (
                        <div key={step.label} className="flex flex-col items-center max-w-[80px] text-center">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              isCompleted
                                ? "bg-[#2B160D] border-[#2B160D] text-white shadow-lg"
                                : "bg-white border-gray-200 text-gray-400"
                            } ${isActive ? "ring-4 ring-[#C99854]/30 scale-110" : ""}`}
                          >
                            <StepIcon className="text-lg" />
                          </div>
                          <p
                            className={`text-xs font-bold mt-2 leading-tight ${
                              isCompleted ? "text-[#2B160D]" : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-[9px] text-gray-400 mt-0.5 hidden sm:block leading-tight">
                            {step.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Products Breakdown */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7d6047] mb-4">
                  Items Purchased
                </h3>
                <div className="divide-y divide-gray-100 bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                  {selectedOrder.products.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                      {item.image && (
                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-white border shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#2B160D] text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.category}</p>
                        {item.box && (
                          <div className="mt-2 text-xs text-[#7d6047] bg-[#fff5e8]/80 p-3 rounded-lg border border-[#D4A25A]/10 space-y-1">
                            <p className="font-semibold text-[#2B160D] border-b pb-1 mb-1">
                              🎁 Custom Hamper Content:
                            </p>
                            <p>• <strong>Box:</strong> {item.box.boxType}</p>
                            <p>• <strong>Coffee Roast:</strong> {item.box.coffeeType}</p>
                            <p>• <strong>Drinkware:</strong> {item.box.mugType}</p>
                            {item.box.addons?.length > 0 && (
                              <p>• <strong>Treats:</strong> {item.box.addons.join(", ")}</p>
                            )}
                            {item.box.greetingCard && (
                              <div className="mt-2 border-t pt-1.5 border-[#D4A25A]/10">
                                <p className="font-semibold text-[#2B160D] italic text-[11px]">
                                  ✉️ Greeting Card ({item.box.greetingCard.theme}):
                                </p>
                                <p className="text-[11px] leading-relaxed opacity-90 pl-1 mt-0.5">
                                  "<em>{item.box.greetingCard.message}</em>" <br />
                                  <span className="text-[10px] font-bold block text-right">
                                    - To {item.box.greetingCard.to} from {item.box.greetingCard.from}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#C99854] block">
                          ₹{item.price}
                        </span>
                        <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address & Details */}
              <div className="grid gap-6 md:grid-cols-2 border-t pt-6 text-sm">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-2 flex items-center gap-1.5">
                    <FiMapPin className="text-[#C99854]" /> Delivery Address
                  </h3>
                  {selectedOrder.shippingAddress ? (
                    <div className="text-gray-600 bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="font-bold text-[#2B160D]">
                        {selectedOrder.shippingAddress.name}
                      </p>
                      <p className="mt-1 leading-relaxed">{selectedOrder.shippingAddress.address}</p>
                      <p className="mt-2 text-xs font-semibold text-gray-400">
                        Phone: {selectedOrder.shippingAddress.phone}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400">No address details available.</p>
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-2">
                      Payment Method
                    </h3>
                    <p className="font-bold text-[#2B160D] bg-gray-50 rounded-xl p-4 border border-gray-100">
                      {selectedOrder.paymentMethod || "Cash on Delivery"}
                    </p>
                  </div>

                  <div className="bg-[#FFF8EC] rounded-xl p-4 border border-[#D4A25A]/10 mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-400">Grand Total paid</p>
                      <p className="text-2xl font-black text-[#2B160D]">
                        ₹{selectedOrder.totalPrice}
                      </p>
                    </div>
                    <span className="rounded bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 uppercase">
                      Paid
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
