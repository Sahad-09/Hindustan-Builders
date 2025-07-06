"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { sendEmail } from "@/lib/actions/action-contact"; // Adjust the path according to where your action.ts is located

const ElegantContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState("");

    // Updated type for event parameter
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Updated type for event parameter
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("Sending...");

        // Create FormData to pass to the server-side function
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("message", formData.message);

        const response = await sendEmail(formDataObj); // Call the sendEmail function
        if (response.success) {
            setFormStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setFormStatus("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 pt-28">
            {/* Header */}
            <div className="flex flex-col items-center space-y-6 mb-8">
                <div className="bg-secondary p-4 rounded-full">
                    <Mail className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent">
                        Contact Us
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl grid md:grid-cols-2 border rounded-xl shadow-lg overflow-hidden"
            >
                {/* Contact Information Side */}
                <CardContent className="space-y-6 pt-20 sm:pt-14 md:pt-14 lg:pt-14 px-4 sm:px-6 md:px-8 lg:px-10 bg-card text-card-foreground flex justify-center items-center">

                    <div className="space-y-4 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
                            <MapPin className="w-10 h-10 text-muted-foreground mb-2 sm:mb-0" />
                            <span className="text-foreground">
                                KMC:30/268, KSR/CA/02/2021, Near Clock Tower, Railway Station Road, Kasaragod, Kerala - 671121
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
                            <Phone className="w-6 h-6 text-muted-foreground mb-2 sm:mb-0" />
                            <span className="text-foreground">+91 9900319096</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4">
                            <Mail className="w-6 h-6 text-muted-foreground mb-2 sm:mb-0" />
                            <span className="text-foreground">contact@buildupkasaragod.org</span>
                        </div>
                        <div className="flex justify-center sm:justify-start space-x-6 pt-4">
                            {[{ Icon: Facebook }, { Icon: Twitter }, { Icon: Instagram }].map(({ Icon }, index) => (
                                <a key={index} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                </CardContent>


                {/* Contact Form Side */}
                <Card className="p-0 pt-4 md:p-8 text-card-foreground">
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your name"
                                    className="bg-input text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your email"
                                    className="bg-input text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-foreground">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Your message"
                                    rows={4}
                                    className="bg-input text-foreground"
                                />
                            </div>

                            {formStatus && (
                                <p className={`text-center ${formStatus.includes('successfully') ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {formStatus}
                                </p>
                            )}

                            <Button type="submit" className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground">
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );


};

export default ElegantContactPage;