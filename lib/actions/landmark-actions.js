import { revalidatePath } from "next/cache";
import prisma from "../prismadb";

export async function deleteLandmark(propertyId, landmarkIndex) {
    try {
        const property = await prisma.property.findFirst({
            where: { id: propertyId }
        });

        if (!property) {
            throw new Error("Property not found");
        }

        const landmarks = property.landmarks || [];
        const updatedLandmarks = landmarks.filter((_, index) => index !== landmarkIndex);

        const updatedProperty = await prisma.property.update({
            where: { id: propertyId },
            data: {
                landmarks: updatedLandmarks
            }
        });

        revalidatePath("/properties/[id]");
        revalidatePath("/properties");

        return { success: true, property: updatedProperty };
    } catch (error) {
        console.error("Error deleting landmark:", error);
        return { success: false, error: "Failed to delete landmark" };
    }
}

export async function addLandmark(propertyId, newLandmark) {
    try {
        const property = await prisma.property.findFirst({
            where: { id: propertyId }
        });

        if (!property) {
            throw new Error("Property not found");
        }

        const landmarks = property.landmarks || [];
        const updatedLandmarks = [...landmarks, newLandmark];

        const updatedProperty = await prisma.property.update({
            where: { id: propertyId },
            data: {
                landmarks: updatedLandmarks
            }
        });

        revalidatePath("/properties/[id]");
        revalidatePath("/properties");

        return { success: true, property: updatedProperty };
    } catch (error) {
        console.error("Error adding landmark:", error);
        return { success: false, error: "Failed to add landmark" };
    }
}
