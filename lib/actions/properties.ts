import prisma from '../prismadb';

// Get all properties
export async function getProperties() {
    try {
        const properties = await prisma.property.findMany();
        return properties;
    } catch (error) {
        console.error("Error fetching properties:", error);
        throw new Error("Could not fetch properties.");
    }
}

// Get a single property by ID
export async function getPropertyById(id: string) {
    try {
        const property = await prisma.property.findUnique({
            where: { id },
        });
        return property;
    } catch (error) {
        console.error("Error fetching property:", error);
        throw new Error("Could not fetch property.");
    }
}

// Create a new property
export async function createProperty(title: string, description: string, imageKey: string, imageUrl: string[]) {
    try {
        const newProperty = await prisma.property.create({
            data: {
                title,
                description,
                imageKey,
                imageUrl
            }
        });
        return newProperty;
    } catch (error) {
        console.error("Error creating property:", error);
        throw new Error("Could not create property.");
    }
}

// Update a property
export async function updateProperty(id: string | undefined,
    title: string, description: string, imageKey: string, imageUrl: string[]
) {
    try {
        const updatedProperty = await prisma.property.update({
            where: { id },
            data: {
                title,
                description,
                imageKey,
                imageUrl
            }
        });
        return updatedProperty;
    } catch (error) {
        console.error("Error updating property:", error);
        throw new Error("Could not update property.");
    }
}

// Delete a property
export async function deleteProperty(id: string) {
    try {
        const deletedProperty = await prisma.property.delete({
            where: { id },
        });
        return deletedProperty;
    } catch (error) {
        console.error("Error deleting property:", error);
        throw new Error("Could not delete property.");
    }
}
