import { Car, Wrench, Settings, Navigation } from 'lucide-react';

export default function AllCategorySection() {
  const categories = [
    {
      title: "Car Reviews",
      description: "Lorem ipsum dolor sit amet consectetur. Urna dignissim ac sapien at ut.",
      icon: Car,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Maintenance Tips",
      description: "Lorem ipsum dolor sit amet consectetur. Urna dignissim ac sapien at ut.",
      icon: Wrench,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Car Modifications",
      description: "Lorem ipsum dolor sit amet consectetur. Urna dignissim ac sapien at ut.",
      icon: Settings,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Driving Tips",
      description: "Lorem ipsum dolor sit amet consectetur. Urna dignissim ac sapien at ut.",
      icon: Navigation,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1309px] mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">All Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <category.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{category.title}</h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}