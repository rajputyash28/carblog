'use client';

import CarLoader from './CarLoader';

export default function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return <CarLoader message={message} />;
}