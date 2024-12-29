import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Deleting 10 properties from the database...");

    try {
        // Fetch 10 properties
        const propertiesToDelete = await prisma.property.findMany({
            take: 10, // Limit to 10 records
        });

        // Delete the fetched properties
        for (const property of propertiesToDelete) {
            await prisma.property.delete({
                where: { id: property.id }, // Ensure deletion by ID
            });
        }

        console.log("Deleted 10 properties.");
    } catch (error) {
        console.error("Error deleting properties:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Execute the delete function
main()
    .catch((error) => {
        console.error("Error during execution:", error);
        process.exit(1);
    });
