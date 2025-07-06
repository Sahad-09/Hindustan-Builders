import React, { useState, useEffect } from "react";
import { deleteLandmarkAction, addLandmarkAction } from "@/lib/actions/landmark-actions";
import { getPropertyByIdAction } from "@/lib/actions/actions";
import { MapPin, Building2, GraduationCap, Building, ShoppingBag } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X, Trash2, Save } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
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

interface LandmarksCardProps {
    id: string | undefined;
}


const LandmarksCard: React.FC<LandmarksCardProps> = ({ id }) => {
    const { toast } = useToast();
    const [landmarks, setLandmarks] = useState<Landmark[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newLandmark, setNewLandmark] = useState<Landmark>({
        name: "",
        distance: "",
        type: ""
    });

    useEffect(() => {
        const fetchLandmarks = async () => {
            try {
                setLoading(true);
                const response = await getPropertyByIdAction(id);
                if (response.success) {
                    const property = response.data as Property;
                    setLandmarks(property.landmarks || []);
                } else {
                    setError(response.error || "Failed to fetch landmarks");
                    toast({
                        title: "Error",
                        description: response.error || "Failed to fetch landmarks",
                        variant: "destructive",
                    });
                }
            } catch (err) {
                setError("An error occurred while fetching landmarks");
                toast({
                    title: "Error",
                    description: "An error occurred while fetching landmarks",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchLandmarks();
        }
    }, [id, toast]);

    const handleDeleteLandmark = async (index: number) => {
        if (!id) return;

        try {
            setDeleting(index);
            const response = await deleteLandmarkAction(id, index);

            if (response.success) {
                setLandmarks((prevLandmarks) =>
                    prevLandmarks ? prevLandmarks.filter((_, i) => i !== index) : []
                );
                toast({
                    title: "Success",
                    description: "Landmark deleted successfully",
                });
            } else {
                throw new Error(response.error || "Failed to delete landmark");
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to delete landmark",
                variant: "destructive",
            });
        } finally {
            setDeleting(null);
        }
    };

    const saveLandmark = async () => {
        if (!id || !newLandmark.name || !newLandmark.distance || !newLandmark.type) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await addLandmarkAction(id, newLandmark);

            if (response.success) {
                setLandmarks((prevLandmarks) => [
                    ...(prevLandmarks || []),
                    newLandmark
                ]);
                setIsAddingNew(false);
                setNewLandmark({ name: "", distance: "", type: "" });
                toast({
                    title: "Success",
                    description: "Landmark added successfully",
                    variant: "success"
                });
            } else {
                throw new Error(response.error || "Failed to add landmark");
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to add landmark",
                variant: "destructive",
            });
        }
    };

    const IconOption = ({ value, label, icon: Icon }: any) => (
        <SelectItem value={value} className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
        </SelectItem>
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-primary">
                        <span>Nearby Landmarks</span>
                        {!isAddingNew && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsAddingNew(true)}
                            >
                                <Plus className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-primary">Add Landmark</span>
                            </Button>
                        )}
                    </CardTitle>
                    <CardDescription>Add nearby points of interest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isAddingNew && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative">
                            <div className="absolute right-2 top-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setIsAddingNew(false);
                                        setNewLandmark({ name: "", distance: "", type: "" });
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <FormItem>
                                    <FormLabel>Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={newLandmark.name}
                                            onChange={(e) => setNewLandmark(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="e.g., City Mall"
                                            required
                                        />
                                    </FormControl>
                                </FormItem>

                                <FormItem>
                                    <FormLabel>Distance *</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={newLandmark.distance}
                                            onChange={(e) => setNewLandmark(prev => ({ ...prev, distance: e.target.value }))}
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
                                        value={newLandmark.type}
                                        onValueChange={(value) => setNewLandmark(prev => ({ ...prev, type: value }))}
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
                            </div>

                            {/* Save button in a separate div that spans full width */}
                            <div className="col-span-full flex justify-end mt-4">
                                <Button
                                    type="button"
                                    onClick={saveLandmark}
                                    className="w-32"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        </div>
                    )}

                    {landmarks && landmarks.map((landmark, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                {/* Icon based on type */}
                                <div className="flex-shrink-0">
                                    {landmark.type === "hospital" && <Building2 className="h-5 w-5 text-primary" />}
                                    {landmark.type === "school" && <GraduationCap className="h-5 w-5 text-primary" />}
                                    {landmark.type === "mall" && <ShoppingBag className="h-5 w-5 text-primary" />}
                                    {landmark.type === "park" && <MapPin className="h-5 w-5 text-primary" />}
                                    {landmark.type === "tech" && <Building className="h-5 w-5 text-primary" />}
                                </div>

                                {/* Landmark details */}
                                <div className="flex flex-col">
                                    <span className="font-medium text-foreground">{landmark.name}</span>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <span>{landmark.type.charAt(0).toUpperCase() + landmark.type.slice(1)}</span>
                                        <span>•</span>
                                        <span>{landmark.distance}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delete button */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteLandmark(index)}
                                disabled={deleting === index}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Toaster />
        </>
    );
};

export default LandmarksCard;