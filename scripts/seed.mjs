import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generatePropertyImage() {
    // Collection of Unsplash property/architectural images
    const propertyImages = [
        'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&q=80', // Modern apartment
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&q=80', // Luxury interior
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&q=80', // Contemporary building
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&q=80', // Modern lobby
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&q=80', // Living room
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&q=80', // Kitchen
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&q=80', // House exterior
        'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?w=800&h=600&q=80', // Swimming pool
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&q=80', // Exterior night
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&q=80', // Bedroom
    ];
    return faker.helpers.arrayElement(propertyImages);
}

function generateBlueprintImage() {
    return 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=800&h=600&q=80';
}

// Helper function to generate random landmarks
function generateLandmarks(count) {
    const landmarkTypes = ['Hospital', 'School', 'Mall', 'Park', 'Metro Station', 'Bus Stop', 'Restaurant'];
    const landmarks = [];

    for (let i = 0; i < count; i++) {
        landmarks.push({
            name: faker.company.name(),
            distance: `${faker.number.int({ min: 1, max: 10 })} km`,
            type: faker.helpers.arrayElement(landmarkTypes)
        });
    }

    return landmarks;
}

function generateLocation() {
    return {
        latitude: parseFloat(faker.location.latitude()),
        longitude: parseFloat(faker.location.longitude())
    };
}

async function main() {
    console.log("Seeding database...");

    // Generate 10 dummy properties
    for (let i = 0; i < 10; i++) {
        await prisma.property.create({
            data: {
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraphs(3),
                imageUrl: [
                    generatePropertyImage(),
                    generatePropertyImage(),
                    generatePropertyImage()
                ],
                imageKey: faker.string.uuid(),
                projectStatus: faker.helpers.arrayElement(['newLaunch', 'underConstruction', 'completed']),
                configurations: faker.helpers.arrayElement(['1 BHK', '2 BHK', '3 BHK', '4 BHK']),
                superBuiltUpArea: faker.number.int({ min: 500, max: 3500 }).toString(),
                reraCarpetArea: faker.number.int({ min: 400, max: 2800 }).toString(),
                apartmentBlueprintUrls: [
                    generateBlueprintImage(),
                    generateBlueprintImage()
                ],
                typicalFloorPlanUrls: [
                    generateBlueprintImage(),
                    generateBlueprintImage()
                ],
                address: `${faker.location.streetAddress()}, ${faker.location.street()}`,
                city: faker.location.city(),
                state: faker.location.state(),
                landmarks: generateLandmarks(faker.number.int({ min: 3, max: 6 })),
                location: generateLocation()
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