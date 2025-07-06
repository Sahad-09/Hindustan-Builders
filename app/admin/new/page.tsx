"use client";

import { createPropertyAction } from "@/lib/actions/actions";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { imageRemove } from "@/lib/actions/ImageRemove";
import { Trash2, Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Building2, GraduationCap, Building, ShoppingBag } from 'lucide-react';
import React from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import AdminProtected from "@/components/AdminProtected";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"
import LandmarkCard from "@/components/addLandmark";

interface Landmark {
    name: string;
    distance: string;
    type: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

interface FormValues {
    title: string;
    description: string;
    projectStatus: string;
    configurations: string;
    superBuiltUpArea: string;
    reraCarpetArea: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
}

interface ImageData {
    urls: string[];
    key: string;
}

export default function NewDataForm() {
    const { toast } = useToast()
    const router = useRouter();
    const [propertyImages, setPropertyImages] = useState<ImageData>({ urls: [], key: "" });
    const [blueprintImages, setBlueprintImages] = useState<ImageData>({ urls: [], key: "" });
    const [floorPlanImages, setFloorPlanImages] = useState<ImageData>({ urls: [], key: "" });
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            projectStatus: "",
            configurations: "",
            superBuiltUpArea: "",
            reraCarpetArea: "",
            address: "",
            city: "",
            state: "",
            latitude: "",
            longitude: "",
        },
    });

    const addLandmark = () => {
        setLandmarks([...landmarks, {
            name: "",
            distance: "",
            type: ""
        }]);
    };

    const removeLandmark = (index: number) => {
        setLandmarks(landmarks.filter((_, i) => i !== index));
    };

    const updateLandmark = (index: number, field: keyof Landmark, value: string) => {
        const updatedLandmarks = [...landmarks];
        updatedLandmarks[index] = {
            ...updatedLandmarks[index],
            [field]: value
        };
        setLandmarks(updatedLandmarks);
    };

    const onSubmit = async (values: FormValues) => {
        try {
            setIsSubmitting(true);

            if (propertyImages.urls.length === 0) {
                alert("Please upload at least one property image");
                return;
            }

            const location: Location = {
                latitude: parseFloat(values.latitude),
                longitude: parseFloat(values.longitude)
            };

            await createPropertyAction(
                values.title,
                values.description,
                propertyImages.key,
                propertyImages.urls,
                values.projectStatus,
                values.configurations,
                values.superBuiltUpArea,
                values.reraCarpetArea,
                blueprintImages.urls,
                floorPlanImages.urls,
                values.address,
                values.city,
                values.state,
                landmarks,
                location
            );

            form.reset();
            setPropertyImages({ urls: [], key: "" });
            setBlueprintImages({ urls: [], key: "" });
            setFloorPlanImages({ urls: [], key: "" });
            setLandmarks([]);

            router.push('/admin');
            router.refresh();

        } catch (error) {
            console.error("Error creating property:", error);
            alert("Failed to create property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemove = async (
        index: number,
        imageType: 'property' | 'blueprint' | 'floorPlan',
        setState: React.Dispatch<React.SetStateAction<ImageData>>
    ) => {
        try {
            setIsDeleting(true);
            const imageData = imageType === 'property' ? propertyImages :
                imageType === 'blueprint' ? blueprintImages :
                    floorPlanImages;

            if (imageData.urls.length === 1) {
                const res = await imageRemove(imageData.key);
                if (res.success) {
                    setState({ urls: [], key: "" });
                }
            } else {
                setState(prev => ({
                    ...prev,
                    urls: prev.urls.filter((_, i) => i !== index),
                }));
            }
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const ImageUploadSection = ({
        title,
        description,
        imageData,
        setImageData,
        imageType,
        required = false
    }: {
        title: string;
        description: string;
        imageData: ImageData;
        setImageData: React.Dispatch<React.SetStateAction<ImageData>>;
        imageType: 'property' | 'blueprint' | 'floorPlan';
        required?: boolean;
    }) => {
        const { toast } = useToast();

        return (
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        {title}
                        {required && (
                            <span className="text-sm text-red-500">*</span>
                        )}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {imageData.urls.map((url, index) => (
                            <Card key={`${imageData.key}-${index}`} className="border border-gray-200">
                                <CardContent className="p-4">
                                    <div className="relative group">
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                            <Image
                                                src={url}
                                                alt={`${title} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                type="button"
                                                onClick={() => handleRemove(index, imageType, setImageData)}
                                                disabled={isDeleting}
                                                variant="destructive"
                                                size="icon"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                                            Image {index + 1}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
                            <CardContent className="p-4">
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        const newUrls = res.map(r => r.appUrl);
                                        setImageData(prev => ({
                                            key: res[0].key,
                                            urls: [...prev.urls, ...newUrls],
                                        }));
                                        toast({
                                            title: "Success",
                                            description: `Successfully uploaded ${res.length} image${res.length !== 1 ? 's' : ''}`,
                                            variant: "success"
                                        });
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast({
                                            title: "Upload Failed",
                                            description: error.message,
                                            variant: "destructive",
                                        });
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    {imageData.urls.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            {imageData.urls.length} image{imageData.urls.length !== 1 ? 's' : ''} uploaded
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const getIconComponent = (type: any) => {
        switch (type) {
            case 'hospital':
                return Building2;
            case 'school':
                return GraduationCap;
            case 'tech':
                return Building;
            case 'mall':
                return ShoppingBag;
            case 'park':
                return MapPin;
            default:
                return Building;
        }
    };

    const IconOption = ({ value, label, icon: Icon }: any) => (
        <SelectItem value={value} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
        </SelectItem>
    );


    return (
        <AdminProtected>
            <div className="max-w-4xl mx-auto p-6 pt-[6rem]">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Add New Property</h1>
                    <p className="text-gray-500 mt-1">
                        Fill in the details below to create a new property listing. Fields marked with * are required.
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-6">
                            <ImageUploadSection
                                title="Property Images"
                                description="Upload high-quality images of the property. These will be displayed as the main images."
                                imageData={propertyImages}
                                setImageData={setPropertyImages}
                                imageType="property"
                                required
                            />

                            <ImageUploadSection
                                title="Apartment Blueprint Images"
                                description="Upload detailed blueprint images showing the layout of individual apartments."
                                imageData={blueprintImages}
                                setImageData={setBlueprintImages}
                                imageType="blueprint"
                            />

                            <ImageUploadSection
                                title="Typical Floor Plan Images"
                                description="Upload floor plan images showing the layout of typical floors in the building."
                                imageData={floorPlanImages}
                                setImageData={setFloorPlanImages}
                                imageType="floorPlan"
                            />
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-primary">Property Details</CardTitle>
                                <CardDescription>
                                    Enter the basic information about the property
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter a descriptive title for the property
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="projectStatus"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Status *</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        required
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Project Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="newLaunch">New Launch</SelectItem>
                                                            <SelectItem value="underConstruction">Under Construction</SelectItem>
                                                            <SelectItem value="completed">Completed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormDescription>
                                                    Current status of the project
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description *</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} required className="h-32" />
                                            </FormControl>
                                            <FormDescription>
                                                Provide a detailed description of the property
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="configurations"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Configurations *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormDescription>
                                                    E.g., 1BHK, 2BHK, 3BHK
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="superBuiltUpArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Super Built-up Area *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormDescription>
                                                    Total area in sq. ft.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="reraCarpetArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>RERA Carpet Area *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormDescription>
                                                    RERA specified carpet area in sq. ft.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* <Card>
                            <CardHeader>
                                <CardTitle className=" text-primary">Location Details</CardTitle>
                                <CardDescription>
                                    Enter the property location information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address *</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
                                            </FormControl>
                                            <FormDescription>
                                                Complete property address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card> */}

                        <Card>
                            <CardHeader>
                                <CardTitle className=" text-primary">Location Details</CardTitle>
                                <CardDescription>
                                    Enter the property location information
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address *</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
                                            </FormControl>
                                            <FormDescription>
                                                Complete property address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} required />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="latitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Latitude *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        step="any"
                                                        required
                                                        placeholder="e.g., 8.5241"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="longitude"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Longitude *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        step="any"
                                                        required
                                                        placeholder="e.g., 76.9366"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Nearby Landmarks</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addLandmark}
                                    >
                                        <Plus className="h-4 w-4 mr-2 text-primary" />
                                        <span className=" text-primary">Add Landmark</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>
                                    Add nearby points of interest
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {landmarks.map((landmark, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-2"
                                            onClick={() => removeLandmark(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>

                                        <div className="space-y-4">
                                            <FormItem>
                                                <FormLabel>Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={landmark.name}
                                                        onChange={(e) => updateLandmark(index, 'name', e.target.value)}
                                                        placeholder="e.g., City Mall"
                                                        required
                                                    />
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Distance *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={landmark.distance}
                                                        onChange={(e) => updateLandmark(index, 'distance', e.target.value)}
                                                        placeholder="e.g., 2.5 km"
                                                        required
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        </div>

                                        <div className="space-y-4">
                                            <FormItem>
                                                <FormLabel>Type *</FormLabel>
                                                <Select
                                                    value={landmark.type}
                                                    onValueChange={(value) => updateLandmark(index, 'type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="hospital">Hospital</SelectItem>
                                                        <SelectItem value="school">School</SelectItem>
                                                        <SelectItem value="mall">Mall</SelectItem>
                                                        <SelectItem value="park">Park</SelectItem>
                                                        <SelectItem value="tech">Tech Park</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Icon *</FormLabel>
                                                <Select
                                                    value={landmark.icon}
                                                    onValueChange={(value) => updateLandmark(index, 'icon', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select icon" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="hospital">Hospital</SelectItem>
                                                        <SelectItem value="school">School</SelectItem>
                                                        <SelectItem value="shopping">Shopping</SelectItem>
                                                        <SelectItem value="park">Park</SelectItem>
                                                        <SelectItem value="building">Building</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card> */}

                        {/* <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Nearby Landmarks</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addLandmark}
                                    >
                                        <Plus className="h-4 w-4 mr-2 text-primary" />
                                        <span className="text-primary">Add Landmark</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>
                                    Add nearby points of interest
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {landmarks.map((landmark, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-2"
                                            onClick={() => removeLandmark(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>

                                        <div className="space-y-4">
                                            <FormItem>
                                                <FormLabel>Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={landmark.name}
                                                        onChange={(e) => updateLandmark(index, 'name', e.target.value)}
                                                        placeholder="e.g., City Mall"
                                                        required
                                                    />
                                                </FormControl>
                                            </FormItem>

                                            <FormItem>
                                                <FormLabel>Distance *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        value={landmark.distance}
                                                        onChange={(e) => updateLandmark(index, 'distance', e.target.value)}
                                                        placeholder="e.g., 2.5 km"
                                                        required
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        </div>

                                        <div className="space-y-4">
                                            <FormItem>
                                                <FormLabel>Type *</FormLabel>
                                                <Select
                                                    value={landmark.type}
                                                    onValueChange={(value) => updateLandmark(index, 'type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <IconOption value="hospital" label="Hospital" icon={Building2} />
                                                        <IconOption value="school" label="School" icon={GraduationCap} />
                                                        <IconOption value="mall" label="Mall" icon={ShoppingBag} />
                                                        <IconOption value="park" label="Park" icon={MapPin} />
                                                        <IconOption value="tech" label="Tech Park" icon={Building} />
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>

                                            {/* <FormItem>
                                                <FormLabel>Icon *</FormLabel>
                                                <Select

                                                    value={landmark.icon}
                                                    onValueChange={(value) => updateLandmark(index, 'icon', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select icon">
                                                            {landmark.icon && React.createElement(getIconComponent(landmark.icon), { className: "h-4 w-4 mr-2" })}
                                                            {landmark.icon}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <IconOption value="hospital" label="Hospital" icon={Building2} />
                                                        <IconOption value="school" label="School" icon={GraduationCap} />
                                                        <IconOption value="shopping" label="Shopping" icon={ShoppingBag} />
                                                        <IconOption value="park" label="Park" icon={MapPin} />
                                                        <IconOption value="building" label="Building" icon={Building} />
                                                    </SelectContent>
                                                </Select>
                                            </FormItem> */}
                        {/* </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card> */}

                        <LandmarkCard
                            landmarks={landmarks}
                            addLandmark={addLandmark}
                            removeLandmark={removeLandmark}
                            updateLandmark={updateLandmark}
                            IconOption={IconOption}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Property...
                                </>
                            ) : (
                                'Create Property'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
            <Toaster />
        </AdminProtected>
    );
}