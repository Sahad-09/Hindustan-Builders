export interface PropertyTS {
    id: string;
    title: string;
    description: string;
    imageUrl: string[] | string;
    imageKey: string;
    projectStatus?: string;
    configurations?: string;
    superBuiltUpArea?: string;
    reraCarpetArea?: string;
    apartmentBlueprintUrls?: string[];
    typicalFloorPlanUrls?: string[];
    address?: string;
    city?: string;
    state?: string;
    landmarks?: LandmarkTS[];
    location?: Location;
}

export interface LandmarkTS {
    name: string;
    distance: string;
    type: string;
}

export interface LocationTS {
    latitude: number;
    longitude: number;
}
