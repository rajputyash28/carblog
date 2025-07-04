'use client';

import { Car } from 'lucide-react';

interface CarLoaderProps {
  message?: string;
}

export default function CarLoader({ message = "Loading..." }: CarLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        {/* Car icon with animation */}
        <div className="animate-bounce">
          <Car className="w-16 h-16 text-[#FF5959]" />
        </div>
        
        {/* Road animation */}
        <div className="mt-4 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#FF5959] to-[#e54545] rounded-full animate-pulse"></div>
        </div>
        
        {/* Tire tracks */}
        <div className="flex justify-center mt-2 space-x-1">
          <div className="w-2 h-1 bg-gray-400 rounded animate-pulse"></div>
          <div className="w-2 h-1 bg-gray-400 rounded animate-pulse delay-100"></div>
          <div className="w-2 h-1 bg-gray-400 rounded animate-pulse delay-200"></div>
        </div>
      </div>
      
      <p className="text-gray-600 mt-6 text-lg font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-2">Revving up the engine...</p>
    </div>
  );
}