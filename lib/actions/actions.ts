"use server"

import { revalidatePath } from "next/cache";
import {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getPropertyById
} from "./properties";

// Get all properties
export async function getPropertiesAction() {
    try {
        const properties = await getProperties();
        revalidatePath("/properties");
        return { success: true, data: properties };
    } catch (error) {
        return { success: false, error: "Failed to fetch properties" };
    }
}

// Get single property
export async function getPropertyByIdAction(id: string) {
    try {
        const property = await getPropertyById(id);
        if (!property) {
            return { success: false, error: "Property not found" };
        }
        return { success: true, data: property };
    } catch (error) {
        return { success: false, error: "Failed to fetch property" };
    }
}

// Create property
export async function createPropertyAction(title: string, description: string, imageKey: string, imageUrl: string) {
    await createProperty(title, description, imageKey, imageUrl)
    revalidatePath("/properties");
}

// Update property
export async function updatePropertyAction(
    id: string,
    data: { title?: string; description?: string }
) {
    try {
        const updatedProperty = await updateProperty(id, data);
        revalidatePath("/properties");
        revalidatePath(`/properties/${id}`);
        return { success: true, data: updatedProperty };
    } catch (error) {
        return { success: false, error: "Failed to update property" };
    }
}

// Delete property
export async function deletePropertyAction(id: string) {
    try {
        const deletedProperty = await deleteProperty(id);
        revalidatePath("/properties");
        return { success: true, data: deletedProperty };
    } catch (error) {
        return { success: false, error: "Failed to delete property" };
    }
}