"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Home } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Shadcn Button
import Link from 'next/link'; // Next.js Link

type Landmark = {
    name: string;
    distance: string;
    type: string;
};

type Location = {
    latitude: number;
    longitude: number;
};

type PropertyTS = {
    id: string;
    title: string;
    description: string;
    imageUrl: string[];
    imageKey: string;
    projectStatus?: string; // Optional field, e.g., "New Launch"
    configurations?: string; // Optional, e.g., "2 BHK"
    superBuiltUpArea?: string; // Optional, e.g., "832 (Sq.Ft.)"
    reraCarpetArea?: string; // Optional, e.g., "612 (Sq.Ft.)"
    apartmentBlueprintUrls?: string[]; // Optional, URLs for apartment blueprints
    typicalFloorPlanUrls?: string[]; // Optional, URLs for typical floor plan blueprints
    address?: string; // Optional, Property address
    city?: string; // Optional, City
    state?: string; // Optional, State
    landmarks?: Landmark[]; // Optional, Array of nearby landmarks
    location?: Location; // Optional, Geographic coordinates
};



interface PropertyCardsProps {
    properties: PropertyTS[];
    error: string | null;
}

const PropertyCards: React.FC<PropertyCardsProps> = ({ properties, error }) => {
    // State to manage the number of visible properties
    const [visibleProperties, setVisibleProperties] = useState(6);

    // Function to load more properties
    const loadMoreProperties = () => {
        setVisibleProperties((prev) => prev + 6); // Increase by 6 for more properties
    };
    return (
        <div className="w-full min-h-[600px] relative rounded-lg overflow-hidden">
            <div className="relative z-10 p-8">
                {/* Title and Description Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4 mb-12 relative z-10"
                >
                    <div className="flex justify-center">
                        <Home className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white">
                        Real Estate Properties
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Discover a diverse selection of premium real estate properties for your next investment.
                    </p>
                    <div className="h-1 w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto" />
                </motion.div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 text-red-200 p-4 rounded-lg mb-6 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {properties.length === 0 && !error ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-lg"
                    >
                        <p className="text-gray-300">No properties available</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.slice(0, visibleProperties).map((property, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link href={`/properties/${property.id}`}>
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white/10 backdrop-blur-sm border-white/5 cursor-pointer">
                                        <div className="relative aspect-video w-full">
                                            {property.imageUrl ? (
                                                <Image
                                                    src={property.imageUrl[0]}
                                                    alt={property.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    <span className="text-gray-400">No image available</span>
                                                </div>
                                            )}
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-white">{property.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-300 line-clamp-3">
                                                {property.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View More Button with Shadcn Button and Link */}
                {visibleProperties < properties.length && (
                    <div className="text-center mt-8">
                        <Link href="/properties">
                            <Button className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary/80 transition duration-300">
                                View All
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );


};

export default PropertyCards;
