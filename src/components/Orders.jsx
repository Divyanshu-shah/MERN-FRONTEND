import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardDocumentList, HiOutlineCheckCircle,
  HiOutlineTruck, HiOutlineClock, HiOutlineXCircle,
} from "react-icons/hi2";

const statusConfig = {
  pending:   { bg: "bg-[#fffbeb]", text: "text-[#d97706]", border: "border-[#fde68a]", icon: HiOutlineClock },
  completed: { bg: "bg-[#ecfdf5]", text: "text-[#10b981]", border: "border-[#a7f3d0]", icon: HiOutlineCheckCircle },
  shipped:   { bg: "bg-[#eef2ff]", text: "text-[#6366f1]", border: "border-[#c7d2fe]", icon: HiOutlineTruck },
  cancelled: { bg: "bg-[#fef2f2]", text: "text-[#ef4444]", border: "border-[#fecaca]", icon: HiOutlineXCircle },
};

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/orders/show-orders/${user.email}`, { headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data);
      } catch {}
      setLoading(false);
    })();
  }, []);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-[#9ca0b8] block mb-2">Your Account</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1f36] mb-1">Orders</h1>
          <p className="text-[#64698b] text-sm">Your purchase history</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.4 }}
                className="rounded-2xl border border-[#e5e7ef]/60 overflow-hidden">
                <div className="p-5 bg-[#f5f6fa]"><div className="h-3 w-24 shimmer-bg rounded-full mb-3" /></div>
                <div className="p-5"><div className="h-3 w-full shimmer-bg rounded-full mb-2" /><div className="h-3 w-2/3 shimmer-bg rounded-full" /></div>
              </motion.div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <motion.div className="space-y-5" variants={containerVariants} initial="hidden" animate="visible">
            {orders.map((order) => {
              const status = (order.status || "pending").toLowerCase();
              const config = statusConfig[status] || statusConfig.pending;
              const StatusIcon = config.icon;
              return (
                <motion.div key={order._id} variants={cardVariants} whileHover={{ y: -2 }} transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-[#e5e7ef]/60 overflow-hidden bg-white hover:border-[#d1d4e0] transition-colors duration-400 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#f5f6fa] border-b border-[#eef0f6]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#eef0f6] flex items-center justify-center"><HiOutlineClipboardDocumentList className="w-4 h-4 text-[#6366f1]" /></div>
                      <span className="text-[11px] text-[#64698b] font-mono tracking-wide">#{order._id?.slice(-8).toUpperCase()}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${config.bg} ${config.text} border ${config.border}`}>
                      <StatusIcon className="w-3 h-3" />{status}
                    </span>
                  </div>
                  <div className="px-5 sm:px-6 py-3 divide-y divide-[#f0f1f6]">
                    {order.cart.map((item, j) => (
                      <div key={j} className="flex justify-between py-3 text-sm">
                        <span className="text-[#4a4f6b]">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#eef0f6] text-[10px] font-bold text-[#6366f1] mr-2.5">{item.quantity}×</span>
                          {item.name}
                        </span>
                        <span className="font-semibold text-[#1a1f36] tabular-nums">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-5 sm:px-6 py-4 bg-[#f5f6fa] border-t border-[#eef0f6]">
                    <span className="text-[10px] text-[#9ca0b8] font-semibold tracking-[0.25em] uppercase">Total</span>
                    <span className="font-bold text-[#1a1f36] text-lg font-serif">₹{order.orderValue}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center justify-center min-h-[50vh] text-center py-10">
            <div className="w-24 h-24 rounded-full bg-[#eef0f6] flex items-center justify-center mb-6">
              <HiOutlineClipboardDocumentList className="w-10 h-10 text-[#6366f1] animate-float" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1a1f36] mb-2">No orders yet</h3>
            <p className="text-[#64698b] text-sm">Your orders will appear here after checkout</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
