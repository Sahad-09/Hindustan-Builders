"use client";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const RealEstateFooter = () => {
    return (
        <motion.footer
            className="bg-background text-foreground py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-foreground">About Us</h3>
                        <p className="text-muted-foreground">
                            Your trusted partner in finding your dream home or investment property. With years of experience, we provide exceptional services to meet all your real estate needs.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-foreground">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/properties" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/agents" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Our Agents
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-foreground">Follow Us</h3>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-3xl text-muted-foreground hover:text-foreground transition-colors" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-3xl text-muted-foreground hover:text-foreground transition-colors" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-3xl text-muted-foreground hover:text-foreground transition-colors" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-3xl text-muted-foreground hover:text-foreground transition-colors" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-3xl text-muted-foreground hover:text-foreground transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-border pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Real Estate Co. All Rights Reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default RealEstateFooter;