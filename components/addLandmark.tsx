import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X, Building2, GraduationCap, ShoppingBag, MapPin, Building } from "lucide-react";

interface Landmark {
    name: string;
    distance: string;
    type: string;
}

interface IconOptionProps {
    value: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}

interface LandmarkCardProps {
    landmarks: Landmark[];
    addLandmark: () => void;
    removeLandmark: (index: number) => void;
    updateLandmark: (index: number, field: keyof Landmark, value: string) => void;
    IconOption: React.FC<IconOptionProps>;
}

const LandmarkCard: React.FC<LandmarkCardProps> = ({
    landmarks,
    addLandmark,
    removeLandmark,
    updateLandmark,
    IconOption,
}) => {
    return (
        <Card>
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
                <CardDescription>Add nearby points of interest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {landmarks.map((landmark, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative"
                    >
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
                                        onChange={(e) => updateLandmark(index, "name", e.target.value)}
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
                                        onChange={(e) => updateLandmark(index, "distance", e.target.value)}
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
                                    onValueChange={(value) => updateLandmark(index, "type", value)}
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
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default LandmarkCard;
