import { revalidatePath } from "next/cache";
import {
    createProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getPropertyById,
    addLandmark,
    deleteLandmark
} from "./properties";

// Add landmark to a property
export async function addLandmarkAction(propertyId, newLandmark) {
    try {
        const updatedProperty = await addLandmark(propertyId, newLandmark);
        revalidatePath(`/properties/${propertyId}`);
        return { success: true, data: updatedProperty };
    } catch (error) {
        return { success: false, error: "Failed to add landmark" };
    }
}

// Delete landmark from a property
export async function deleteLandmarkAction(propertyId, landmarkIndex) {
    try {
        const updatedProperty = await deleteLandmark(propertyId, landmarkIndex);
        revalidatePath(`/properties/${propertyId}`);
        return { success: true, data: updatedProperty };
    } catch (error) {
        return { success: false, error: "Failed to delete landmark" };
    }
}
