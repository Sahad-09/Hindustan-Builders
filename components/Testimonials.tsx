import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
    {
        name: "Emily Johnson",
        role: "Homeowner",
        feedback: "Thanks to this agency, I found my dream home effortlessly. The process was smooth, and the team was incredibly supportive.",
        rating: 5,
        location: "New York",
        purchaseType: "Single Family Home",
    },
    {
        name: "Michael Smith",
        role: "Investor",
        feedback: "Their market insights are second to none. I have made some fantastic investments with their expert guidance.",
        rating: 5,
        location: "Chicago",
        purchaseType: "Multi-Unit Property",
    },
    {
        name: "Sophia Williams",
        role: "Tenant",
        feedback: "Finding the perfect rental was so easy. I could not have asked for a better experience!",
        rating: 4,
        location: "Los Angeles",
        purchaseType: "Luxury Apartment",
    },
];

const Testimonials = () => {
    const [current, setCurrent] = React.useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    React.useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 ">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className=" flex justify-center gap-2">
                        <Quote className="h-6 w-6 text-primary" />
                        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                            Client Success Stories
                        </h2>
                    </div>
                    <div className="h-1 w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto" />
                </motion.div>

                <Card className="mx-auto max-w-3xl bg-card/50 backdrop-blur">
                    <CardContent className="p-6">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            <div className="flex justify-center">
                                <Avatar className="h-24 w-24 border-4 border-primary/20">
                                    <AvatarFallback className="bg-primary/5">
                                        {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="flex justify-center gap-1">
                                {[...Array(testimonials[current].rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                                ))}
                            </div>

                            <blockquote className="text-xl italic text-muted-foreground">
                                "{testimonials[current].feedback}"
                            </blockquote>

                            <div className="space-y-2">
                                <h4 className="text-lg font-semibold">
                                    {testimonials[current].name}
                                </h4>
                                <div className="flex justify-center gap-2">
                                    <Badge variant="secondary">{testimonials[current].role}</Badge>
                                    <Badge variant="outline">{testimonials[current].location}</Badge>
                                    <Badge variant="default">{testimonials[current].purchaseType}</Badge>
                                </div>
                            </div>
                        </motion.div>
                    </CardContent>
                </Card>

                <div className="mt-6 flex justify-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        className="rounded-full"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        className="rounded-full"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className={`h-2 w-2 rounded-full p-0 ${current === index ? "bg-primary" : "bg-muted"
                                }`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
