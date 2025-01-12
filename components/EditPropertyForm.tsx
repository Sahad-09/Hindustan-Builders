"use client"
import { updatePropertyAction } from "@/lib/actions/actions";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { imageRemove } from "@/lib/actions/ImageRemove";
import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast"
import { Plus, X, Loader2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import LandmarksCard from "./editFormComp/LandmarksCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FormValues {
    id: string;
    title: string;
    description: string;
    imageUrl: string[];
    imageKey: string;
    projectStatus: string;
    configurations: string;
    superBuiltUpArea: string;
    reraCarpetArea: string;
    apartmentBlueprintUrls: string[];
    typicalFloorPlanUrls: string[];
    address: string;
    city: string;
    state: string;
    landmarks: Landmark[];
    location: Location;
}

interface ImageData {
    urls: string[];
    key: string;
}

interface Landmark {
    name: string;
    distance: string;
    type: string;
}

interface Location {
    latitude: number;
    longitude: number;
}
interface EditPropertyFormProps {
    property?: {
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
    };
}


export default function EditPropertyForm({ property }: EditPropertyFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [propertyImages, setPropertyImages] = useState<ImageData>({
        urls: Array.isArray(property?.imageUrl) ? property?.imageUrl : [property?.imageUrl || ''],

        key: property?.imageKey || ""
    });
    const [landmarks, setLandmarks] = useState<Landmark[]>([]);
    const [blueprintImages, setBlueprintImages] = useState<ImageData>({
        urls: property?.apartmentBlueprintUrls || [],
        key: ""
    });
    const [floorPlanImages, setFloorPlanImages] = useState<ImageData>({
        urls: property?.typicalFloorPlanUrls || [],
        key: ""
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            title: property?.title,
            description: property?.description,
            projectStatus: property?.projectStatus,
            configurations: property?.configurations,
            superBuiltUpArea: property?.superBuiltUpArea,
            reraCarpetArea: property?.reraCarpetArea,
            address: property?.address,
            city: property?.city,
            state: property?.state,
            apartmentBlueprintUrls: property?.apartmentBlueprintUrls || [],
            typicalFloorPlanUrls: property?.typicalFloorPlanUrls || [],
            landmarks: property?.landmarks || [{ name: "", distance: "", type: "" }],
            location: property?.location || { latitude: 0, longitude: 0 },
        },
    });


    const onSubmit = async (values: FormValues) => {
        try {
            setIsSubmitting(true);

            if (propertyImages.urls.length === 0) {
                toast({
                    title: "Validation Error",
                    description: "Please upload at least one property image",
                    variant: "destructive",
                });
                return;
            }

            const result = await updatePropertyAction(
                property?.id,
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
                values.landmarks,
                values.location
            );

            if (result.success) {
                toast({
                    title: "Success",
                    description: "Property updated successfully",
                    variant: "success"
                });
                router.push("/admin");
                router.refresh();
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to update property",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error updating property:", error);
            toast({
                title: "Error",
                description: "Failed to update property. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const addLandmark = () => {
        setLandmarks([...landmarks, {
            name: "",
            distance: "",
            type: "",
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
                    toast({
                        title: "Success",
                        description: "Image removed successfully",
                        variant: "default"
                    });
                }
            } else {
                setState(prev => ({
                    ...prev,
                    urls: prev.urls.filter((_, i) => i !== index),
                }));
                toast({
                    title: "Success",
                    description: "Image removed successfully",
                    variant: "default"
                });
            }
        } catch (error) {
            console.error("Error removing image:", error);
            toast({
                title: "Error",
                description: "Failed to remove image",
                variant: "destructive",
            });
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
    }) => (
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
                        <Card key={`${imageData.key || index}-${index}`} className="border border-gray-200">
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
                                        key: prev.key || res[0].key,
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

    return (
        <div className="max-w-4xl mx-auto p-6 pt-[6rem]">

            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Edit Property</h1>
                <p className="text-gray-500 mt-1">
                    Update the property details below. Fields marked with * are required.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                        <ImageUploadSection
                            title="Property Images"
                            description="Update or add new property images"
                            imageData={propertyImages}
                            setImageData={setPropertyImages}
                            imageType="property"
                            required
                        />

                        <ImageUploadSection
                            title="Apartment Blueprint Images"
                            description="Update or add new blueprint images"
                            imageData={blueprintImages}
                            setImageData={setBlueprintImages}
                            imageType="blueprint"
                        />

                        <ImageUploadSection
                            title="Typical Floor Plan Images"
                            description="Update or add new floor plan images"
                            imageData={floorPlanImages}
                            setImageData={setFloorPlanImages}
                            imageType="floorPlan"
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className=" text-primary">Property Details</CardTitle>
                            <CardDescription>
                                Update the basic information about the property
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
                                    name="location.latitude"
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
                                    name="location.longitude"
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


                    <LandmarksCard id={property?.id} />


                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating Property...
                                </>
                            ) : (
                                'Update Property'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster />
        </div>
    );
}
