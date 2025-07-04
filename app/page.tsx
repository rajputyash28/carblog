import HeroSection from '@/components/HeroSection';
import LatestSection from '@/components/LatestSection';
import NewTechnologySection from '@/components/NewTechnologySection';
import AllCategorySection from '@/components/AllCategorySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Suspense } from 'react';
import CarLoader from '@/components/CarLoader';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<CarLoader message="Loading latest posts..." />}>
        <LatestSection />
      </Suspense>
      <Suspense fallback={<CarLoader message="Loading technology posts..." />}>
        <NewTechnologySection />
      </Suspense>
      <AllCategorySection />
      <TestimonialsSection />
    </div>
  );
}