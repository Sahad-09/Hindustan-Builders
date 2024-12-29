'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { useEffect, useState } from 'react';

// Types
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

const ParticleBackground = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-50"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const LoadingDots = () => (
  <motion.div
    className="flex justify-center space-x-2 mt-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="w-3 h-3 bg-white rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2
        }}
      />
    ))}
  </motion.div>
);

const BottomBar = () => (
  <motion.div
    className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1.5, delay: 0.5 }}
  />
);

export default function Page() {
  return (
    <AnimatePresence>
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <ParticleBackground />

        <Card className="relative z-10 p-8 bg-transparent border-none shadow-none">
          <div className="text-center space-y-8">
            <FloatingElement>
              <motion.h1
                className="text-6xl md:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 from-10% via-white via-50% to-green-500 to-90% bg-[length:200%_auto] bg-clip-text text-transparent"
                initial={{ backgroundPosition: "0 0" }}
                animate={{ backgroundPosition: ["0 0", "100% 0", "0 0"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Hindustan Builders
              </motion.h1>
            </FloatingElement>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-300">
                Something amazing is coming soon.
              </p>
            </motion.div>

            <LoadingDots />
          </div>
        </Card>

        <BottomBar />
      </div>
    </AnimatePresence>
  );
}