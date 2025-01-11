import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Home, Users, TrendingUp, Shield, Building, Heart } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const featureItems = [
    {
        icon: Home,
        title: 'Premium Listings',
        text: 'Exclusive access to high-end properties and luxury real estate opportunities.',
        category: 'properties'
    },
    {
        icon: Users,
        title: 'Expert Agents',
        text: 'Licensed professionals with deep knowledge of local real estate markets.',
        category: 'team'
    },
    {
        icon: TrendingUp,
        title: 'Market Analysis',
        text: 'Data-driven insights to help you make informed property investments.',
        category: 'achievements'
    },
    {
        icon: Shield,
        title: 'Secure Deals',
        text: 'Transparent transactions with thorough legal and financial protection.',
        category: 'properties'
    },
    {
        icon: Building,
        title: 'Property Portfolio',
        text: 'Record-breaking sales and successful property management history.',
        category: 'achievements'
    },
    {
        icon: Heart,
        title: 'Personalized Service',
        text: 'Dedicated agents who understand your unique real estate goals.',
        category: 'team'
    }
];

const Features = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12 relative z-10"
        >
            <div className="relative min-h-screen overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 mb-12 relative z-10"
                    >
                        <div className="flex justify-center">
                            <CheckCircle className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight">
                            Why Choose Us
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Your trusted partner in finding the perfect property investment.
                        </p>
                        <div className="h-1 w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto" />
                    </motion.div>

                    <Tabs defaultValue="all" className="w-full relative z-10">
                        <TabsList className="grid w-full grid-cols-4 max-w-xl mx-auto mb-8">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="properties">Properties</TabsTrigger>
                            <TabsTrigger value="team">Team</TabsTrigger>
                            <TabsTrigger value="achievements">Achievements</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featureItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-48">
                                            <CardHeader>
                                                <div className="flex items-center space-x-4">
                                                    <div className="p-2 rounded-full bg-primary/10">
                                                        <item.icon className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <CardTitle>{item.title}</CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground">{item.text}</p>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        {['properties', 'team', 'achievements'].map((category) => (
                            <TabsContent key={category} value={category} className="mt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featureItems
                                        .filter(item => item.category === category)
                                        .map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <Card className="backdrop-blur-sm bg-white/10 border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-48">
                                                    <CardHeader>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="p-2 rounded-full bg-primary/10">
                                                                <item.icon className="w-6 h-6 text-primary" />
                                                            </div>
                                                            <CardTitle>{item.title}</CardTitle>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-muted-foreground">{item.text}</p>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div >
        </motion.div>
    );
};

export default Features;