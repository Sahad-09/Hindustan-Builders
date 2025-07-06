"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { title: "Home", href: "/" },
        { title: "Properties", href: "/properties" },
        { title: "Contact Us", href: "/contact" },
        { title: "About Us", href: "/about" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50" role="navigation">
            <div className="mx-4">
                <div className={`absolute top-0 left-0 right-0 h-4 rounded-t-md ${isScrolled
                    ? 'bg-gradient-to-b from-bg-background/50 to-transparent backdrop-blur-lg'
                    : ''
                    }`} />

                <div className={cn(
                    "transition-all duration-300",
                    isScrolled
                        ? "bg-gradient-to-r from-bg-background/50 via-bg-background/30 to-bg-background/70 backdrop-blur-lg shadow-lg border border-border/50"
                        : "bg-gradient-to-r from-bg-background/90 via-bg-background/70 to-bg-background/50 backdrop-blur-3xl shadow-lg rounded-xl border border-[#ffff]/10",
                    "rounded-2xl mt-4"
                )}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <Link
                                href="/"
                                className="flex items-center group"
                                aria-label="Home"
                            >
                                <Image
                                    src="/logo-SVG.svg"
                                    width={100}
                                    height={100}
                                    alt="Logo"
                                    className="h-[6rem] w-auto p-3 transition-transform duration-200 group-hover:scale-105"
                                />
                            </Link>

                            <div className="hidden md:flex items-center space-x-1">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={cn(
                                                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                "relative hover:bg-secondary/80",
                                                isActive && "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary"
                                            )}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>

                            <button
                                className="md:hidden p-2 rounded-md hover:bg-secondary/80 transition-colors duration-200"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-expanded={isOpen}
                                aria-label="Toggle navigation menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        <div
                            className={cn(
                                "md:hidden transition-all duration-300 overflow-hidden",
                                isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="py-2 space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={cn(
                                                "block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                                "hover:bg-secondary/80",
                                                isActive && "after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-primary"
                                            )}
                                            onClick={() => setIsOpen(false)}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default FloatingNavbar;