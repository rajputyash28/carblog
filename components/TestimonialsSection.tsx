export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#232536] text-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">TESTIMONIALS</h2>
          <h3 className="text-4xl font-bold mb-8">What people say about our blog</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div className="text-left">
              <p className="font-bold">Jonathan Vallem</p>
              <p className="text-gray-300">New York, USA</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}