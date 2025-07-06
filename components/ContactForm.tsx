// components/ContactForm.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { sendEmail } from "@/lib/actions/action-contact"; // Adjust the path accordingly
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState("");

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("Sending...");

        // Prepare data for sending
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("message", formData.message);

        const response = await sendEmail(formDataObj);
        if (response.success) {
            setFormStatus("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setFormStatus("Failed to send message. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto relative px-4"
        >
            <div className="p-0 pt-4 md:p-8  text-card-foreground">
                <motion.div
                    className="text-center space-y-4 mb-12 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex justify-center">
                        <Mail className="w-12 h-12 text-primary" /> {/* Replace with your desired icon */}
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Contact Us
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get in touch with us for inquiries, support, or assistance.
                    </p>
                    <div className="h-1 w-20 bg-gradient-to-r from-white/60 to-transparent mx-auto" />
                </motion.div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your name"
                            className="bg-input/25 text-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Your email"
                            className="bg-input/25 text-foreground"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Your message"
                            rows={4}
                            className="bg-input/25 text-foreground"
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
            </div>
        </motion.div>
    );
};

export default ContactForm;
