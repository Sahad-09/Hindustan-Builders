"use client";

import { createPropertyAction } from "@/lib/actions/actions";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { imageRemove } from "@/lib/actions/ImageRemove";
import { Trash2, Loader2 } from "lucide-react";
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
import AdminProtected from "@/components/AdminProtected";

interface FormValues {
    title: string;
    description: string;
}

interface ImageData {
    urls: string[];
    key: string;
}

export default function NewDataForm() {
    const router = useRouter();
    const [imageData, setImageData] = useState<ImageData>({ urls: [], key: "" });
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
            setIsSubmitting(true);

            if (imageData.urls.length === 0) {
                alert("Please upload at least one image");
                return;
            }

            await createPropertyAction(
                values.title,
                values.description,
                imageData.key,
                imageData.urls
            );

            form.reset();
            setImageData({ urls: [], key: "" });

            router.push('/admin');
            router.refresh();

        } catch (error) {
            console.error("Error creating property:", error);
            alert("Failed to create property. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRemove = async (index: number) => {
        try {
            setIsDeleting(true);
            if (imageData.urls.length === 1) {
                const res = await imageRemove(imageData.key);
                if (res.success) {
                    setImageData({ urls: [], key: "" });
                }
            } else {
                setImageData(prev => ({
                    ...prev,
                    urls: prev.urls.filter((_, i) => i !== index)
                }));
            }
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AdminProtected>
            <div className="max-w-2xl mx-auto p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormItem className="space-y-4">
                            <FormLabel>Property Images</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {imageData.urls.map((url, index) => (
                                    <Card key={`${imageData.key}-${index}`} className="border-2">
                                        <CardContent className="p-4">
                                            <div className="relative group">
                                                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                                    <Image
                                                        src={url}
                                                        alt={`Property Image ${index + 1}`}
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
                                        </CardContent>
                                    </Card>
                                ))}

                                <Card className="border-2 border-dashed">
                                    <CardContent className="p-4">
                                        <UploadDropzone
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                const newUrls = res.map(r => r.appUrl);
                                                setImageData(prev => ({
                                                    key: res[0].key,
                                                    urls: [...prev.urls, ...newUrls]
                                                }));
                                            }}
                                            onUploadError={(error: Error) => {
                                                alert(`Upload failed: ${error.message}`);
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
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
        </AdminProtected>
    );
}