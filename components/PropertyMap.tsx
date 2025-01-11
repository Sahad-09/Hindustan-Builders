import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

type Location = {
    latitude: number;
    longitude: number;
};

type PropertyMapProps = {
    location?: Location; // location is now optional
    address?: string; // address is now optional
};

export const PropertyMap = ({ location, address }: PropertyMapProps) => {
    const mapSrc = `https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&output=embed`;

    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px] rounded-lg overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={mapSrc}
                        allowFullScreen
                    />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{address}</p>
            </CardContent>
        </Card>
    );
};
