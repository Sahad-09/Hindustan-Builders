import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, TrendingUp, Shield, Globe, Heart } from 'lucide-react';

const featureItems = [
    {
        icon: Home,
        title: 'Wide Range',
        text: 'An extensive collection of properties tailored to your needs.',
    },
    {
        icon: Users,
        title: 'Expert Agents',
        text: 'Work with professionals who know the market inside out.',
    },
    {
        icon: TrendingUp,
        title: 'Market Leaders',
        text: 'A top-rated agency with years of industry experience.',
    },
    {
        icon: Shield,
        title: 'Trusted Partners',
        text: 'Reliable and secure services for a worry-free experience.',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        text: 'Connecting you to opportunities worldwide.',
    },
    {
        icon: Heart,
        title: 'Customer Focused',
        text: 'Your satisfaction is at the heart of everything we do.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    hover: {
        scale: 1.05,
        rotate: 3,
        transition: {
            type: 'spring',
            stiffness: 300,
        },
    },
};

const Features = () => (
    <section className="py-16">
        <div className="container mx-auto px-6">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-4xl font-bold tracking-tight text-foreground"
            >
                Why Choose Us
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mt-4 text-lg text-muted-foreground"
            >
                Discover the reasons that set us apart and make us your go-to choice.
            </motion.p>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            >
                {featureItems.map(({ icon: Icon, title, text }, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover="hover"
                        className="flex flex-col items-center text-center border border-muted rounded-lg p-6 shadow-md transition-all"
                    >
                        <motion.div
                            className="p-4 rounded-full border border-primary"
                            whileHover={{ scale: 1.2 }}
                        >
                            <Icon size={40} className="text-primary" />
                        </motion.div>
                        <h3 className="mt-4 text-xl font-semibold text-foreground">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-12 text-center"
            >
                <button className="px-6 py-3 rounded-md text-white bg-primary hover:bg-primary-dark">
                    Learn More
                </button>
            </motion.div>
        </div>
    </section>
);

export default Features;
