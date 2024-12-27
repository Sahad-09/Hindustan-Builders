"use client";

import { motion } from "framer-motion";
import { FaHome, FaBuilding, FaWarehouse, FaTree } from "react-icons/fa";

export default function ComingSoon() {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white">
      {/* Company Name */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        Hindustan Builders
      </motion.h1>

      {/* Title */}
      <motion.h2
        className="text-5xl md:text-7xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        Coming Soon
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-xl text-gray-200 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        We're working hard to bring you a new property experience!
      </motion.p>

      {/* Animated Icons */}
      <div className="flex gap-8">
        {[
          { Icon: FaHome, label: "Residential" },
          { Icon: FaBuilding, label: "Commercial" },
          { Icon: FaWarehouse, label: "Industrial" },
          { Icon: FaTree, label: "Agricultural" },
        ].map(({ Icon, label }, index) => (
          <motion.div
            key={label}
            className="flex flex-col items-center space-y-2"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <Icon className="text-6xl md:text-7xl text-white" />
            <p className="text-sm md:text-base text-gray-300">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-4 text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} Hindustan Builders. All rights reserved.
      </motion.footer>
    </div>
  );
}
