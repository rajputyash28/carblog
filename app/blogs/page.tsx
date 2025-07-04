'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPosts, getUser, getCars, Post, User, Car, generateCarTitle, getCarBrands, categorizeCarsByType, searchCars, filterCarsByAvailability, debounce, getCarImage } from '@/lib/api';
import CarPostCard from '@/components/CarPostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';
import Image from 'next/image';

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<Record<number, User>>({});
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(20);

  const categories = ['All', 'Electric', 'SUV', 'Luxury', 'Sports', 'Hybrid', 'Sedan', 'Truck'];

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all data in parallel
      const [postsData, carsData, brandsData] = await Promise.all([
        getPosts(),
        getCars(),
        getCarBrands()
      ]);
      
      if (postsData.length === 0) {
        setError('No blog posts available');
        return;
      }
      
      setPosts(postsData);
      setCars(carsData);
      setBrands(['All', ...brandsData]);
      
      // Fetch users for each post
      const userPromises = postsData.slice(0, 20).map(post => getUser(post.userId));
      const usersData = await Promise.all(userPromises);
      
      const usersMap: Record<number, User> = {};
      usersData.forEach((user, index) => {
        if (user) {
          usersMap[postsData[index].userId] = user;
        }
      });
      
      setUsers(usersMap);
    } catch (err) {
      setError('Failed to load blog posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCarForPost = (post: Post): Car | undefined => {
    // Try to match post with a car by ID, or get a random car
    return cars.find(car => car.id === post.id) || cars[post.id % cars.length];
  };

  // Categorized cars for filtering
  const categorizedCars = useMemo(() => categorizeCarsByType(cars), [cars]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        const title = generateCarTitle(post, car);
        
        return title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
               (car && (car.car.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                       car.car_model.toLowerCase().includes(debouncedSearchTerm.toLowerCase())));
      });
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      const categoryCars = categorizedCars[selectedCategory] || [];
      const categoryCarIds = new Set(categoryCars.map(car => car.id));
      
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && categoryCarIds.has(car.id);
      });
    }

    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && car.car === selectedBrand;
      });
    }

    // Filter by availability
    if (showAvailableOnly) {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && car.availability;
      });
    }

    return filtered;
  }, [posts, debouncedSearchTerm, selectedCategory, selectedBrand, showAvailableOnly, cars, categorizedCars]);

  const loadMore = () => {
    setDisplayedPosts(prev => prev + 20);
  };

  if (loading) {
    return (
      <div>
        {/* Hero Section Skeleton */}
        <section className="bg-[#232536] text-white py-16">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="h-12 bg-gray-600 rounded mb-6 animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded mb-8 w-3/4 animate-pulse"></div>
                <div className="h-12 bg-gray-600 rounded w-32 animate-pulse"></div>
              </div>
              <div className="relative">
                <div className="h-64 bg-gray-600 rounded-lg mb-4 animate-pulse"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-gray-600 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <LoadingSpinner message="Loading car blogs and real car data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-[#232536] text-white py-16">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Your Journey<br />
                  Your Car<br />
                  Your Way
                </h1>
                <p className="text-gray-300 mb-8 text-lg">
                  Discover the latest car reviews, technology updates, and automotive insights.
                </p>
                <button className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors">
                  Subscribe ✓
                </button>
              </div>
              <div className="relative">
                <div className="h-64 bg-gray-600 rounded-lg mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-gray-600 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Overlapping Images */}
      <section className="bg-[#232536] text-white relative">
        <div className="max-w-[1280px] mx-auto px-4 h-[594px] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your Journey<br />
                Your Car<br />
                Your Way
              </h1>
              <p className="text-gray-300 mb-8 text-lg">
                Discover the latest car reviews, technology updates, and automotive insights. From electric vehicles to luxury cars, we cover everything you need to know about the automotive world with real car data and specifications.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="text-sm">
                  <span className="text-gray-400">Real Data:</span>
                  <span className="text-white font-semibold ml-2">{cars.length} Cars</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span className="text-green-400 font-semibold ml-2">
                    {cars.filter(car => car.availability).length} Cars
                  </span>
                </div>
              </div>
              <button className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors flex items-center gap-2">
                Subscribe ✈
              </button>
            </div>
            
            {/* Overlapping Images Grid */}
            <div className="relative h-full flex items-center justify-center">
              {/* Main large image */}
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop"
                  alt="Luxury Car"
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              
              {/* Overlapping smaller images */}
              <div className="absolute top-0 right-0 z-20">
                <Image
                  src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=150&fit=crop"
                  alt="Car"
                  width={180}
                  height={135}
                  className="rounded-lg"
                />
              </div>
              
              <div className="absolute bottom-0 left-0 z-20">
                <Image
                  src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=200&h=150&fit=crop"
                  alt="Car"
                  width={180}
                  height={135}
                  className="rounded-lg"
                />
              </div>
              
              <div className="absolute bottom-10 right-10 z-30">
                <Image
                  src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=150&h=100&fit=crop"
                  alt="Car"
                  width={150}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search cars, brands, models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5959]"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Available only</span>
                </label>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 py-2">Categories:</span>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#FF5959] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                  {category !== 'All' && categorizedCars[category] && (
                    <span className="ml-1 text-xs">({categorizedCars[category].length})</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Brand Filters */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 py-2">Brands:</span>
              {brands.slice(0, 10).map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedBrand === brand
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {brand}
                  {brand !== 'All' && (
                    <span className="ml-1 text-xs">
                      ({cars.filter(car => car.car === brand).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Car Blog Posts
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedBrand !== 'All' && ` - ${selectedBrand}`}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {Math.min(displayedPosts, filteredPosts.length)} of {filteredPosts.length} posts
            </div>
          </div>
          
          {filteredPosts.length === 0 ? (
            <EmptyState 
              message="No blog posts found" 
              description="Try adjusting your search or filter criteria"
            />
          ) : (
            <>
              <div className="space-y-8">
                {filteredPosts.slice(0, displayedPosts).map((post) => {
                  const car = getCarForPost(post);
                  return (
                    <CarPostCard 
                      key={post.id} 
                      post={post} 
                      user={users[post.userId]}
                      car={car}
                    />
                  );
                })}
              </div>
              
              {/* Load More Button */}
              {displayedPosts < filteredPosts.length && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors"
                  >
                    Load More Posts
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}