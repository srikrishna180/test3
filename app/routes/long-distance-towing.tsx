import type { MetaFunction } from "@remix-run/node";
import long_distance_tow from "/long_distance_tow.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Long Distance Towing" },
    { name: "description", content: "Long Distance Towing" },
  ];
};

const LongDistanceTowing = () => {
  return (
    // <div className="bg-white p-8 font-[sans-serif]">
    //   <div className="max-w-xl mx-auto text-center">
    //     <h2 className="text-gray-800 text-4xl font-extrabold relative after:absolute after:-bottom-5 after:h-1 after:w-1/2 after:bg-blue-600 after:left-0 after:right-0 after:mx-auto after:rounded-full">
    //       Lorem ipsum dolor sit amet
    //     </h2>
    //     <div className="mt-12">
    //       <p className="text-gray-800 text-base">
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    //         accumsan, nunc et tempus blandit, metus mi consectetur felis turpis
    //         vitae ligula.
    //       </p>
    //     </div>

    //     <div className="flex max-sm:flex-col justify-center gap-6 mt-12">
    //       <button
    //         type="button"
    //         className="min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border text-white border-blue-600 bg-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300"
    //       >
    //         Call us
    //       </button>
    //       <button
    //         type="button"
    //         className="text-gray-800 min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border border-gray-300 hover:bg-gray-50 transition-all duration-300"
    //       >
    //         Get a quote
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Heading Section */}
        <div className="p-8 bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Long Distance Towing Services
          </h1>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <img
            src={long_distance_tow} // Replace with your actual image URL
            alt="Smash Towing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Reliable and Efficient Long Distance Towing
          </h2>
          <p className="text-gray-600 mb-4">
            At Stlth towing, we understand that when you need long distance
            towing, you require a service that is dependable, fast, and
            cost-effective. Our experienced team is equipped to handle all types
            of vehicles, ensuring they reach their destination safely and
            efficiently.
          </p>
          <p className="text-gray-600 mb-4">
            Whether you’re relocating a vehicle across town or to a different
            state, we provide top-notch towing services to meet your needs. Our
            fleet is well-maintained, and our drivers are trained to manage
            long-haul towing with the utmost care.
          </p>
          <p className="text-gray-600 mb-4">
            Contact us today to learn more about our long distance towing
            services or to schedule a pickup. We are here to provide you with
            exceptional service every step of the way.
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

        {/* Additional Image */}
        {/* <div className="p-8">
          <img
            src="https://via.placeholder.com/1600x500"
            alt="Towing in Action"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div> */}
      </div>
    </div>
  );
};

export default LongDistanceTowing;
