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

// Retry mechanism for fetch operations
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

// JSONPlaceholder API functions
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: number): Promise<Post | null> {
  try {
    const response = await fetchWithRetry(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getUser(id: number): Promise<User | null> {
  try {
    const response = await fetchWithRetry(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Car API functions
export async function getCars(): Promise<Car[]> {
  try {
    const response = await fetchWithRetry('https://myfakeapi.com/api/cars/');
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data: CarApiResponse = await response.json();
    return data.cars || [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export async function getCar(id: number): Promise<Car | null> {
  try {
    const response = await fetchWithRetry(`https://myfakeapi.com/api/cars/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch car');
    }
    const data = await response.json();
    return data.Car || null;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

export async function getCarsByModel(model: string): Promise<Car[]> {
  try {
    const response = await fetchWithRetry(`https://myfakeapi.com/api/cars/model/${model}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars by model');
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
  } catch (error) {
    console.error('Error fetching cars by model:', error);
    return [];
  }
}

export async function getCarsByBrand(brand: string): Promise<Car[]> {
  try {
    const response = await fetchWithRetry(`https://myfakeapi.com/api/cars/name/${brand}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars by brand');
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
  } catch (error) {
    console.error('Error fetching cars by brand:', error);
    return [];
  }
}

export async function getCarsByYear(year: number, operator?: 'gt' | 'lt'): Promise<Car[]> {
  try {
    let url = `https://myfakeapi.com/api/cars/year/${year}`;
    if (operator) {
      url += `?q=${operator}`;
    }
    const response = await fetchWithRetry(url);
    if (!response.ok) {
      throw new Error('Failed to fetch cars by year');
    }
    const data: CarByModelResponse = await response.json();
    return data.Cars || [];
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
  
  const carTitles = [
    "Top 5 Electric Cars in 2025",
    "Best SUVs for Family Adventures", 
    "Luxury Car Review: Performance Meets Elegance",
    "Maintenance Tips for Your Dream Car",
    "Sports Cars That Define Speed",
    "Eco-Friendly Vehicles for the Future",
    "Classic Cars Making a Comeback",
    "Budget-Friendly Cars with Premium Features",
    "Off-Road Vehicles for Every Terrain",
    "Hybrid Technology: The Future of Driving",
    "BMW vs Mercedes: The Ultimate Comparison",
    "Tesla Model S: Electric Revolution",
    "Ford F-150: America's Favorite Truck",
    "Porsche 911: Timeless Sports Car Icon",
    "Honda Civic: Reliability Redefined",
    "Audi A4: German Engineering Excellence",
    "Toyota Camry: The Perfect Family Car",
    "Chevrolet Corvette: American Muscle",
    "Nissan GT-R: Japanese Performance Beast",
    "Volkswagen Golf: European Compact Champion"
  ];
  
  return carTitles[post.id % carTitles.length] || post.title;
}

// Get unique car brands from the API
export async function getCarBrands(): Promise<string[]> {
  try {
    const cars = await getCars();
    const brands = [...new Set(cars.map(car => car.car))].sort();
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
        model.includes('tucson') || model.includes('sorento') || model.includes('sportage')) {
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
        model.includes('optima') || model.includes('forte') || model.includes('rio')) {
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
    'acura': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop'
  };

  // Return brand-specific image or default
  return brandImages[brand] || 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop';
}