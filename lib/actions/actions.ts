"use server"

import { revalidatePath } from "next/cache";
import {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getPropertyById
} from "./properties";
import prisma from '../prismadb';

type Landmark = {
    name: string;
    distance: string;
    type: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

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
export async function getPropertyByIdAction(id: string | undefined) {
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
    title: string,
    description: string,
    imageKey: string,
    imageUrl: string[],
    projectStatus: string,
    configurations: string,
    superBuiltUpArea: string,
    reraCarpetArea: string,
    apartmentBlueprintUrls: string[],
    typicalFloorPlanUrls: string[],
    address: string,
    city: string,
    state: string,
    landmarks: Landmark[],
    location: Location
) {
    await createProperty(
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
}

// Update property
export async function updatePropertyAction(
    id: string | undefined,
    title: string,
    description: string,
    imageKey: string,
    imageUrl: string[],
    projectStatus: string,
    configurations: string,
    superBuiltUpArea: string,
    reraCarpetArea: string,
    apartmentBlueprintUrls: string[],
    typicalFloorPlanUrls: string[],
    address: string,
    city: string,
    state: string,
    landmarks: Landmark[],
    location: Location
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
export async function deletePropertyAction(id: string) {
    try {
        const deletedProperty = await deleteProperty(id);
        revalidatePath("/admin");
        return { success: true, data: deletedProperty };
    } catch (error) {
        return { success: false, error: "Failed to delete property" };
    }
}


export async function deleteLandmark(propertyId: string, landmarkIndex: number) {
    try {
        // First, fetch the current property to get its landmarks
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { landmarks: true }
        }) as { landmarks: Landmark[] } | null;

        if (!property) {
            throw new Error('Property not found')
        }

        // Create a new landmarks array without the specified index
        const updatedLandmarks = property.landmarks.filter((_, index) => index !== landmarkIndex)

        // Update the property with the new landmarks array
        const updatedProperty = await prisma.property.update({
            where: { id: propertyId },
            data: {
                landmarks: {
                    set: updatedLandmarks
                }
            }
        })

        // Revalidate the page to reflect changes
        revalidatePath('/properties/[id]')
        revalidatePath('/properties')

        return { success: true, property: updatedProperty }
    } catch (error) {
        console.error('Error deleting landmark:', error)
        return { success: false, error: 'Failed to delete landmark' }
    }
}

export async function addLandmark(
    propertyId: string,
    newLandmark: Landmark
) {
    try {
        // First, fetch the current property to get its landmarks
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { landmarks: true }
        }) as { landmarks: Landmark[] } | null;

        if (!property) {
            throw new Error('Property not found')
        }

        // Create a new landmarks array with the new landmark added
        const updatedLandmarks = [...property.landmarks, newLandmark]

        // Update the property with the new landmarks array
        const updatedProperty = await prisma.property.update({
            where: { id: propertyId },
            data: {
                landmarks: {
                    set: updatedLandmarks
                }
            }
        })

        // Revalidate the page to reflect changes
        revalidatePath('/properties/[id]')
        revalidatePath('/properties')

        return { success: true, property: updatedProperty }
    } catch (error) {
        console.error('Error adding landmark:', error)
        return { success: false, error: 'Failed to add landmark' }
    }
}
