import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Deleting 10 records from the database...");

    // Fetch the first 10 records
    const propertiesToDelete = await prisma.property.findMany({
        take: 10, // Limit to 10 records
    });

    // Extract the IDs of the records to delete
    const idsToDelete = propertiesToDelete.map((property) => property.id);

    // Delete the records by their IDs
    await prisma.property.deleteMany({
        where: { id: { in: idsToDelete } },
    });

    console.log(`Deleted ${idsToDelete.length} records!`);
}

// Execute the delete function
main()
    .catch((error) => {
        console.error("Error deleting data:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
