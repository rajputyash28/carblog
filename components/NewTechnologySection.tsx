import Image from 'next/image';

export default function NewTechnologySection() {
  const techPosts = [
    {
      title: "A Review Of Cars With Advanced Infotainment Systems",
      author: "Dasteen",
      date: "Jun 2, 2024",
      readTime: "1 Min Read",
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=300&h=200&fit=crop"
    },
    {
      title: "A Deep Dive Into Sports Cars",
      author: "Dasteen",
      date: "Jun 2, 2024",
      readTime: "1 Min Read",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=200&fit=crop"
    },
    {
      title: "Reviewing Cars With The Best Resale Value",
      author: "Dasteen",
      date: "Jun 2, 2024",
      readTime: "1 Min Read",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop"
    },
    {
      title: "Reviewing Cars With The Best Resale Value",
      author: "Dasteen",
      date: "Jun 2, 2024",
      readTime: "1 Min Read",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">New Technology</h2>
          <button className="text-blue-600 hover:text-blue-800">See all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techPosts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3 line-clamp-2">{post.title}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p>{post.date} • {post.readTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}