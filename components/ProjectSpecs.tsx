"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building, Boxes, Activity, Paintbrush, ToggleLeft,
    DoorClosed, Home, LayoutGrid, Bath, FlaskRound, ChefHat,
    Droplets, Wrench, Utensils, Flame
} from 'lucide-react';
import {
    Card, CardContent, CardDescription,
    CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectSpecs = () => {
    const [activeSpec, setActiveSpec] = useState('structure');

    const specs = [
        {
            id: 'structure',
            title: 'Structure',
            icon: <Building className="h-6 w-6" />,
            description: 'Built on a solid foundation, the sturdy framed structure with columns and beams provides a secure framework for the entire building. Wall: Concrete blocks/bricks protect you from nature\'s weather elements.'
        },
        {
            id: 'wall',
            title: 'Wall',
            icon: <Boxes className="h-6 w-6" />,
            description: 'Walls made with high-quality concrete or brick, providing insulation, soundproofing, and fire resistance. They support the structure and ensure safety from external elements.'
        },
        {
            id: 'electrical',
            title: 'Electrical',
            icon: <Activity className="h-6 w-6" />,
            description: 'The electrical system is designed with safety in mind, featuring modern wiring and high-efficiency circuits that power your home while ensuring energy conservation.'
        },
        {
            id: 'painting',
            title: 'Painting',
            icon: <Paintbrush className="h-6 w-6" />,
            description: 'High-quality paints are applied to walls and ceilings, providing an aesthetic appeal as well as protection from moisture, dust, and fading.'
        },
        {
            id: 'switches',
            title: 'Switches',
            icon: <ToggleLeft className="h-6 w-6" />,
            description: 'Ergonomically designed switches and sockets ensure easy operation and safety for all users, meeting modern standards of electrical installation.'
        },
        {
            id: 'doors',
            title: 'Doors',
            icon: <DoorClosed className="h-6 w-6" />,
            description: 'Sturdy and aesthetically designed doors with secure locking mechanisms, providing privacy and security while complementing the overall design of the building.'
        },
        {
            id: 'windows',
            title: 'Windows',
            icon: <Home className="h-6 w-6" />, // Home as an alternative to Window
            description: 'Energy-efficient windows that offer good ventilation, natural light, and soundproofing. They are built to withstand weather conditions and improve the overall ambiance.'
        },
        {
            id: 'flooring',
            title: 'Flooring',
            icon: <LayoutGrid className="h-6 w-6" />,
            description: 'Durable and aesthetically pleasing flooring options, such as tiles, hardwood, or vinyl, designed to last while enhancing the beauty of the space.'
        },
        {
            id: 'dedo',
            title: 'Dado Tiling',
            icon: <LayoutGrid className="h-6 w-6" />,
            description: 'High-quality dado tiles for the lower portion of walls, offering protection against moisture and stains while adding a sophisticated touch to the design.'
        },
        {
            id: 'sanitary',
            title: 'Sanitary Fixtures',
            icon: <Bath className="h-6 w-6" />,
            description: 'Modern and functional sanitary fixtures including toilets, washbasins, showers, and bathtubs, designed for durability and ease of maintenance.'
        },
        {
            id: 'cp',
            title: 'CP Fittings',
            icon: <FlaskRound className="h-6 w-6" />,
            description: 'High-quality CP (Chrome Plated) fittings for taps, showers, and other plumbing fixtures, ensuring durability, resistance to corrosion, and modern aesthetics.'
        },
        {
            id: 'cooking',
            title: 'Cooking Platform',
            icon: <ChefHat className="h-6 w-6" />,
            description: 'A dedicated cooking platform designed for safety and ease of use, providing ample space for cooking appliances and utensils.'
        },
        {
            id: 'water',
            title: 'Water Supply',
            icon: <Droplets className="h-6 w-6" />,
            description: 'Reliable and clean water supply system with advanced filtration and piping, ensuring safe drinking water and optimal water pressure throughout the building.'
        },
        {
            id: 'sewage',
            title: 'Sewage System',
            icon: <Wrench className="h-6 w-6" />, // Wrench as an alternative to Pipe
            description: 'An efficient sewage and drainage system designed to handle waste and prevent blockages, ensuring a hygienic and safe environment.'
        },
        {
            id: 'kitchen',
            title: 'Kitchen',
            icon: <Utensils className="h-6 w-6" />,
            description: 'A well-equipped kitchen with modern fixtures and ample counter space for cooking, complete with ventilation systems and storage solutions.'
        },
        {
            id: 'gas',
            title: 'Centralised Gas Connection',
            icon: <Flame className="h-6 w-6" />,
            description: 'A centralized gas connection that provides a safe and efficient way to supply gas for cooking and other household needs.'
        }
    ];



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-12"
        >
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-bold text-foreground mb-4"
                >
                    Everything That Makes Your Home, A Confident Home
                </motion.h2>
                <p className="text-muted-foreground">
                    Your Confident home is made of the best quality raw materials available in the market.
                    We make sure that there are no compromises when it comes to the quality of your Confident home.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {specs.map((spec) => (
                    <motion.div
                        key={spec.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className={`cursor-pointer border-primary/20 hover:border-primary transition-colors
                                ${activeSpec === spec.id ? 'bg-secondary' : 'bg-background'}`}
                            onClick={() => setActiveSpec(spec.id)}
                        >
                            <CardContent className="p-4 flex items-center space-x-4">
                                <div className="text-primary">{spec.icon}</div>
                                <CardTitle className="text-lg font-medium">{spec.title}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto"
                                >
                                    {activeSpec === spec.id ? '−' : '+'}
                                </Button>
                            </CardContent>
                            {activeSpec === spec.id && spec.description && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-4 pb-4"
                                >
                                    <CardDescription>
                                        {spec.description}
                                    </CardDescription>
                                </motion.div>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectSpecs;
