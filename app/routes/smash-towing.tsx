import type { MetaFunction } from "@remix-run/node";
import smash_tow from "/smash_tow.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Smash towing" },
    { name: "description", content: "Smash towing" },
  ];
};

// const SmashTowing = () => {
//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
//       {/* Main Container */}
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Hero Section */}
//         <div className="relative">
//           <img
//             src="https://via.placeholder.com/1600x500?text=Smash+Towing" // Replace with your actual image URL
//             alt="Smash Towing"
//             className="w-full h-64 object-cover"
//           />
//           <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
//             <h1 className="text-white text-4xl font-bold text-center p-4 bg-black bg-opacity-60 rounded-lg">
//               Smash Towing Services
//             </h1>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="p-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             Reliable Smash Towing
//           </h2>
//           <p className="text-gray-600 mb-4">
//             At Stlth towing, we specialize in providing reliable smash towing
//             services. Whether your vehicle has been in an accident or requires
//             emergency recovery, our expert team is ready to assist. We ensure
//             that your damaged vehicle is transported safely and efficiently.
//           </p>
//           <p className="text-gray-600 mb-4">
//             Our modern fleet and skilled drivers are equipped to handle various
//             types of vehicles involved in accidents. We prioritize quick
//             response times and secure transport to minimize further damage and
//             ensure a smooth recovery process.
//           </p>
//           <p className="text-gray-600 mb-4">
//             Contact us today for prompt smash towing services or to get a
//             personalized quote. We're committed to providing the highest level
//             of service and support during stressful situations.
//           </p>

//           {/* Call to Action Buttons */}
//           <div className="max-w-xl mx-auto text-center">
//             <div className="flex max-sm:flex-col justify-center gap-6 mt-12">
//               <a
//                 type="button"
//                 href="tel:1300115732"
//                 className="min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border text-white border-blue-600 bg-blue-600 hover:bg-transparent hover:text-blue-600"
//               >
//                 Call us
//               </a>
//               <a
//                 href="/#quoteSection"
//                 className="text-gray-800 min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border border-gray-300 hover:bg-gray-50"
//               >
//                 Get a quote
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Additional Image */}
//         <div className="p-8">
//           <img
//             src="https://via.placeholder.com/1600x500?text=Smash+Towing+In+Action" // Replace with your actual image URL
//             alt="Smash Towing in Action"
//             className="w-full h-64 object-cover rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

const SmashTowing = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Heading Section */}
        <div className="p-8 bg-gray-100">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Smash Towing Services
          </h1>
        </div>

        {/* Hero Image Section */}
        <div className="relative">
          <img
            src={smash_tow} // Replace with your actual image URL
            alt="Smash Towing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Reliable Smash Towing
          </h2>
          <p className="text-gray-600 mb-4">
            At Stlth towing, we specialize in providing reliable smash towing
            services. Whether your vehicle has been in an accident or requires
            emergency recovery, our expert team is ready to assist. We ensure
            that your damaged vehicle is transported safely and efficiently.
          </p>
          <p className="text-gray-600 mb-4">
            Our modern fleet and skilled drivers are equipped to handle various
            types of vehicles involved in accidents. We prioritize quick
            response times and secure transport to minimize further damage and
            ensure a smooth recovery process.
          </p>
          <p className="text-gray-600 mb-4">
            Contact us today for prompt smash towing services or to get a
            personalized quote. We're committed to providing the highest level
            of service and support during stressful situations.
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

export default SmashTowing;
