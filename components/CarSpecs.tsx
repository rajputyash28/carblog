interface CarSpec {
  label: string;
  value: string;
}

interface CarSpecsProps {
  specs: CarSpec[];
  title?: string;
}

export default function CarSpecs({ specs, title = "Car Specifications" }: CarSpecsProps) {
  return (
    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
            <p className="font-bold text-lg">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}