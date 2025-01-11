"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPropertiesAction, deletePropertyAction } from '@/lib/actions/actions';
import { PropertyTS } from '@/types/properties';
import { useCallback } from 'react';
import AdminProtected from '@/components/AdminProtected';

const AdminDashboard = () => {
    const [isDeleting, setIsDeleting] = React.useState<string | null>(null);
    const [properties, setProperties] = React.useState<PropertyTS[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // Use useCallback to memoize the fetch function
    const fetchProperties = useCallback(async () => {
        try {
            const response = await getPropertiesAction();
            if (response.success) {
                setProperties(response.data || []);
            } else {
                setError(response.error || "Error in getting response");
            }
        } catch (err) {
            setError("Failed to fetch properties");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Use useEffect with empty dependency array
    React.useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleDelete = async (id: string) => {
        try {
            setIsDeleting(id);
            await deletePropertyAction(id);
            // Refresh the properties list after deletion
            await fetchProperties();
        } catch (error) {
            console.error('Error deleting property:', error);
        } finally {
            setIsDeleting(null);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <AdminProtected>
                <div className="max-w-7xl mx-auto p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-lg h-[400px]"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </AdminProtected>
        );
    }

    return (
        <AdminProtected>
            <div className="max-w-7xl mx-auto p-6 mt-20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Property Management</h1>
                    <Link href="/admin/new">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Property
                        </Button>
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <Card key={property.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="relative aspect-video w-full mb-4">
                                    <Image
                                        src={property.imageUrl[0]}
                                        alt={property.title}
                                        fill
                                        className="object-cover rounded-lg"
                                        priority={true}
                                    />
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {property.description}
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Link href={`/admin/edit/${property.id}`}>
                                    <Button variant="outline" size="icon">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(property.id)}
                                    disabled={isDeleting === property.id}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {!isLoading && properties.length === 0 && (
                    <Card className="p-6 text-center">
                        <p className="text-gray-500 mb-4">No properties found</p>
                        <Link href="/admin/new">
                            <Button>Add Your First Property</Button>
                        </Link>
                    </Card>
                )}
            </div>
        </AdminProtected>
    );
};

export default AdminDashboard;