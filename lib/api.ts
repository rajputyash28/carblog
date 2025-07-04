import carData from './car-data.json';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export interface CarApiResponse {
  cars: Car[];
}

export interface CarByModelResponse {
  Cars: Car[];
}

// Mock data for posts and users to replace unreliable external API
const mockUsers: User[] = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", username: "johnsmith" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", username: "sarahj" },
  { id: 3, name: "Mike Wilson", email: "mike.wilson@example.com", username: "mikew" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", username: "emilyd" },
  { id: 5, name: "David Brown", email: "david.brown@example.com", username: "davidb" },
  { id: 6, name: "Lisa Garcia", email: "lisa.garcia@example.com", username: "lisag" },
  { id: 7, name: "Tom Anderson", email: "tom.anderson@example.com", username: "toma" },
  { id: 8, name: "Anna Martinez", email: "anna.martinez@example.com", username: "annam" },
  { id: 9, name: "Chris Taylor", email: "chris.taylor@example.com", username: "christ" },
  { id: 10, name: "Jessica White", email: "jessica.white@example.com", username: "jessicaw" }
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: "The Future of Electric Vehicles: What to Expect in 2025",
    body: "Electric vehicles are revolutionizing the automotive industry. With advances in battery technology, charging infrastructure, and government incentives, EVs are becoming more accessible than ever. This comprehensive guide explores the latest trends, upcoming models, and what consumers can expect from the electric vehicle market in 2025.",
    userId: 1
  },
  {
    id: 2,
    title: "Top 10 Luxury SUVs That Define Premium Comfort",
    body: "Luxury SUVs combine the best of both worlds: spacious interiors and premium features. From advanced safety systems to cutting-edge infotainment, these vehicles offer unparalleled comfort for families and executives alike. Discover which luxury SUVs are setting new standards in the automotive world.",
    userId: 2
  },
  {
    id: 3,
    title: "Sports Car Showdown: Performance vs. Practicality",
    body: "Sports cars have always been about pure performance, but modern buyers want more. Today's sports cars must balance incredible speed with daily usability. We compare the latest models to see which ones offer the perfect blend of excitement and practicality for enthusiasts.",
    userId: 3
  },
  {
    id: 4,
    title: "Essential Car Maintenance Tips for Every Driver",
    body: "Regular maintenance is key to keeping your vehicle running smoothly and safely. From oil changes to tire rotations, understanding basic maintenance can save you money and extend your car's lifespan. Learn the essential maintenance tasks every driver should know about.",
    userId: 4
  },
  {
    id: 5,
    title: "Hybrid Technology: The Bridge to an Electric Future",
    body: "Hybrid vehicles serve as the perfect stepping stone between traditional gasoline engines and fully electric powertrains. With improved fuel efficiency and reduced emissions, hybrids offer an excellent compromise for environmentally conscious drivers who aren't ready to go fully electric.",
    userId: 5
  },
  {
    id: 6,
    title: "Classic Cars Making a Modern Comeback",
    body: "Classic car designs are inspiring modern automotive styling. Manufacturers are bringing back iconic design elements while incorporating contemporary technology and safety features. Explore how vintage aesthetics are influencing today's automotive landscape.",
    userId: 6
  },
  {
    id: 7,
    title: "Budget-Friendly Cars That Don't Compromise on Quality",
    body: "You don't need to spend a fortune to get a reliable, feature-rich vehicle. Many affordable cars now come with advanced safety features, modern infotainment systems, and impressive fuel economy. Discover the best value propositions in today's automotive market.",
    userId: 7
  },
  {
    id: 8,
    title: "Off-Road Adventures: Choosing the Right Vehicle",
    body: "Off-road driving requires specialized vehicles designed to handle challenging terrain. From rock crawling to desert racing, different off-road activities demand different capabilities. Learn what features to look for when choosing your next adventure vehicle.",
    userId: 8
  },
  {
    id: 9,
    title: "The Rise of Autonomous Driving Technology",
    body: "Self-driving cars are no longer science fiction. With advanced sensors, artificial intelligence, and machine learning, autonomous vehicles are becoming a reality. Explore the current state of self-driving technology and what the future holds for transportation.",
    userId: 9
  },
  {
    id: 10,
    title: "Truck Evolution: From Work Horse to Luxury Statement",
    body: "Modern pickup trucks have evolved far beyond their utilitarian roots. Today's trucks offer luxury amenities, advanced technology, and impressive performance capabilities. Discover how trucks have transformed into versatile vehicles for work and play.",
    userId: 10
  },
  {
    id: 11,
    title: "Motorcycle Safety: Essential Gear and Best Practices",
    body: "Motorcycle riding offers freedom and excitement, but safety should always be the top priority. From protective gear to defensive riding techniques, learn the essential safety measures every motorcyclist should follow to stay safe on the road.",
    userId: 1
  },
  {
    id: 12,
    title: "Car Insurance 101: Understanding Your Coverage Options",
    body: "Car insurance can be complex, but understanding your options is crucial for protecting yourself and your vehicle. From liability to comprehensive coverage, learn about different insurance types and how to choose the right policy for your needs.",
    userId: 2
  },
  {
    id: 13,
    title: "The Environmental Impact of Different Vehicle Types",
    body: "As environmental concerns grow, understanding the ecological impact of different vehicles becomes increasingly important. Compare the carbon footprints of gasoline, hybrid, and electric vehicles to make informed decisions about your next car purchase.",
    userId: 3
  },
  {
    id: 14,
    title: "Winter Driving: Preparing Your Vehicle for Cold Weather",
    body: "Winter weather presents unique challenges for drivers. From tire selection to emergency kits, proper preparation can make the difference between a safe journey and a dangerous situation. Learn how to winterize your vehicle and drive safely in cold conditions.",
    userId: 4
  },
  {
    id: 15,
    title: "Car Buying Guide: New vs. Used Vehicle Considerations",
    body: "Deciding between a new or used vehicle involves many factors beyond just price. Consider depreciation, warranty coverage, financing options, and long-term costs when making this important decision. Our comprehensive guide helps you choose the right option.",
    userId: 5
  },
  {
    id: 16,
    title: "The Art of Car Detailing: Keeping Your Vehicle Pristine",
    body: "Professional car detailing goes beyond a simple wash and wax. Learn the techniques and products used by professionals to keep vehicles looking their best. From paint correction to interior protection, discover the secrets of automotive detailing.",
    userId: 6
  },
  {
    id: 17,
    title: "Performance Modifications: Enhancing Your Vehicle Safely",
    body: "Vehicle modifications can improve performance, but they must be done safely and legally. From engine tuning to suspension upgrades, learn about popular modifications and how to enhance your vehicle without compromising safety or reliability.",
    userId: 7
  },
  {
    id: 18,
    title: "Family Car Shopping: Safety and Practicality First",
    body: "When shopping for a family vehicle, safety and practicality take precedence over style and performance. Learn about important safety ratings, cargo space considerations, and family-friendly features that make daily life easier and safer.",
    userId: 8
  },
  {
    id: 19,
    title: "The Future of Automotive Design: Trends and Innovations",
    body: "Automotive design is constantly evolving, influenced by technology, environmental concerns, and changing consumer preferences. Explore the latest design trends and innovations that are shaping the vehicles of tomorrow.",
    userId: 9
  },
  {
    id: 20,
    title: "Road Trip Planning: Essential Tips for Long-Distance Travel",
    body: "Planning a successful road trip requires more than just mapping your route. From vehicle preparation to emergency supplies, learn how to plan and execute memorable road trips while staying safe and comfortable on long journeys.",
    userId: 10
  }
];

// Retry mechanism for fetch operations (kept for any future external API needs)
async function fetchWithRetry(url: string, options?: RequestInit, maxRetries: number = 3, delay: number = 1000): Promise<Response> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Fetch attempt ${attempt} failed for ${url}:`, error);
      
      if (attempt < maxRetries) {
        // Wait before retrying, with exponential backoff
        const waitTime = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError!;
}

// Posts API functions - Now using local mock data
export async function getPosts(): Promise<Post[]> {
  try {
    // Simulate async operation with a small delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: number): Promise<Post | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    const post = mockPosts.find(post => post.id === id);
    return post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getUser(id: number): Promise<User | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    const user = mockUsers.find(user => user.id === id);
    return user || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Car API functions - Using local data
export async function getCars(): Promise<Car[]> {
  try {
    // Simulate async operation with a small delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return carData.cars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export async function getCar(id: number): Promise<Car | null> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    const car = carData.cars.find(car => car.id === id);
    return car || null;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

export async function getCarsByModel(model: string): Promise<Car[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return carData.cars.filter(car => 
      car.car_model.toLowerCase().includes(model.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching cars by model:', error);
    return [];
  }
}

export async function getCarsByBrand(brand: string): Promise<Car[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return carData.cars.filter(car => 
      car.car.toLowerCase().includes(brand.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching cars by brand:', error);
    return [];
  }
}

export async function getCarsByYear(year: number, operator?: 'gt' | 'lt'): Promise<Car[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    return carData.cars.filter(car => {
      if (operator === 'gt') {
        return car.car_model_year > year;
      } else if (operator === 'lt') {
        return car.car_model_year < year;
      } else {
        return car.car_model_year === year;
      }
    });
  } catch (error) {
    console.error('Error fetching cars by year:', error);
    return [];
  }
}

export async function getLatestPosts(): Promise<Post[]> {
  const posts = await getPosts();
  return posts.slice(0, 6);
}

export function generateCarSpecs(car?: Car) {
  if (car) {
    return [
      { label: 'Brand', value: car.car },
      { label: 'Model', value: car.car_model },
      { label: 'Year', value: car.car_model_year.toString() },
      { label: 'Color', value: car.car_color },
      { label: 'Price', value: car.price },
      { label: 'Status', value: car.availability ? 'Available' : 'Sold Out' }
    ];
  }
  
  const specs = [
    { label: 'Model Year', value: '2024' },
    { label: 'Fuel Type', value: 'Electric' },
    { label: 'Top Speed', value: '155 mph' },
    { label: 'Price', value: '$45,000' },
    { label: 'Range', value: '300 miles' },
    { label: 'Horsepower', value: '400 HP' }
  ];
  return specs;
}

// Generate car-themed titles based on real car data or fallback
export function generateCarTitle(post: Post, car?: Car): string {
  if (car) {
    const templates = [
      `${car.car} ${car.car_model} ${car.car_model_year} Review`,
      `Exploring the ${car.car} ${car.car_model}: A Complete Guide`,
      `${car.car} ${car.car_model} - Performance and Style Combined`,
      `Why the ${car.car} ${car.car_model} is Worth Your Attention`,
      `${car.car} ${car.car_model} ${car.car_model_year}: Features and Specs`,
    ];
    return templates[post.id % templates.length];
  }
  
  // Use the actual post title from mock data instead of generic car titles
  return post.title;
}

// Get unique car brands from the local data
export async function getCarBrands(): Promise<string[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 50));
    const brands = [...new Set(carData.cars.map(car => car.car))].sort();
    return brands;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    return ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];
  }
}

// Categorize cars by type with proper TypeScript typing
export function categorizeCarsByType(cars: Car[]): Record<string, Car[]> {
  const categories: Record<string, Car[]> = {
    Electric: [],
    SUV: [],
    Luxury: [],
    Sports: [],
    Hybrid: [],
    Sedan: [],
    Truck: []
  };

  cars.forEach(car => {
    const model = car.car_model.toLowerCase();
    const brand = car.car.toLowerCase();
    
    // Electric cars
    if (model.includes('electric') || model.includes('ev') || brand === 'tesla' || 
        model.includes('model s') || model.includes('model 3') || model.includes('model x') || model.includes('model y')) {
      categories.Electric.push(car);
    }
    
    // SUVs
    if (model.includes('suv') || model.includes('suburban') || model.includes('tahoe') || 
        model.includes('yukon') || model.includes('escalade') || model.includes('navigator') ||
        model.includes('expedition') || model.includes('explorer') || model.includes('pilot') ||
        model.includes('highlander') || model.includes('pathfinder') || model.includes('armada') ||
        model.includes('q7') || model.includes('x5') || model.includes('x3') || model.includes('x6') ||
        model.includes('gx') || model.includes('rx') || model.includes('lx') || model.includes('qx') ||
        model.includes('mdx') || model.includes('rdx') || model.includes('cx-') || model.includes('forester') ||
        model.includes('outback') || model.includes('ascent') || model.includes('compass') || 
        model.includes('cherokee') || model.includes('grand cherokee') || model.includes('wrangler') ||
        model.includes('rogue') || model.includes('murano') || model.includes('santa fe') ||
        model.includes('tucson') || model.includes('sorento') || model.includes('sportage') ||
        model.includes('range rover')) {
      categories.SUV.push(car);
    }
    
    // Luxury cars
    if (brand === 'mercedes-benz' || brand === 'bmw' || brand === 'audi' || 
        brand === 'lexus' || brand === 'cadillac' || brand === 'lincoln' ||
        brand === 'bentley' || brand === 'rolls-royce' || brand === 'maserati' ||
        brand === 'aston martin' || brand === 'lamborghini' || brand === 'ferrari' ||
        brand === 'porsche' || brand === 'jaguar' || brand === 'land rover' ||
        brand === 'infiniti' || brand === 'acura' || brand === 'maybach') {
      categories.Luxury.push(car);
    }
    
    // Sports cars
    if (model.includes('corvette') || model.includes('mustang') || model.includes('camaro') ||
        model.includes('challenger') || model.includes('charger') || model.includes('911') ||
        model.includes('boxster') || model.includes('cayman') || model.includes('gt-r') ||
        model.includes('370z') || model.includes('350z') || model.includes('supra') ||
        model.includes('rx-7') || model.includes('rx-8') || model.includes('miata') ||
        model.includes('viper') || model.includes('gto') || model.includes('firebird') ||
        model.includes('trans am') || model.includes('z4') || model.includes('slk') ||
        model.includes('sl-class') || model.includes('amg') || model.includes('m3') ||
        model.includes('m5') || model.includes('m6') || model.includes('s4') ||
        model.includes('s5') || model.includes('rs') || model.includes('type r') ||
        model.includes('sti') || model.includes('evo') || model.includes('nsx') ||
        model.includes('f-type') || model.includes('488') || model.includes('huracan') ||
        model.includes('720s') || model.includes('evora') ||
        brand === 'ferrari' || brand === 'lamborghini' || brand === 'mclaren' ||
        brand === 'lotus' || brand === 'alfa romeo') {
      categories.Sports.push(car);
    }
    
    // Hybrid cars
    if (model.includes('hybrid') || model.includes('prius') || model.includes('camry hybrid') ||
        model.includes('accord hybrid') || model.includes('fusion hybrid') || 
        model.includes('escape hybrid') || model.includes('highlander hybrid') ||
        model.includes('rx hybrid') || model.includes('gs hybrid') || model.includes('ls hybrid') ||
        model.includes('insight') || model.includes('cr-z')) {
      categories.Hybrid.push(car);
    }
    
    // Sedans
    if (model.includes('sedan') || model.includes('camry') || model.includes('accord') ||
        model.includes('civic') || model.includes('corolla') || model.includes('altima') ||
        model.includes('sentra') || model.includes('maxima') || model.includes('impala') ||
        model.includes('malibu') || model.includes('fusion') || model.includes('focus') ||
        model.includes('jetta') || model.includes('passat') || model.includes('a3') ||
        model.includes('a4') || model.includes('a6') || model.includes('a8') ||
        model.includes('3 series') || model.includes('5 series') || model.includes('7 series') ||
        model.includes('c-class') || model.includes('e-class') || model.includes('s-class') ||
        model.includes('is') || model.includes('es') || model.includes('gs') ||
        model.includes('ls') || model.includes('cts') || model.includes('ats') ||
        model.includes('xts') || model.includes('continental') || model.includes('mkz') ||
        model.includes('legacy') || model.includes('impreza') || model.includes('wrx') ||
        model.includes('sonata') || model.includes('elantra') || model.includes('genesis') ||
        model.includes('optima') || model.includes('forte') || model.includes('rio') ||
        model.includes('ghibli') || model.includes('giulia') || model.includes('q50')) {
      categories.Sedan.push(car);
    }
    
    // Trucks
    if (model.includes('f-150') || model.includes('f-250') || model.includes('f-350') ||
        model.includes('silverado') || model.includes('sierra') || model.includes('ram') ||
        model.includes('tundra') || model.includes('tacoma') || model.includes('frontier') ||
        model.includes('titan') || model.includes('ridgeline') || model.includes('colorado') ||
        model.includes('canyon') || model.includes('ranger') || model.includes('gladiator') ||
        model.includes('1500') || model.includes('2500') || model.includes('3500')) {
      categories.Truck.push(car);
    }
  });

  return categories;
}

// Enhanced search function for cars
export function searchCars(cars: Car[], searchTerm: string): Car[] {
  if (!searchTerm) return cars;
  
  const term = searchTerm.toLowerCase();
  return cars.filter(car => 
    car.car.toLowerCase().includes(term) ||
    car.car_model.toLowerCase().includes(term) ||
    car.car_color.toLowerCase().includes(term) ||
    car.car_model_year.toString().includes(term)
  );
}

// Filter cars by availability
export function filterCarsByAvailability(cars: Car[], availableOnly: boolean): Car[] {
  if (!availableOnly) return cars;
  return cars.filter(car => car.availability);
}

// Filter cars by price range
export function filterCarsByPriceRange(cars: Car[], minPrice: number, maxPrice: number): Car[] {
  return cars.filter(car => {
    const price = parseFloat(car.price.replace('$', '').replace(',', ''));
    return price >= minPrice && price <= maxPrice;
  });
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get car image based on car brand and model with real category-based images
export function getCarImage(car?: Car): string {
  if (!car) {
    const defaultImages = [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop'
    ];
    return defaultImages[Math.floor(Math.random() * defaultImages.length)];
  }

  const brand = car.car.toLowerCase();
  const model = car.car_model.toLowerCase();

  // BMW specific images
  if (brand === 'bmw') {
    const bmwImages = [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop', // BMW M3
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop', // BMW X5
      'https://images.unsplash.com/photo-1606016159991-8b5d2f87a5a8?w=600&h=400&fit=crop', // BMW i8
    ];
    return bmwImages[car.id % bmwImages.length];
  }

  // Mercedes-Benz specific images
  if (brand === 'mercedes-benz' || brand === 'mercedes') {
    const mercedesImages = [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop', // Mercedes AMG
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', // Mercedes Sports Car
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop', // Mercedes Luxury
    ];
    return mercedesImages[car.id % mercedesImages.length];
  }

  // Truck specific images
  if (model.includes('f-150') || model.includes('silverado') || model.includes('ram') || 
      model.includes('tundra') || model.includes('tacoma') || model.includes('frontier')) {
    const truckImages = [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop', // Ford F-150
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop', // Pickup Truck
      'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop', // Heavy Duty Truck
    ];
    return truckImages[car.id % truckImages.length];
  }

  // Sports car specific images
  if (model.includes('corvette') || model.includes('mustang') || model.includes('camaro') ||
      model.includes('911') || model.includes('gt-r') || brand === 'ferrari' || brand === 'lamborghini') {
    const sportsCarImages = [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop', // Sports Car
      'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop', // Supercar
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop', // Yellow Sports Car
    ];
    return sportsCarImages[car.id % sportsCarImages.length];
  }

  // Tesla/Electric specific images
  if (brand === 'tesla' || model.includes('electric') || model.includes('ev')) {
    const electricImages = [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop', // Tesla Model S
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop', // Electric Car
    ];
    return electricImages[car.id % electricImages.length];
  }

  // SUV specific images
  if (model.includes('suv') || model.includes('x5') || model.includes('q7') || 
      model.includes('escalade') || model.includes('tahoe')) {
    const suvImages = [
      'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop', // Luxury SUV
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop', // SUV
    ];
    return suvImages[car.id % suvImages.length];
  }

  // Brand-specific fallback images
  const brandImages: Record<string, string> = {
    'audi': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    'porsche': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'ferrari': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'lamborghini': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
    'ford': 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&h=400&fit=crop',
    'chevrolet': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
    'toyota': 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    'honda': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
    'nissan': 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&h=400&fit=crop',
    'lexus': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    'cadillac': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
    'jaguar': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
    'land rover': 'https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=600&h=400&fit=crop',
    'volkswagen': 'https://images.unsplash.com/photo-1606016159991-8b5d2f87a5a8?w=600&h=400&fit=crop',
    'hyundai': 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&h=400&fit=crop',
    'kia': 'https://images.unsplash.com/photo-1612825173281-9a193378527e?w=600&h=400&fit=crop',
    'mazda': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&h=400&fit=crop',
    'subaru': 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=400&fit=crop',
    'infiniti': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop',
    'acura': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    'mclaren': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop',
    'bentley': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    'rolls-royce': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
    'maserati': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop',
    'aston martin': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop',
    'lotus': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop',
    'alfa romeo': 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop'
  };

  // Return brand-specific image or default
  return brandImages[brand] || 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop';
}