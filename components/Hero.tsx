import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    const properties = [
        {
            image: "https://picsum.photos/1920/1080",
            title: "Luxury Villa",
            location: "Beverly Hills",
            price: "$5,900,000",
            description: "Stunning 5-bedroom modern villa with ocean view"
        },
        {
            image: "https://picsum.photos/1920/1080",
            title: "Urban Loft",
            location: "Downtown",
            price: "$2,100,000",
            description: "Contemporary loft with panoramic city views"
        },
        {
            image: "https://picsum.photos/1920/1080",
            title: "Seaside Manor",
            location: "Malibu Beach",
            price: "$8,500,000",
            description: "Beachfront property with private access"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % properties.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % properties.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);

    return (
        <div className="relative h-[80vh] overflow-hidden">
            <div className="relative h-full">
                {properties.map((property, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 
                        ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-background/50" />
                        </div>

                        <div className="relative h-full flex items-center">
                            <div className="container mx-auto px-6">
                                <Card className="max-w-2xl bg-background/80 backdrop-blur">
                                    <CardContent className="space-y-4 p-6">
                                        <h2 className="text-5xl font-bold">
                                            {property.title}
                                        </h2>
                                        <p className="text-2xl text-muted-foreground">
                                            {property.location}
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {property.price}
                                        </p>
                                        <p className="text-lg text-muted-foreground">
                                            {property.description}
                                        </p>
                                        <Button size="lg">
                                            View Property
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {properties.map((_, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 p-0 rounded-full ${index === currentSlide ? "bg-primary" : "bg-muted"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;


