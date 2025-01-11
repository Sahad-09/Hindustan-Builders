import { motion } from "framer-motion";
import { Key, MapPin, Search, Tag, CreditCard, HelpCircle, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
    {
        icon: Key,
        title: "Property Management",
        description: "Comprehensive property care and maintenance services.",
        accent: "from-blue-500/20 to-blue-600/20",
    },
    {
        icon: MapPin,
        title: "Location Consultation",
        description: "Strategic location advice and market analysis.",
        accent: "from-purple-500/20 to-purple-600/20",
    },
    {
        icon: Search,
        title: "Market Research",
        description: "Data-driven insights for informed decisions.",
        accent: "from-pink-500/20 to-pink-600/20",
    },
    {
        icon: Tag,
        title: "Affordable Prices",
        description: "Competitive rates for maximum value.",
        accent: "from-red-500/20 to-red-600/20",
    },
    {
        icon: CreditCard,
        title: "Financing Options",
        description: "Flexible property financing solutions.",
        accent: "from-orange-500/20 to-orange-600/20",
    },
    {
        icon: HelpCircle,
        title: "24/7 Support",
        description: "Round-the-clock assistance for your needs.",
        accent: "from-yellow-500/20 to-yellow-600/20",
    },
];

const Services = () => {
    return (
        <div className="w-full py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mx-auto relative px-4"
            >
                {/* Section Heading */}
                <motion.div
                    className="text-center space-y-4 mb-12 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center">
                        <Settings className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Explore premium real estate services, from buying your dream home to expert property investments.
                    </p>
                    <div className="h-1 w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto" />
                </motion.div>

                {/* Services Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                className={`relative bg-gradient-to-br ${service.accent} 
                                    border-white/5 overflow-hidden backdrop-blur-sm p-8 
                                    transform transition-transform duration-300 hover:scale-[1.02]`}
                            >
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-1 bg-white/20"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{
                                        scaleX: 1,
                                        transition: {
                                            duration: 1.5,
                                            ease: "easeOut",
                                            delay: 0.2,
                                        },
                                    }}
                                    viewport={{ once: true }}
                                    style={{
                                        transformOrigin: index % 2 === 0 ? "left" : "right",
                                    }}
                                />

                                <div className="flex items-start gap-6">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                            <service.icon
                                                size={24}
                                                className="text-white"
                                            />
                                        </div>
                                        <motion.div
                                            className="absolute -inset-4 border border-white/20 rounded-full"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 0, 0.5],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Services;
