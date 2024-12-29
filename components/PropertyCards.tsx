// PropertyCards.tsx
"use client";

import { PropertyTS } from '@/types/properties';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyCardsProps {
    properties: PropertyTS[];
    error: string | null;
}

const PropertyCards: React.FC<PropertyCardsProps> = ({ properties, error }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Properties</h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {properties.length === 0 && !error ? (
                <div className="text-center py-12 bg-white rounded-lg">
                    <p className="text-gray-500">No properties available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative aspect-video w-full">
                                {property.imageUrl ? (
                                    <Image
                                        src={property.imageUrl[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">No image available</span>
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle>{property.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 line-clamp-3">
                                    {property.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyCards;
