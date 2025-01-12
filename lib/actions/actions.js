"use server";

import { revalidatePath } from "next/cache";
import {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getPropertyById
} from "./properties";
import prisma from "../prismadb";

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
export async function getPropertyByIdAction(id) {
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
export async function createPropertyAction(
    title,
    description,
    imageKey,
    imageUrl,
    projectStatus,
    configurations,
    superBuiltUpArea,
    reraCarpetArea,
    apartmentBlueprintUrls,
    typicalFloorPlanUrls,
    address,
    city,
    state,
    landmarks,
    location
) {
    try {
        const newProperty = await createProperty(
            title,
            description,
            imageKey,
            imageUrl,
            projectStatus,
            configurations,
            superBuiltUpArea,
            reraCarpetArea,
            apartmentBlueprintUrls,
            typicalFloorPlanUrls,
            address,
            city,
            state,
            landmarks,
            location
        );
        revalidatePath("/properties");
        return { success: true, data: newProperty };
    } catch (error) {
        return { success: false, error: "Failed to create property" };
    }
}

// Update property
export async function updatePropertyAction(
    id,
    title,
    description,
    imageKey,
    imageUrl,
    projectStatus,
    configurations,
    superBuiltUpArea,
    reraCarpetArea,
    apartmentBlueprintUrls,
    typicalFloorPlanUrls,
    address,
    city,
    state,
    landmarks,
    location
) {
    try {
        const updatedProperty = await updateProperty(
            id,
            title,
            description,
            imageKey,
            imageUrl,
            projectStatus,
            configurations,
            superBuiltUpArea,
            reraCarpetArea,
            apartmentBlueprintUrls,
            typicalFloorPlanUrls,
            address,
            city,
            state,
            landmarks,
            location
        );
        revalidatePath("/admin");
        revalidatePath(`/admin/${id}`);
        return { success: true, data: updatedProperty };
    } catch (error) {
        return { success: false, error: "Failed to update property" };
    }
}

// Delete property
export async function deletePropertyAction(id) {
    try {
        const deletedProperty = await deleteProperty(id);
        revalidatePath("/admin");
        return { success: true, data: deletedProperty };
    } catch (error) {
        return { success: false, error: "Failed to delete property" };
    }
}
