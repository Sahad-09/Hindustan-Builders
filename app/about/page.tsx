"use client"
import { motion } from "framer-motion";
import { Users, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ElegantAboutPage = () => {
    const teamMembers = [
        {
            name: "John Doe",
            role: "Founder & CEO",
            bio: "Passionate about community development and social impact."
        },
        {
            name: "Jane Smith",
            role: "Program Director",
            bio: "10+ years experience in educational initiatives."
        },
        {
            name: "Mark Johnson",
            role: "Community Manager",
            bio: "Dedicated to fostering meaningful connections."
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 pt-28">
            {/* Header Section */}
            <div className="flex flex-col items-center space-y-6 mb-12">
                <div className="bg-secondary p-4 rounded-full">
                    <Users className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent">
                        About Us
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Building a stronger community through innovation, education, and collaboration.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-5xl space-y-12"
            >
                {/* Our Story Section */}
                <Card className="overflow-hidden">
                    <CardContent className="p-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold text-foreground">Our Story</h2>
                            <p className="text-muted-foreground">
                                Hindustan Builders is dedicated to redefining the real estate landscape with a focus on quality, innovation, and trust. With a vision to create sustainable and modern living spaces, we have become a trusted name in the industry.
                            </p>
                            <p className="text-muted-foreground">
                                Our journey is rooted in a commitment to delivering exceptional residential and commercial projects that cater to diverse needs. Over time, we have expanded our portfolio to include state-of-the-art developments that reflect our unwavering dedication to excellence and customer satisfaction.
                            </p>

                        </div>
                    </CardContent>
                </Card>

                {/* Team Section */}
                <Card>
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Our Team</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex flex-col items-center text-center space-y-2"
                                >
                                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-4">
                                        <Users className="w-12 h-12 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                                    <p className="text-primary font-medium">{member.role}</p>
                                    <p className="text-muted-foreground">{member.bio}</p>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Mission & Values */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="bg-secondary p-4 rounded-full">
                                <Target className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Our Mission</h3>
                            <p className="text-muted-foreground">
                                To empower the Kasaragod community through educational initiatives, skill development programs, and sustainable community projects that foster growth and prosperity.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                            <div className="bg-secondary p-4 rounded-full">
                                <Heart className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">Our Values</h3>
                            <ul className="text-muted-foreground space-y-2">
                                <li>Community First</li>
                                <li>Innovation & Excellence</li>
                                <li>Transparency & Accountability</li>
                                <li>Sustainable Development</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>


            </motion.div>
        </div>
    );
};

export default ElegantAboutPage;