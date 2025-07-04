export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">About Our Car Blog</h1>
        <p className="text-xl text-gray-600">
          Your ultimate destination for automotive insights and reviews
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why This Car Blog Exists</h2>
          <p className="text-gray-700 mb-6">
            Our car blog was created to bridge the gap between automotive enthusiasts and the latest industry developments. We believe that everyone deserves access to accurate, comprehensive, and engaging content about cars, whether you're a seasoned car collector or someone looking to buy their first vehicle.
          </p>
          <p className="text-gray-700 mb-6">
            In a world where automotive technology is rapidly evolving, we aim to be your trusted source for understanding the latest trends, reviewing new models, and providing practical advice for car ownership and maintenance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Electric Vehicles (EVs)</h3>
              <p className="text-gray-700">
                Comprehensive reviews of the latest electric cars, charging infrastructure updates, and sustainable driving tips.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">SUV Reviews</h3>
              <p className="text-gray-700">
                In-depth analysis of sport utility vehicles, from compact crossovers to full-size SUVs for families and adventure seekers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Maintenance Tips</h3>
              <p className="text-gray-700">
                Expert advice on keeping your car in top condition, cost-effective maintenance schedules, and DIY repair guides.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Luxury Cars</h3>
              <p className="text-gray-700">
                Reviews of high-end vehicles, luxury features analysis, and insights into premium automotive brands.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Tech Stack</h2>
          <p className="text-gray-700 mb-6">
            This blog is built using modern web technologies to ensure a fast, responsive, and engaging user experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Next.js 13+</strong> - React framework with App Router for server-side rendering and optimal performance</li>
            <li><strong>TypeScript</strong> - Type-safe JavaScript for better code quality and developer experience</li>
            <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for responsive and beautiful designs</li>
            <li><strong>Lucide React</strong> - Beautiful and customizable icons</li>
            <li><strong>JSONPlaceholder API</strong> - External API integration for dynamic content</li>
            <li><strong>Responsive Design</strong> - Mobile-first approach ensuring great experience on all devices</li>
          </ul>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We're committed to providing unbiased, informative, and entertaining automotive content that helps our readers make informed decisions about their vehicles. Whether you're researching your next car purchase, looking for maintenance advice, or simply passionate about automotive culture, we're here to serve the car community.
          </p>
          <p className="text-gray-700">
            Join us on this journey as we explore the exciting world of automobiles together!
          </p>
        </section>
      </div>
    </div>
  );
}