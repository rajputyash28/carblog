import { getPost, getUser, generateCarSpecs, getPosts, getCar, generateCarTitle } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AllCategorySection from '@/components/AllCategorySection';
import CarSpecs from '@/components/CarSpecs';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  
  // Generate params for all 100 posts to avoid the static generation error
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }: Props) {
  const postId = parseInt(params.id);
  
  if (isNaN(postId)) {
    notFound();
  }

  // First fetch the post
  const post = await getPost(postId);

  if (!post) {
    notFound();
  }

  // Then fetch the user using the post's userId and try to get car data
  const [user, car] = await Promise.all([
    getUser(post.userId),
    getCar(postId).catch(() => null) // Car data might not exist for all posts
  ]);

  const carSpecs = generateCarSpecs(car || undefined);
  const carTitle = generateCarTitle(post, car || undefined);

  // Generate random car image for the hero
  const carImages = [
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&h=600&fit=crop'
  ];
  
  const heroImage = carImages[postId % carImages.length];

  return (
    <div>
      {/* Hero Image */}
      <section className="relative h-96 bg-gray-200">
        <Image
          src={heroImage}
          alt={carTitle}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        {car && (
          <div className="absolute bottom-6 left-6 bg-black bg-opacity-80 text-white p-4 rounded-lg">
            <h2 className="text-xl font-bold">{car.car} {car.car_model}</h2>
            <p className="text-sm">{car.car_model_year} • {car.car_color} • {car.price}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
              car.availability ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {car.availability ? 'Available' : 'Sold Out'}
            </span>
          </div>
        )}
      </section>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            {carTitle}
          </h1>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <p className="font-medium">{user?.name || 'Unknown Author'}</p>
              <p className="text-sm text-gray-500">
                {user?.email} • Jan 10, 2024 • 3 Min Read
              </p>
            </div>
          </div>
          
          {car && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Featured Vehicle</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 font-medium">Brand:</span>
                  <p className="text-blue-900">{car.car}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Model:</span>
                  <p className="text-blue-900">{car.car_model}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Year:</span>
                  <p className="text-blue-900">{car.car_model_year}</p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Price:</span>
                  <p className="text-blue-900 font-bold">{car.price}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            {car ? `${car.car} ${car.car_model} - Comprehensive Review` : 'Comprehensive Review and Analysis'}
          </h2>
          <p className="text-gray-700 mb-6">
            {post.body}
          </p>
          
          <p className="text-gray-700 mb-6">
            {car ? 
              `The ${car.car} ${car.car_model} represents exceptional value in today's automotive market. With its ${car.car_color} exterior and ${car.car_model_year} model year features, this vehicle offers a perfect blend of style, performance, and reliability. Priced at ${car.price}, it provides excellent value for money in its segment.` :
              'In today\'s rapidly evolving automotive landscape, this vehicle represents a significant step forward in design, technology, and performance. Our comprehensive review covers everything from exterior aesthetics to under-the-hood specifications, ensuring you have all the information needed to make an informed decision.'
            }
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Performance and Technology Features
          </h2>
          <p className="text-gray-700 mb-6">
            {car ?
              `This ${car.car_model_year} ${car.car} ${car.car_model} showcases the manufacturer's commitment to innovation and quality. The ${car.car_color} finish adds to its aesthetic appeal, while the engineering underneath delivers on performance promises. Currently ${car.availability ? 'available' : 'sold out'}, this model has proven popular among discerning buyers.` :
              'The automotive industry continues to push boundaries with innovative features that enhance both safety and driving experience. This model incorporates cutting-edge technology that sets new standards in its class, from advanced driver assistance systems to state-of-the-art infotainment capabilities.'
            }
          </p>

          <p className="text-gray-700 mb-6">
            Key highlights include exceptional fuel efficiency, responsive handling, and a comfortable interior that doesn't compromise on luxury. Whether you're commuting daily or embarking on long road trips, this vehicle delivers consistent performance that exceeds expectations.
          </p>

          <h3 className="text-xl font-bold mb-4">Key Features:</h3>
          <ul className="list-disc list-inside mb-6 text-gray-700">
            <li>Advanced safety systems with collision detection</li>
            <li>Premium interior materials and ergonomic design</li>
            <li>Efficient powertrain with excellent fuel economy</li>
            <li>Comprehensive warranty and service support</li>
            <li>Cutting-edge connectivity and entertainment features</li>
            {car && <li>VIN: {car.car_vin} for complete vehicle history</li>}
          </ul>
        </div>

        {/* Car Specs Section */}
        <CarSpecs 
          specs={carSpecs} 
          title={car ? `${car.car} ${car.car_model} Specifications` : "Sample Car Specifications"} 
        />

        {car && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-900">Availability Status</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800">
                  <span className="font-semibold">Status:</span> {car.availability ? 'Available for Purchase' : 'Currently Sold Out'}
                </p>
                <p className="text-green-800">
                  <span className="font-semibold">Price:</span> {car.price}
                </p>
              </div>
              <button 
                className={`px-6 py-3 rounded-md font-semibold ${
                  car.availability 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                disabled={!car.availability}
              >
                {car.availability ? 'Contact Dealer' : 'Sold Out'}
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          <Link href="/blogs">
            <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors">
              ← Back to Blog
            </button>
          </Link>
          <Link href="/">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Home
            </button>
          </Link>
        </div>
      </article>

      {/* All Category Section */}
      <AllCategorySection />
    </div>
  );
}