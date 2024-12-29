"use client"
import { updatePropertyAction } from "@/lib/actions/actions";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { imageRemove } from "@/lib/actions/ImageRemove";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

interface FormValues {
    title: string;
    description: string;
}

interface EditPropertyFormProps {
    property?: {
        id: string;
        title: string;
        description: string;
        imageUrl: string[];
        imageKey: string;
    };
}

export default function EditPropertyForm({ property }: EditPropertyFormProps) {
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState<string[]>(property?.imageUrl || []);
    const [imageKey, setImageKey] = useState<string>(property?.imageKey || "");
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            title: property?.title,
            description: property?.description,
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            if (imageUrls.length === 0 || !imageKey) {
                alert("Please upload at least one image");
                return;
            }

            const result = await updatePropertyAction(
                property?.id,
                values.title,
                values.description,
                imageKey,
                imageUrls
            );

            if (result.success) {
                router.push("/admin");
                router.refresh();
            } else {
                alert(result.error || "Failed to update property");
            }
        } catch (error) {
            console.error("Error updating property:", error);
            alert("Failed to update property. Please try again.");
        }
    };

    const handleRemove = async (index: number) => {
        try {
            setIsDeleting(true);
            // Only attempt to remove the image if it's the last one
            if (imageUrls.length === 1) {
                const res = await imageRemove(imageKey);
                if (res.success) {
                    setImageUrls([]);
                    setImageKey("");
                }
            } else {
                // If it's not the last image, just remove it from the URLs array
                const newImageUrls = imageUrls.filter((_, i) => i !== index);
                setImageUrls(newImageUrls);
            }
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormItem className="space-y-4">
                        <FormLabel>Property Images</FormLabel>
                        <Card className="border-2 border-dashed">
                            <CardContent className="p-6 space-y-4">
                                {imageUrls.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {imageUrls.map((url, index) => (
                                            <div key={url} className="relative group">
                                                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                                    <Image
                                                        src={url}
                                                        alt={`Property Preview ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => handleRemove(index)}
                                                    disabled={isDeleting}
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4">
                                    <UploadDropzone
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            // Keep existing images and add new one
                                            setImageUrls([...imageUrls, res[0].appUrl]);
                                            // Only update imageKey if it's the first image
                                            if (!imageKey) {
                                                setImageKey(res[0].key);
                                            }
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`Upload failed: ${error.message}`);
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </FormItem>

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} required className="h-24" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full">
                            Update Property
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}