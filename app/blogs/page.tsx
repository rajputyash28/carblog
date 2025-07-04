'use client';

import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { getPosts, getUser, getCars, Post, User, Car, generateCarTitle, getCarBrands, categorizeCarsByType, debounce, getCarImage } from '@/lib/api';
import CarPostCard from '@/components/CarPostCard';
import ErrorMessage from '@/components/ErrorMessage';
import EmptyState from '@/components/EmptyState';
import CarLoader from '@/components/CarLoader';
import Image from 'next/image';

// State interface
interface BlogState {
  posts: Post[];
  cars: Car[];
  users: Record<number, User>;
  brands: string[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  debouncedSearchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  showAvailableOnly: boolean;
  displayedPosts: number;
}

// Action types
type BlogAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_CARS'; payload: Car[] }
  | { type: 'SET_USERS'; payload: Record<number, User> }
  | { type: 'SET_BRANDS'; payload: string[] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_DEBOUNCED_SEARCH_TERM'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_BRAND'; payload: string }
  | { type: 'SET_SHOW_AVAILABLE_ONLY'; payload: boolean }
  | { type: 'SET_DISPLAYED_POSTS'; payload: number }
  | { type: 'LOAD_MORE_POSTS' };

// Initial state
const initialState: BlogState = {
  posts: [],
  cars: [],
  users: {},
  brands: [],
  loading: true,
  error: null,
  searchTerm: '',
  debouncedSearchTerm: '',
  selectedCategory: 'All',
  selectedBrand: 'All',
  showAvailableOnly: false,
  displayedPosts: 20,
};

// Reducer function
function blogReducer(state: BlogState, action: BlogAction): BlogState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_CARS':
      return { ...state, cars: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_BRANDS':
      return { ...state, brands: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_DEBOUNCED_SEARCH_TERM':
      return { ...state, debouncedSearchTerm: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SELECTED_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_SHOW_AVAILABLE_ONLY':
      return { ...state, showAvailableOnly: action.payload };
    case 'SET_DISPLAYED_POSTS':
      return { ...state, displayedPosts: action.payload };
    case 'LOAD_MORE_POSTS':
      return { ...state, displayedPosts: state.displayedPosts + 20 };
    default:
      return state;
  }
}

export default function BlogsPage() {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const categories = ['All', 'Electric', 'SUV', 'Luxury', 'Sports', 'Hybrid', 'Sedan', 'Truck'];

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch({ type: 'SET_DEBOUNCED_SEARCH_TERM', payload: term });
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(state.searchTerm);
  }, [state.searchTerm, debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Fetch all data in parallel
      const [postsData, carsData, brandsData] = await Promise.all([
        getPosts(),
        getCars(),
        getCarBrands()
      ]);
      
      if (postsData.length === 0) {
        dispatch({ type: 'SET_ERROR', payload: 'No blog posts available' });
        return;
      }
      
      dispatch({ type: 'SET_POSTS', payload: postsData });
      dispatch({ type: 'SET_CARS', payload: carsData });
      dispatch({ type: 'SET_BRANDS', payload: ['All', ...brandsData] });
      
      // Fetch users for each post
      const userPromises = postsData.slice(0, 20).map(post => getUser(post.userId));
      const usersData = await Promise.all(userPromises);
      
      const usersMap: Record<number, User> = {};
      usersData.forEach((user, index) => {
        if (user) {
          usersMap[postsData[index].userId] = user;
        }
      });
      
      dispatch({ type: 'SET_USERS', payload: usersMap });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load blog posts. Please try again.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCarForPost = (post: Post): Car | undefined => {
    return state.cars.find(car => car.id === post.id) || state.cars[post.id % state.cars.length];
  };

  // Categorized cars for filtering
  const categorizedCars = useMemo(() => categorizeCarsByType(state.cars), [state.cars]);

  const filteredPosts = useMemo(() => {
    let filtered = state.posts;

    // Filter by search term
    if (state.debouncedSearchTerm) {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        const title = generateCarTitle(post, car);
        
        return title.toLowerCase().includes(state.debouncedSearchTerm.toLowerCase()) ||
               (car && (car.car.toLowerCase().includes(state.debouncedSearchTerm.toLowerCase()) ||
                       car.car_model.toLowerCase().includes(state.debouncedSearchTerm.toLowerCase())));
      });
    }

    // Filter by category
    if (state.selectedCategory !== 'All') {
      const categoryCars = categorizedCars[state.selectedCategory] || [];
      const categoryCarIds = new Set(categoryCars.map(car => car.id));
      
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && categoryCarIds.has(car.id);
      });
    }

    // Filter by brand
    if (state.selectedBrand !== 'All') {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && car.car === state.selectedBrand;
      });
    }

    // Filter by availability
    if (state.showAvailableOnly) {
      filtered = filtered.filter(post => {
        const car = getCarForPost(post);
        return car && car.availability;
      });
    }

    return filtered;
  }, [state.posts, state.debouncedSearchTerm, state.selectedCategory, state.selectedBrand, state.showAvailableOnly, state.cars, categorizedCars]);

  const loadMore = () => {
    dispatch({ type: 'LOAD_MORE_POSTS' });
  };

  if (state.loading) {
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
        <CarLoader message="Loading car blogs and real car data..." />
      </div>
    );
  }

  if (state.error) {
    return (
      <div>
        {/* Hero Section */}
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
                  Discover the latest car reviews, technology updates, and automotive insights.
                </p>
                <button className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors">
                  Subscribe ✓
                </button>
              </div>
              <div className="relative h-full flex items-center justify-center">
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
        <ErrorMessage message={state.error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section with Overlapping Images - Exact Layout from Screenshot */}
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
                  <span className="text-white font-semibold ml-2">{state.cars.length} Cars</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span className="text-green-400 font-semibold ml-2">
                    {state.cars.filter(car => car.availability).length} Cars
                  </span>
                </div>
              </div>
              <button className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors flex items-center gap-2">
                Subscribe ✈
              </button>
            </div>
            
            {/* Overlapping Images Grid - Recreating EXACT layout from your screenshot */}
            <div className="relative h-[400px] w-full">
              {/* Left Column - Muscle Car (Dodge Challenger) */}
              <div className="absolute top-0 left-0 w-[180px] h-[320px] z-10">
                <Image
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=180&h=320&fit=crop"
                  alt="Dodge Challenger Muscle Car"
                  width={180}
                  height={320}
                  className="rounded-lg object-cover w-full h-full shadow-xl"
                />
              </div>

              {/* Center Top - Yellow Mercedes AMG GT */}
              <div className="absolute top-5 left-20 w-[180px] h-[320px] z-10">
                <Image
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=180&fit=crop"
                  alt="Yellow Mercedes AMG GT Sports Car"
                  width={300}
                  height={180}
                  className="rounded-lg object-cover w-full h-full shadow-2xl"
                />
              </div>

              {/* Right Column - Classic Porsche */}
              <div className="absolute top-5 left-20 w-[180px] h-[320px] z-10">
                <Image
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=160&h=280&fit=crop"
                  alt="Classic Porsche Sports Car"
                  width={160}
                  height={280}
                  className="rounded-lg object-cover w-full h-full shadow-xl"
                />
              </div>

              {/* Bottom Left - Car Interior/Dashboard */}
              <div className="absolute bottom-0 left-[60px] w-[200px] h-[140px] z-20">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=140&fit=crop"
                  alt="Luxury Car Interior Dashboard"
                  width={200}
                  height={140}
                  className="rounded-lg object-cover w-full h-full shadow-xl"
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
                  value={state.searchTerm}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5959]"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.showAvailableOnly}
                    onChange={(e) => dispatch({ type: 'SET_SHOW_AVAILABLE_ONLY', payload: e.target.checked })}
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
                  onClick={() => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category })}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    state.selectedCategory === category
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
              {state.brands.slice(0, 10).map(brand => (
                <button
                  key={brand}
                  onClick={() => dispatch({ type: 'SET_SELECTED_BRAND', payload: brand })}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    state.selectedBrand === brand
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {brand}
                  {brand !== 'All' && (
                    <span className="ml-1 text-xs">
                      ({state.cars.filter(car => car.car === brand).length})
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
              {state.debouncedSearchTerm && ` for "${state.debouncedSearchTerm}"`}
              {state.selectedCategory !== 'All' && ` in ${state.selectedCategory}`}
              {state.selectedBrand !== 'All' && ` - ${state.selectedBrand}`}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {Math.min(state.displayedPosts, filteredPosts.length)} of {filteredPosts.length} posts
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
                {filteredPosts.slice(0, state.displayedPosts).map((post) => {
                  const car = getCarForPost(post);
                  return (
                    <CarPostCard 
                      key={post.id} 
                      post={post} 
                      user={state.users[post.userId]}
                      car={car}
                    />
                  );
                })}
              </div>
              
              {/* Load More Button */}
              {state.displayedPosts < filteredPosts.length && (
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