import type { ActionFunctionArgs, MetaFunction } from "react-router";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { useEffect, useRef, useState } from "react";
import { sendEmail } from "~/utils/email.server";
import Banner from "~/components/Banner";
import { ErrorMessage } from "~/components/forms";
import { validateForm } from "~/utils/validation";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Owner Operator Towing Jobs in QLD | Stlth Towing" },
    {
      name: "description",
      content:
        "Join Stlth Towing as an Owner Operator. Partner with us for towing, smash recovery, and trade-related services in Queensland. Get access to yard space, joint advertising, and shared tools.",
    },
    {
      name: "keywords",
      content:
        "towing jobs QLD, owner operator towing, smash recovery, towing contracts, towing business partnership",
    },
    {
      property: "og:title",
      content: "Stlth Towing Owner Operator Partnership",
    },
    {
      property: "og:description",
      content:
        "Looking to grow your towing business? Join Stlth Towing as a partner operator and access prime yard locations, shared services, and more.",
    },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://stlthtowing.com.au/join-us",
    },
    {
      property: "og:image",
      content: "https://stlthtowing.com.au/long_distance_tow.jpg",
    },
    {
      rel: "canonical",
      href: "https://stlthtowing.com.au/join-us",
    },
  ];
};

const validationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name must be under 100 characters.")
    .trim(),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters long.")
    .max(100, "Location must be under 100 characters.")
    .trim(),

  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/,
      "Please enter a valid Australian phone number."
    ),

  email: z.string().email("Please enter a valid email address.").trim(),

  vehicle: z
    .string()
    .min(2, "Vehicle description must be at least 2 characters long.")
    .max(100, "Vehicle description must be under 100 characters.")
    .trim(),
});

const getMailData = (formData: FormData) => ({
  subject: "New Operator Partnership Submission",
  content: `
      <h1>Operator Partnership Form submitted</h1>
      <p><strong>Name:</strong> ${formData.get("name")}</p>
      <p><strong>Location:</strong> ${formData.get("location")}</p>
      <p><strong>Phone:</strong> <a
      href=tel:${formData.get("phone")}
      > ${formData.get("phone")}</a></p>
      <p><strong>Email:</strong> ${formData.get("email")}</p>
      <p><strong>Vehicle:</strong> ${formData.get("vehicle")}</p>\
    `,
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return validateForm(
    formData,
    validationSchema,
    async () => {
      await sendEmail(getMailData(formData));
      return Response.json({ result: true }, { status: 200 });
    },
    (errors) =>
      Response.json(
        {
          errors,
          name: formData.get("name"),
          location: formData.get("location"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          vehicle: formData.get("vehicle"),
        },
        { status: 400 }
      )
  );
};

export const loader = () => {
  return Response.json({
    businessSchema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Stlth Towing",
      description: "Owner Operator Towing Jobs in QLD",
      url: "https://stlthtowing.com.au/join-us",
      telephone: "0416 273 699",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3/61 River Rd",
        addressLocality: "Redbank",
        addressRegion: "QLD",
        postalCode: "4301",
        addressCountry: "AU",
      },
      openingHours: "Mo-Su 00:00-23:59", // Open 24/7
      image: "https://stlthtowing.com.au/long_distance_tow.jpg", // Optional image
      priceRange: "$$",
    },
  });
};

const JoinUs = () => {
  const { businessSchema } = useLoaderData<typeof loader>();
  const actionData = useActionData<any>();
  const [showSuccess, setShowSuccess] = useState(false);
  let $form = useRef<HTMLFormElement>(null);
  const { state } = useNavigation();

  useEffect(() => {
    if ((actionData as any)?.result) setShowSuccess(true);
    if (state === "idle" && (actionData as any)?.result) $form.current?.reset();
  }, [actionData?.result, state]);

  return (
    <>
      {/* 👇 Inject schema into head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      <div className="max-w-7xl mx-auto p-5">
        {/* Centered Heading */}
        <div className="flex justify-center mb-12">
          <h1 className="text-4xl font-bold text-center max-w-4xl">
            Stlth Towing Owner Operator Partnership Opportunity
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Content */}
          <div className="lg:w-1/2">
            <div className="p-6">
              <h2
                className="text-2xl font-semibold mb-2"
                aria-labelledby="welcome-section"
              >
                Welcome Owner Operators!
              </h2>
              <p className="text-gray-700 mb-6">
                At Stlth Towing, we’re seeking like-minded individuals who are
                passionate about the towing trade—whether your focus is on smash
                recovery, standard towing, or trade-related services. We're
                committed to building a supportive, collaborative network that
                rewards excellence and ambition.
              </p>
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">
                Why Work With Stlth Towing?
              </h1>
              <ul className="list-disc space-y-4 pl-5 text-gray-800">
                <li>
                  <strong>Collaborative Community:</strong> Work in a team of
                  like-minded professionals focused on growth.
                </li>
                <li>
                  <strong>Joint Advertising:</strong> Free for first 3 months,
                  then $200/week.
                </li>
                <li>
                  <strong>Yard Access:</strong> $580/year to park your truck
                  (DMT fees apply).
                </li>
                <li>
                  <strong>Compensation Structure:</strong> After achieving a
                  weekly income target of $3,500 (excluding GST), 5% of any
                  amount above this is contributed to the Stlth Towing Trust as
                  commission. (Example: $5,000 weekly income = $75 paid to
                  Trust.)
                </li>
                <li>
                  <strong>Storage & Revenue Sharing:</strong> 20% of
                  insurer-paid fees go to the contractor.
                </li>
                <li>
                  <strong>Regulatory Compliance:</strong> QLD law requires Stlth
                  signage on smash trucks.
                </li>
                <li>
                  <strong>Dispatching Software:</strong> $65/month access.
                </li>
                <li>
                  <strong>Shared Services:</strong> Dispatcher and 24/7
                  answering cost shared fairly.
                </li>
                <li>
                  <strong>Support with Insurance & Finance:</strong> Get help
                  navigating business admin.
                </li>
                <li>
                  <strong>Prime Location:</strong> Redbank Yard - 3/61 River Rd,
                  Redbank QLD (with expansion underway).
                </li>
              </ul>

              {/* ✅ Additional Section You Requested */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Vehicle Storage & Revenue Sharing
                </h2>
                <p className="text-gray-700 mb-2">
                  Our Redbank yard accommodates up to 15 cars (more holding
                  yards to come).
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Smash or tow-away vehicles:</strong> Any storage fees
                  paid by insurers — 20% goes directly to the contractor.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Regulatory Compliance
                </h3>
                <p className="text-gray-700 mb-2">
                  Trucks may be plain or fully sign-written. Queensland law
                  mandates Stlth Towing details for all smash trucks. No other
                  advertising permitted on these vehicles.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Dispatching Technology
                </h3>
                <p className="text-gray-700 mb-2">
                  Use our dispatch software at $65 per month (payable to
                  software company).
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Shared Services
                </h3>
                <p className="text-gray-700 mb-2">
                  Once implemented, costs for a paid dispatcher and 24-hour
                  phone answering will be shared equitably among network
                  operators.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Support with Insurance & Finance
                </h3>
                <p className="text-gray-700 mb-2">
                  Receive assistance navigating insurance and finance for your
                  business.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                  Our Redbank Location
                </h3>
                <p className="text-gray-700">
                  3/61 River Rd, Redbank QLD — our first hub is open and
                  operational, with expansion plans already underway.
                </p>
              </div>

              {/* Existing Benefits List */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Key Benefits</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access to prime holding yards</li>
                  <li>Revenue share on storage and towing fees</li>
                  <li>Collaborative advertising reach</li>
                  <li>Shared operational tools and support</li>
                  <li>Assistance with insurance and finance</li>
                  <li>
                    Opportunities for business growth in a trusted network
                  </li>
                </ul>
              </div>
              {/* ✅ Final Closing Paragraph */}
              <div className="mt-8">
                <p className="text-lg text-gray-800">
                  We’re looking for operators who value trust, professionalism,
                  and innovation. If you’re ready to be part of something
                  bigger, reach out today and start your journey with Stlth
                  Towing.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:w-1/2">
            {showSuccess && (
              <Banner
                className={
                  (actionData as any)?.result
                    ? "text-green-700 bg-green-100"
                    : "text-red-700 bg-red-100"
                }
                message={
                  (actionData as any)?.result
                    ? "Thanks! We’ve received your info and will reply soon."
                    : "Something went wrong! Please try again."
                }
                onClose={() => {
                  setShowSuccess(false);
                }}
              />
            )}
            <h2 className="text-3xl font-bold mb-4">Join Us</h2>
            <div className="mb-6 text-gray-700 space-y-1">
              <p className="flex gap-4">
                <span>
                  <strong>Contact:</strong> Robert Tapping
                </span>
                <span>
                  <strong>Phone:</strong>
                  <a
                    href="tel:0416 273 699"
                    className="text-blue-600 hover:underline"
                  >
                    {" "}
                    0416 273 699
                  </a>
                </span>
              </p>
            </div>

            <Form className="flex flex-col gap-4" method="post" ref={$form}>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="name" className="text-lg font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., John Smith"
                  autoComplete="off"
                  defaultValue={actionData?.name}
                />
                <ErrorMessage>{actionData?.errors?.name}</ErrorMessage>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="location" className="text-lg font-medium">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Brisbane CBD, QLD"
                  autoComplete="off"
                  defaultValue={actionData?.location}
                />
                <ErrorMessage>{actionData?.errors?.location}</ErrorMessage>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-lg font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 0412 345 678"
                  autoComplete="off"
                  defaultValue={actionData?.phone}
                />
                <ErrorMessage>{actionData?.errors?.phone}</ErrorMessage>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="border border-gray.e-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., john.smith@example.com"
                  autoComplete="off"
                  defaultValue={actionData?.email}
                />
                <ErrorMessage>{actionData?.errors?.email}</ErrorMessage>
              </fieldset>
              <fieldset className="flex flex-col gap-2">
                <label htmlFor="vehicle" className="text-lg font-medium">
                  What sort of Vehicle do you have?
                </label>
                <input
                  id="vehicle"
                  type="text"
                  name="vehicle"
                  className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g.,Tow Truck Model"
                  autoComplete="off"
                  defaultValue={actionData?.vehicle}
                />
                <ErrorMessage>{actionData?.errors?.vehicle}</ErrorMessage>
              </fieldset>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 disabled:cursor-wait disabled:bg-blue-200"
                disabled={state === "submitting" || state === "loading"}
              >
                Submit your details
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinUs;
