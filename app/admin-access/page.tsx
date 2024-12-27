"use client";

import { createPropertyAction } from "@/lib/actions/actions";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { imageRemove } from "@/lib/actions/ImageRemove";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NewDataForm() {
    const [imageUrl, setImageUrl] = useState("");
    const [imageKey, setImageKey] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        try {
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;

            if (!imageUrl || !imageKey) {
                alert("Please upload an image");
                return;
            }

            await createPropertyAction(title, description, imageKey, imageUrl);

            // Reset form after successful submission
            formData.set("title", "");
            formData.set("description", "");
            setImageUrl("");
            setImageKey("");

        } catch (error) {
            console.error("Error creating property:", error);
            alert("Failed to create property. Please try again.");
        }
    };

    const handleRemove = async () => {
        try {
            setIsDeleting(true);
            const res = await imageRemove(imageKey);
            if (res.success) {
                setImageUrl("");
                setImageKey("");
            }
        } catch (error) {
            console.error("Error removing image:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form action={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Property Image
                    </label>
                    <Card className="border-2 border-dashed border-gray-200">
                        <CardContent className="p-6">
                            {!imageUrl ? (
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        setImageUrl(res[0].appUrl);
                                        setImageKey(res[0].key);
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert(`Upload failed: ${error.message}`);
                                    }}
                                />
                            ) : (
                                <div className="relative group">
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                        <Image
                                            src={imageUrl}
                                            alt="Property Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        disabled={isDeleting}
                                        className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Title Input */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        className="w-full p-2 border rounded-md h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                    Create Property
                </button>
            </form>
        </div>
    );
}