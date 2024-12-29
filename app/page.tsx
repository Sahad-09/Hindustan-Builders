// Home.tsx
"use client";

import { getPropertiesAction } from '@/lib/actions/actions';
import { useEffect, useState } from 'react';
import { PropertyTS } from '@/types/properties';
import PropertyCards from '@/components/PropertyCards';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';

export default function Home() {
  const [properties, setProperties] = useState<PropertyTS[]>([]);
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
    <div className="min-h-screen bg-gray-50 ">
      <Hero /> {/* Place the Hero component here */}
      <div className="max-w-6xl mx-auto space-y-8">
        <Features />
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        <Testimonials />
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        <Services />
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        <FeaturedProperties />
      </div>
      <div className="max-w-6xl mx-auto space-y-8">
        <PropertyCards properties={properties} error={error} />
      </div>
    </div>
  );
}
