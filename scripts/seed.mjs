import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Generate 10 dummy properties
    for (let i = 0; i < 10; i++) {
        await prisma.property.create({
            data: {
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraph(),
                imageUrl: [
                    "https://picsum.photos/200/300",
                    "https://picsum.photos/200/300"
                ],
                imageKey: "12",
                projectStatus: faker.helpers.arrayElement(['New Launch', 'Under Construction', 'Completed']),
                configurations: faker.helpers.arrayElement(['1 BHK', '2 BHK', '3 BHK']),
                superBuiltUpArea: faker.number.int({ min: 500, max: 1500, precision: 0.01 }).toString(),  // Converted to string
                reraCarpetArea: faker.number.int({ min: 400, max: 1200, precision: 0.01 }).toString(),  // Converted to string
                apartmentBlueprintUrls: [
                    "https://picsum.photos/600/400",
                    "https://picsum.photos/600/400"
                ],
                typicalFloorPlanUrls: [
                    "https://picsum.photos/600/400",
                    "https://picsum.photos/600/400"
                ],
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
            },
        });
    }

    console.log("Seeding completed!");
}

// Execute the seed function
main()
    .catch((error) => {
        console.error("Error seeding database:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
