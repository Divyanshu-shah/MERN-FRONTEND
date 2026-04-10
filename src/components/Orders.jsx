import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi2";

const statusConfig = {
  pending: {
    bg: "bg-[#fef9ef]",
    text: "text-[#c8903a]",
    border: "border-[#f5e6c8]",
    icon: HiOutlineClock,
  },
  completed: {
    bg: "bg-[#f0f9f4]",
    text: "text-[#4a8c6e]",
    border: "border-[#c8e6d6]",
    icon: HiOutlineCheckCircle,
  },
  shipped: {
    bg: "bg-[#eef2ff]",
    text: "text-[#5b6abf]",
    border: "border-[#d0d7f7]",
    icon: HiOutlineTruck,
  },
  cancelled: {
    bg: "bg-[#fef2f2]",
    text: "text-[#c85a5a]",
    border: "border-[#f5c8c8]",
    icon: HiOutlineXCircle,
  },
};

export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${API_URL}/orders/show-orders/${user.email}`
        );
        setOrders(res.data);
      } catch {}
      setLoading(false);
    })();
  }, []);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#7a6e60] block mb-2">
            Your Account
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2d2926] mb-1">
            Orders
          </h1>
          <p className="text-[#5c564e] text-sm">
            Your purchase history
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#e8e5de]/60 overflow-hidden"
              >
                <div className="p-5 bg-[#faf9f6]">
                  <div className="h-3 w-24 shimmer-bg rounded-full mb-3" />
                </div>
                <div className="p-5">
                  <div className="h-3 w-full shimmer-bg rounded-full mb-2" />
                  <div className="h-3 w-2/3 shimmer-bg rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order, i) => {
              const status = (order.status || "pending").toLowerCase();
              const config = statusConfig[status] || statusConfig.pending;
              const StatusIcon = config.icon;

              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-2xl border border-[#e8e5de]/60 overflow-hidden bg-white hover:border-[#d4d0c8] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#faf9f6] border-b border-[#f0ede8]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#f0ede8] flex items-center justify-center">
                        <HiOutlineClipboardDocumentList className="w-4 h-4 text-[#7a6e60]" />
                      </div>
                      <span className="text-[11px] text-[#5c564e] font-mono tracking-wide">
                        #{order._id?.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${config.bg} ${config.text} border ${config.border}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-5 sm:px-6 py-3 divide-y divide-[#f5f3ee]">
                    {order.cart.map((item, j) => (
                      <div
                        key={j}
                        className="flex justify-between py-3 text-sm"
                      >
                        <span className="text-[#4a453e]">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f0ede8] text-[10px] font-bold text-[#5c564e] mr-2.5">
                            {item.quantity}×
                          </span>
                          {item.name}
                        </span>
                        <span className="font-semibold text-[#2d2926] tabular-nums">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center px-5 sm:px-6 py-4 bg-[#faf9f6] border-t border-[#f0ede8]">
                    <span className="text-[10px] text-[#7a6e60] font-semibold tracking-[0.25em] uppercase">
                      Total
                    </span>
                    <span className="font-bold text-[#2d2926] text-lg font-serif">
                      ₹{order.orderValue}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-10">
            <div className="w-24 h-24 rounded-full bg-[#f0ede8] flex items-center justify-center mb-6">
              <HiOutlineClipboardDocumentList className="w-10 h-10 text-[#8a857c] animate-float" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2d2926] mb-2">
              No orders yet
            </h3>
            <p className="text-[#5c564e] text-sm">
              Your orders will appear here after checkout
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
