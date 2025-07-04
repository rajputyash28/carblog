export default function HeroSection() {
  return (
    <section 
      className="bg-[#232536] text-white relative"
      style={{
        backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/53/Luxury_Vehicle_Resort_%28Unsplash%29.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 h-[594px] flex items-center relative z-10">
        <div className="w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Your Journey<br />
              Your Car<br />
              Your Way
            </h1>
            <p className="text-white mb-8 text-lg max-w-md drop-shadow-lg">
              Lorem ipsum dolor sit amet consectetur. Diam volutpat morbi elementum vel euismod aliquam. Amet ultrices neque augue consectetur purus phasellus. Ullamcorper lorem montes varius amet vestibulum tellus facilisis consequat pretium. Et faucibus laoreet molestie diam semper fames diam eget.
            </p>
            <button className="bg-[#FF5959] text-white px-8 py-3 rounded-md hover:bg-[#e54545] transition-colors flex items-center gap-2 drop-shadow-lg">
              Subscribe ✈
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}