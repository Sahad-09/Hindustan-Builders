"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Users, Briefcase, DollarSign } from "lucide-react";

const RealEstateStatistics = () => {
    const statistics = [
        { icon: Home, number: "1K+", label: "Properties Listed" },
        { icon: Users, number: "150+", label: "Trusted Agents" },
        { icon: Briefcase, number: "200+", label: "Successful Deals" },
        { icon: DollarSign, number: "$500M+", label: "Total Sales" },
        { icon: Home, number: "1K+", label: "Properties Listed" },
        { icon: Users, number: "150+", label: "Trusted Agents" },
        { icon: Briefcase, number: "200+", label: "Successful Deals" },
        { icon: DollarSign, number: "$500M+", label: "Total Sales" },
    ];

    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);

    const cardWidth = 320;
    const totalWidth = statistics.length * cardWidth;

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth);
        }
    }, []);

    const dragConstraints = {
        left: -(totalWidth - windowWidth),
        right: 0,
    };

    const transformedX = useTransform(x, [0, -totalWidth], [0, -totalWidth]);

    const handleDragEnd = () => {
        setIsAnimating(true);
    };

    const handleDragStart = () => {
        setIsAnimating(false);
    };

    return (
        <div className="container mx-auto py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <motion.div
                    ref={containerRef}
                    className="flex cursor-grab active:cursor-grabbing gap-8"
                    drag="x"
                    dragConstraints={dragConstraints}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    style={{
                        x,
                        width: `${totalWidth}px`,
                    }}
                    animate={
                        isAnimating
                            ? {
                                x: ["0%", "-50%"],
                            }
                            : false
                    }
                    transition={{
                        x: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {[...statistics, ...statistics].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-80"
                            style={{
                                x: transformedX,
                            }}
                        >
                            <Card
                                className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                style={{
                                    backgroundImage: `url('/grain.png')`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none"></div>
                                <CardContent className="flex flex-col items-center justify-center p-12 text-center bg-white/10">
                                    <stat.icon className="h-12 w-12 mb-4 text-primary" />
                                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RealEstateStatistics;
