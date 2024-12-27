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
