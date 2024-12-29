import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Adjust the import path based on your project structure

const FeaturedProperties = () => (
    <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                            src={`/api/placeholder/400/300`}
                            alt={`Property ${i}`}
                            className="w-full h-48 object-cover"
                        />
                        <CardContent className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Luxury Villa {i}</h3>
                            <p className="text-gray-600 mb-2">123 Example Street</p>
                            <p className="text-blue-600 font-bold">$1,250,000</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

export default FeaturedProperties;
