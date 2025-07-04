import Link from 'next/link';
import Image from 'next/image';
import { Post, User, Car, generateCarTitle, getCarImage } from '@/lib/api';

interface CarPostCardProps {
  post: Post;
  user?: User;
  car?: Car;
  isLoading?: boolean;
}

export default function CarPostCard({ post, user, car, isLoading }: CarPostCardProps) {
  const carTitle = generateCarTitle(post, car);
  const shortDescription = post.body.slice(0, 100) + '...';
  const carImage = getCarImage(car);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="md:col-span-1">
          <div className="w-full h-64 md:h-full bg-gray-300"></div>
        </div>
        <div className="md:col-span-2 p-6">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-10 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="md:col-span-1 relative">
        <Image
          src={carImage}
          alt={carTitle}
          width={600}
          height={400}
          className="w-full h-64 md:h-full object-cover"
        />
        {car && (
          <div className="absolute top-4 left-4">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              car.availability 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {car.availability ? 'Available' : 'Sold Out'}
            </span>
          </div>
        )}
        {car && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
            {car.price}
          </div>
        )}
      </div>
      <div className="md:col-span-2 p-6">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">{user?.name || 'Loading...'}</span>
            <span className="mx-2">•</span>
            <span>3 minute read</span>
          </div>
        </div>
        
        {car && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
              {car.car}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
              {car.car_model}
            </span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              {car.car_model_year}
            </span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
              {car.car_color}
            </span>
          </div>
        )}
        
        <Link href={`/posts/${post.id}`}>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors cursor-pointer">
            {carTitle}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {shortDescription}
        </p>
        
        {car && (
          <div className="text-sm text-gray-500 mb-4">
            <span>VIN: {car.car_vin.slice(0, 8)}...</span>
          </div>
        )}
        
        <Link href={`/posts/${post.id}`}>
          <button className="bg-[#FF5959] text-white px-6 py-2 rounded-md hover:bg-[#e54545] transition-colors">
            Read full article
          </button>
        </Link>
      </div>
    </div>
  );
}