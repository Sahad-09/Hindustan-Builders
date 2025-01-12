import React, { useState } from 'react';
import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { HomeIcon } from 'lucide-react';

const CircleSlider = () => {
    const [focusElement, setFocusElement] = useState(0);

    // Generate different image URLs using unique IDs
    const images = Array.from({ length: 7 }, (_, index) => `https://picsum.photos/id/${index + 10}/200/300`);

    const info = [
        'Info about place 1: A bustling metropolis known for its financial prowess, rich culture, and vibrant nightlife.',
        'Mumbai: The city that never sleeps, it is the financial capital of India and home to Bollywood, offering a mix of modernity and tradition.',
        'Bengaluru: Known as the "Silicon Valley of India", this city is a hub for technology and innovation, with a thriving startup ecosystem.',
        'Kolkata: Known for its colonial architecture and cultural festivals, Kolkata is a city steeped in history and intellectual heritage.',
        'Gujarat: Famous for its diverse culture, rich history, and unique cuisine, Gujarat is a state that celebrates both tradition and modernity.',
        'Vadodara: Known for its royal heritage, arts, and culture, Vadodara is a city with a blend of tradition and modernity, offering a rich historical experience.',
        'Anand: Often referred to as the "Milk Capital of India", Anand is home to the renowned Amul cooperative and has a strong agricultural legacy.'
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mx-auto relative px-4"
            >
                <motion.div
                    className="text-center space-y-4 mb-12 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center">
                        <HomeIcon className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white">
                        Featured Properties
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Explore our exclusive selection of stunning properties tailored to meet every taste and budget.
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-white/60 to-transparent mx-auto rounded-full" />
                </motion.div>

                <div className="relative w-full min-h-[70vh] flex items-center justify-center px-8">
                    <div className="relative w-full max-w-5xl flex items-center space-x-8">
                        {/* Main carousel container */}
                        <div className="flex-1">
                            <FancyCarousel
                                images={images}
                                setFocusElement={setFocusElement}
                                carouselRadius={200}
                                peripheralImageRadius={50}
                                centralImageRadius={90}
                                focusElementStyling={{ border: '3px solid #ba4949', boxShadow: '0 4px 20px rgba(186, 73, 73, 0.5)' }}
                                autoRotateTime={3}
                                borderWidth={4}
                                borderHexColor={'#1c364f'}
                            />
                        </div>

                        {/* Info box */}
                        <div className="w-96">
                            <Card className="backdrop-blur-sm bg-white/20 border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2">
                                <CardContent className="p-6">
                                    <p className="text-muted-foreground font-medium text-center break-words text-lg">
                                        {info[focusElement]}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default CircleSlider;
