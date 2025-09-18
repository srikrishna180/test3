import type { MetaFunction } from "@remix-run/node";
import container_towing from "/container_towing.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Containers towing" },
    { name: "description", content: "Containers towing" },
  ];
};

const ContainersTowing = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Heading Section */}
        <div className="p-8 bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Container Towing Services
          </h1>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <img
            src={container_towing} // Replace with your actual image URL
            alt="Smash Towing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Dependable Container Towing
          </h2>
          <p className="text-gray-600 mb-4">
            At Stlth towing, we offer specialized container towing services
            designed to handle various types of containers efficiently. Our team
            ensures secure transport, so your containers are delivered safely to
            their destination.
          </p>
          <p className="text-gray-600 mb-4">
            Whether you're dealing with shipping containers, storage units, or
            any other type of container, our experienced drivers and modern
            fleet are equipped to manage the job with precision and care. We
            understand the importance of timely and safe delivery.
          </p>
          <p className="text-gray-600 mb-4">
            Reach out to us today to discuss your container towing needs or to
            get a customized quote. We're here to provide reliable service
            tailored to your specific requirements.
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

export default ContainersTowing;
