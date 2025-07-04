import HeroSection from '@/components/HeroSection';
import LatestSection from '@/components/LatestSection';
import NewTechnologySection from '@/components/NewTechnologySection';
import AllCategorySection from '@/components/AllCategorySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense fallback={<LoadingSpinner message="Loading latest posts..." />}>
        <LatestSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner message="Loading technology posts..." />}>
        <NewTechnologySection />
      </Suspense>
      <AllCategorySection />
      <TestimonialsSection />
    </div>
  );
}