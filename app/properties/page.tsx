"use client"
import React, { useState, useEffect } from 'react';
import { getPropertiesAction } from '@/lib/actions/actions';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, MapPin, SquareStack, Maximize2, FileImage, Home } from 'lucide-react';
import Link from 'next/link';
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





type ProjectStatus = 'all' | 'newLaunch' | 'underConstruction' | 'completed';

const PropertiesPage = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<ProjectStatus>('all');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await getPropertiesAction();
                if (response.success) {
                    setProperties(response.data || []);
                } else {
                    setError(response.error || 'Failed to fetch properties');
                }
            } catch (err) {
                setError('An error occurred while fetching properties');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);


    const filteredProperties = properties.filter(property => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            property.title.toLowerCase().includes(searchLower) ||
            property.address?.toLowerCase().includes(searchLower) ||
            property.city?.toLowerCase().includes(searchLower);

        if (activeFilter === 'all') return matchesSearch;

        const propertyStatus = property.projectStatus?.replace(/\s+/g, '') as ProjectStatus;
        return matchesSearch && propertyStatus === activeFilter;
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const getHighlightedText = (text: string) => {
        if (!searchTerm) return text;
        const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ?
                        <span key={index} className="bg-primary/20">{part}</span> :
                        part
                )}
            </>
        );
    };

    const getBadgeColor = (status: string) => {
        const normalizedStatus = status.replace(/\s+/g, '');
        switch (normalizedStatus) {
            case 'newLaunch':
                return 'bg-primary';
            case 'underConstruction':
                return 'bg-orange-500';
            case 'completed':
                return 'bg-green-500';
            default:
                return 'bg-primary';
        }
    };

    return (
        <div className="w-full min-h-screen p-6 space-y-8 bg-background text-foreground pt-28">
            {/* Header */}
            <div className="flex flex-col items-center space-y-6 mb-8">
                <div className="bg-secondary p-4 rounded-full">
                    <Home className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold bg-primary bg-clip-text text-transparent">
                        Discover Your Dream Home
                    </h1>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore our curated collection of premium properties across prime locations
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by property name, address, or city..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 h-12 text-lg bg-secondary border-secondary"
                    />
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Button
                        variant={activeFilter === 'all' ? "default" : "secondary"}
                        onClick={() => setActiveFilter('all')}
                        className="hover:bg-primary/90"
                    >
                        All Properties
                    </Button>
                    <Button
                        variant={activeFilter === 'newLaunch' ? "default" : "secondary"}
                        onClick={() => setActiveFilter('newLaunch')}
                        className="hover:bg-primary/90"
                    >
                        New Launch
                    </Button>
                    <Button
                        variant={activeFilter === 'underConstruction' ? "default" : "secondary"}
                        onClick={() => setActiveFilter('underConstruction')}
                        className="hover:bg-primary/90"
                    >
                        Under Construction
                    </Button>
                    <Button
                        variant={activeFilter === 'completed' ? "default" : "secondary"}
                        onClick={() => setActiveFilter('completed')}
                        className="hover:bg-primary/90"
                    >
                        Completed
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    {searchTerm && (
                        <>
                            Found {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
                        </>
                    )}
                </p>
            </div>

            {/* Error Dialog */}
            {error && (
                <AlertDialog defaultOpen>
                    <AlertDialogContent className="bg-background border-secondary">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Error</AlertDialogTitle>
                            <AlertDialogDescription>{error}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction onClick={() => setError(null)}>OK</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
                /* Properties Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-card border-secondary">
                                {/* Property Image */}

                                <div className="relative aspect-[4/3] overflow-hidden group">
                                    {property.imageUrl && property.imageUrl.length > 0 ? (
                                        <Image
                                            src={property.imageUrl[0]}
                                            alt={property.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                                            <Building2 className="w-12 h-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    <Badge
                                        className={`absolute top-4 right-4 ${getBadgeColor(property?.projectStatus ?? 'default')} text-primary-foreground`}

                                    >
                                        {property.projectStatus}
                                    </Badge>
                                </div>

                                {/* Property Details */}
                                <CardHeader>
                                    <CardTitle className="text-xl text-card-foreground">
                                        {getHighlightedText(property.title)}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground line-clamp-2">
                                        {property.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 text-sm text-card-foreground">
                                            <SquareStack className="w-4 h-4 text-primary" />
                                            <span>{property.configurations}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-card-foreground">
                                            <Maximize2 className="w-4 h-4 text-primary" />
                                            <span>{property.superBuiltUpArea} sq.ft</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>
                                            {getHighlightedText(property.address || '')}
                                        </span>
                                    </div>

                                    <div className="pt-4">
                                        <Link href={`/properties/${property.id}`}>
                                            <Button className="w-full hover:bg-primary/90">View Details</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                No properties found matching your search
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertiesPage;