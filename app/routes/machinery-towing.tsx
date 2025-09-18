import type { MetaFunction } from "@remix-run/node";
import machinery_towing from "/machinery_towing.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Machineries towing" },
    { name: "description", content: "Machineries towing" },
  ];
};

const MachineriesTowing = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Heading Section */}
        <div className="p-8 bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Machinery Towing Services
          </h1>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <img
            src={machinery_towing} // Replace with your actual image URL
            alt="Smash Towing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Efficient and Reliable Machinery Towing
          </h2>
          <p className="text-gray-600 mb-4">
            At Stlth towing, we specialize in the safe and efficient towing of
            heavy machinery and equipment. Our team is experienced in handling
            all types of machinery, ensuring they are transported securely and
            efficiently to their destination.
          </p>
          <p className="text-gray-600 mb-4">
            From construction equipment to agricultural machinery, we have the
            expertise and equipment to manage your towing needs. Our services
            are designed to minimize downtime and ensure your machinery is
            delivered in optimal condition.
          </p>
          <p className="text-gray-600 mb-4">
            Contact us today to discuss your machinery towing requirements or to
            get a personalized quote. We are committed to providing high-quality
            service tailored to your needs.
          </p>

          {/* Call to Action Buttons */}
          <div className="max-w-xl mx-auto text-center">
            <div className="flex max-sm:flex-col justify-center gap-6 mt-12">
              <a
                type="button"
                href="tel:1300115732"
                className="min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border text-white border-blue-600 bg-blue-600 hover:bg-transparent hover:text-blue-600"
              >
                Call us
              </a>
              <a
                href="/#quoteSection"
                className="text-gray-800 min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border border-gray-300 hover:bg-gray-50"
              >
                Get a quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineriesTowing;
