"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getPropertyByIdAction } from "@/lib/actions/actions";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Building2,
    MapPin,
    ChevronLeft,
    ChevronRight,
    SquareStack,
    Maximize2,
    Binary,
    Home,
    FileImage,
    MapPinned
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectSpecs from "@/components/ProjectSpecs";
import { LandmarksSection } from "@/components/LandmarksSection";
import { PropertyMap } from "@/components/PropertyMap";
import Image from "next/image";



interface Landmark {
    name: string;
    distance: string;
    type: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

interface Property {
    id: string;
    title: string;
    description: string;
    imageUrl: string[] | string;
    imageKey: string;
    projectStatus?: string;
    configurations?: string;
    superBuiltUpArea?: string;
    reraCarpetArea?: string;
    apartmentBlueprintUrls?: string[];
    typicalFloorPlanUrls?: string[];
    address?: string;
    city?: string;
    state?: string;
    landmarks?: Landmark[] | any[]; // Added any[] as an alternative type
    location?: Location | any;      // Added any as an alternative type
}

type PropertyResponse = {
    success: boolean;
    data?: Property;
    error?: string;
};


const PropertyDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("photos");

    useEffect(() => {
        if (!id) return;
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response: PropertyResponse = await getPropertyByIdAction(id);
                if (response.success && response.data) {
                    setProperty(response.data);
                } else {
                    setError(response.error || "Failed to fetch property details");
                }
            } catch (err) {
                setError("An error occurred while fetching property details");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const nextImage = () => {
        if (property?.imageUrl) {
            setCurrentImageIndex((prev) =>
                prev === property.imageUrl.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (property?.imageUrl) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.imageUrl.length - 1 : prev - 1
            );
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen p-6 space-y-6 bg-background">
                <Card className="max-w-5xl mx-auto bg-card">
                    <Skeleton className="w-full aspect-video" />
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center min-h-screen bg-background text-foreground"
            >
                <p className="text-destructive">{error}</p>
            </motion.div>
        );
    }

    if (!property) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center items-center min-h-screen bg-background"
            >
                <p className="text-muted-foreground">Property not found</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full min-h-screen p-8 bg-background text-foreground mt-16"
        >
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Button
                        onClick={() => router.push("/properties")}
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Listings
                    </Button>
                </motion.div>

                {/* Property Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">{property.title}</h1>
                            <div className="flex items-center gap-2 mt-2">
                                <MapPinned className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">
                                    {property.address}, {property.city}, {property.state}
                                </span>
                            </div>
                        </div>
                        {property.projectStatus && (
                            <Badge variant="default" className="bg-primary text-primary-foreground">
                                {property.projectStatus}
                            </Badge>
                        )}
                    </div>
                </motion.div>

                {/* Main Content */}
                <Tabs defaultValue="photos" className="space-y-6">
                    <TabsList className="bg-secondary">
                        <TabsTrigger value="photos">Photos</TabsTrigger>
                        <TabsTrigger value="floorplan">Floor Plans</TabsTrigger>
                        <TabsTrigger value="blueprint">Blueprints</TabsTrigger>
                    </TabsList>

                    {/* Photos Tab */}
                    <TabsContent value="photos">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            {property.imageUrl && property.imageUrl.length > 0 ? (
                                <>
                                    <motion.img
                                        key={currentImageIndex}
                                        src={property.imageUrl[currentImageIndex]}
                                        alt={`${property.title} - Image ${currentImageIndex + 1}`}
                                        className="object-cover w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    {property.imageUrl.length > 1 && (
                                        <div className="absolute inset-0 flex justify-between items-center p-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-background/80 rounded-full backdrop-blur-sm"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-background/80 rounded-full backdrop-blur-sm"
                                                onClick={nextImage}
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                    <Building2 className="w-12 h-12 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Floor Plan Tab */}
                    <TabsContent value="floorplan">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {property.typicalFloorPlanUrls?.map((url, index) => (
                                <Card key={index} className="overflow-hidden bg-card relative aspect-square">
                                    <Image
                                        src={url}
                                        alt={`Floor Plan ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-contain p-2"
                                        priority={index === 0}
                                    />
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Blueprint Tab */}
                    <TabsContent value="blueprint">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {property.apartmentBlueprintUrls?.map((url, index) => (
                                <Card key={index} className="overflow-hidden bg-card">
                                    <img
                                        src={url}
                                        alt={`Blueprint ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5 text-primary" />
                                Property Specifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Configuration</p>
                                    <p className="font-medium">{property.configurations}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Super Built-up Area</p>
                                    <p className="font-medium">{property.superBuiltUpArea} sq.ft</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">RERA Carpet Area</p>
                                    <p className="font-medium">{property.reraCarpetArea} sq.ft</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Project Status</p>
                                    <p className="font-medium">{property.projectStatus}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileImage className="h-5 w-5 text-primary" />
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                                {property.description}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Sections */}
                <div className="mt-8 space-y-6">
                    <LandmarksSection landmarks={property?.landmarks || []} />

                    <PropertyMap location={property?.location} address={property?.address} />

                </div>
                <ProjectSpecs />
            </div>
        </motion.div>
    );

};

export default PropertyDetailsPage;