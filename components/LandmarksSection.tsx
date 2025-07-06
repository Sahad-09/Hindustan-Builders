import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Building2, GraduationCap, Building, ShoppingBag } from 'lucide-react';

type Landmark = {
    name: string;
    distance: string;
    type: string;
};

const getIconComponent = (type: string) => {
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

export const LandmarksSection = ({ landmarks }: { landmarks: Landmark[] }) => {
    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Landmarks Near You
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {landmarks.map((landmark, index) => {
                        const Icon = getIconComponent(landmark.type);
                        return (
                            <div key={index} className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium">{landmark.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {landmark.distance}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};