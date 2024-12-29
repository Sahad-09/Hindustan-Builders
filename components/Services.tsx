import { motion } from 'framer-motion';
import { Key, MapPin, Search, Tag, CreditCard, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
    {
        icon: Key,
        title: 'Property Management',
        description: 'Comprehensive property care and maintenance',
        color: 'bg-blue-500'
    },
    {
        icon: MapPin,
        title: 'Location Consultation',
        description: 'Strategic location advice and analysis',
        color: 'bg-purple-500'
    },
    {
        icon: Search,
        title: 'Market Research',
        description: 'Data-driven market insights',
        color: 'bg-pink-500'
    },
    {
        icon: Tag,
        title: 'Affordable Prices',
        description: 'Competitive rates guaranteed',
        color: 'bg-red-500'
    },
    {
        icon: CreditCard,
        title: 'Financing Options',
        description: 'Flexible property financing',
        color: 'bg-orange-500'
    },
    {
        icon: HelpCircle,
        title: '24/7 Support',
        description: 'Always here to help',
        color: 'bg-yellow-500'
    }
];

const Services = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const radius = 150; // Radius of the circle
    const totalItems = services.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalItems);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-screen bg-background relative flex flex-col items-center justify-center p-8">
            <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Our Services
            </h2>

            <div className="relative w-96 h-96">
                {services.map((service, index) => {
                    const angle = ((2 * Math.PI) / totalItems) * (index - activeIndex);
                    const x = radius * Math.cos(angle);
                    const y = radius * Math.sin(angle);

                    return (
                        <motion.div
                            key={index}
                            animate={{
                                x: x + radius,
                                y: y + radius,
                                scale: index === activeIndex ? 1.2 : 1,
                                opacity: index === activeIndex ? 1 : 0.7,
                            }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="absolute cursor-pointer"
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className="relative group">
                                <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center shadow-lg`}>
                                    <service.icon size={24} className="text-white" />
                                </div>

                                {index === activeIndex && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute top-20 left-1/2 transform -translate-x-1/2 w-48"
                                    >
                                        <div className="text-center">
                                            <h3 className="font-semibold text-lg">{service.title}</h3>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;