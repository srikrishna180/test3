import type { MetaFunction } from "@remix-run/node";
import private_property from "/private_property.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Private property towing" },
    { name: "description", content: "Private property towing" },
  ];
};

const PrivatePropertyTowing = () => {
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
            Machinery Towing Services
          </h1>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <img
            src={private_property} // Replace with your actual image URL
            alt="Smash Towing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Effective Towing for Private Properties
          </h2>
          <p className="text-gray-600 mb-4">
            At Stlth towing, we offer reliable private property towing services
            in partnership with local body corporates. Our service ensures that
            all illegally parked vehicles on private properties are removed
            promptly and at the owner's expense.
          </p>
          <p className="text-gray-600 mb-4">
            We work closely with the suburb body corporate to enforce parking
            regulations and maintain the orderliness of private properties. Our
            experienced team is equipped to handle all types of vehicles,
            ensuring they are towed safely and efficiently.
          </p>
          <p className="text-gray-600 mb-4">
            If you manage or own a private property and need to address
            unauthorized parking, contact us to set up a towing arrangement. We
            provide a hassle-free solution to keep your property free from
            illegally parked vehicles.
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

export default PrivatePropertyTowing;
