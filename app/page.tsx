"use client";

import { getPropertiesAction } from '@/lib/actions/actions';
import { useEffect, useState } from 'react';
import PropertyCards from '@/components/PropertyCards';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';
import ImpactStatistics from '@/components/ImpactStatistics';
import ContactForm from '@/components/ContactForm';
import WhatsAppContact from '@/components/WhatsAppContact';

interface Landmark {
  name: string;
  distance: string;
  type: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Property {
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
  landmarks?: Landmark[] | any[]; // Added any[] as an alternative type
  location?: Location | any;      // Added any as an alternative type
}

type PropertyResponse = {
  success: boolean;
  data?: Property;
  error?: string;
};



export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getPropertiesAction();
        if (response.success) {
          setProperties(response.data || []);
        } else {
          setError(response.error || "Error in getting response");
        }
      } catch (err) {
        setError("Failed to fetch properties");
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#ED8A22] via-[#F06D27] to-transparent rounded-full blur-3xl opacity-10 transform -translate-y-1/4"></div>
        <div className="container mx-auto relative">
          <Hero />
        </div>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#ED8A22] via-[#F06D27] to-transparent rounded-full blur-3xl opacity-10 transform translate-x-1/4"></div>
        <div className="container mx-auto relative">
          <PropertyCards properties={properties} error={error} />
        </div>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FBFAFB] via-[#FBFAFB] to-transparent rounded-full blur-3xl opacity-10 transform -translate-x-1/4"></div>
        <div className="container mx-auto relative">
          <Features />
        </div>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FBFAFB] via-[#FBFAFB] to-transparent rounded-full blur-3xl opacity-10 transform -translate-x-1/4"></div>
        <div className="container mx-auto relative">
          <ImpactStatistics />
        </div>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#8FC442] via-[#6AB547] to-transparent rounded-full blur-3xl opacity-10 transform translate-y-1/4"></div>
        <div className="container mx-auto relative">
          <Services />
        </div>
      </div>

      <div className="relative mt-16 mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6AB547] via-[#6AB547] to-transparent rounded-full blur-3xl opacity-10 transform translate-x-1/4"></div>
        <div className="container mx-auto relative">
          <div className="max-w-xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
      <WhatsAppContact />
    </div>
  );
}