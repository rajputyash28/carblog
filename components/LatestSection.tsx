import Link from 'next/link';
import Image from 'next/image';
import { getLatestPosts, getCars, generateCarTitle, getCarImage } from '@/lib/api';

export default async function LatestSection() {
  const [posts, cars] = await Promise.all([
    getLatestPosts(),
    getCars()
  ]);

  const getCarForPost = (postId: number) => {
    return cars.find(car => car.id === postId) || cars[postId % cars.length];
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Latest Featured Post */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Latest</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={getCarImage(getCarForPost(posts[0]?.id || 1))}
                alt="Featured Car"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">By John Doe • March 17, 2024</p>
                <h3 className="text-xl font-bold mb-3">
                  {posts[0] ? generateCarTitle(posts[0], getCarForPost(posts[0].id)) : 'Latest Car Review'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {posts[0] ? posts[0].body.slice(0, 150) + '...' : 'Discover the latest automotive insights and comprehensive car reviews.'}
                </p>
                <Link href={posts[0] ? `/posts/${posts[0].id}` : '/blogs'}>
                  <button className="bg-[#FF5959] text-white px-6 py-2 rounded-md hover:bg-[#e54545] transition-colors">
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trending Blogs */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Trending Blogs</h2>
              <Link href="/blogs" className="text-blue-600 hover:text-blue-800">
                See all
              </Link>
            </div>
            <div className="space-y-6">
              {posts.slice(0, 4).map((post, index) => {
                const car = getCarForPost(post.id);
                return (
                  <div key={post.id} className={`p-4 rounded-lg ${index === 1 ? 'bg-[#FF5959] text-white' : 'bg-gray-50'}`}>
                    <p className="text-sm mb-2 opacity-75">By John Doe • Aug 23, 2023</p>
                    <Link href={`/posts/${post.id}`}>
                      <h3 className="font-bold hover:opacity-80 cursor-pointer">
                        {generateCarTitle(post, car)}
                      </h3>
                    </Link>
                    {car && (
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${index === 1 ? 'bg-red-600' : 'bg-blue-100 text-blue-800'}`}>
                          {car.car}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${index === 1 ? 'bg-red-600' : 'bg-gray-200 text-gray-800'}`}>
                          {car.price}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}