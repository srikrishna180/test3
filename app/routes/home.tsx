import { useEffect, useRef, useState } from "react";
import Banner from "~/components/Banner";
import { sendEmail } from "~/utils/email.server";
import { normalizePhoneNumber, phoneNumberRegex } from "~/utils/misc";
import { z } from "zod";
import { validateForm } from "~/utils/validation";
import { ErrorMessage } from "~/components/forms";
import {
  Form,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
  type MetaFunction,
} from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing" },
    { name: "description", content: "Careers Towing company" },
  ];
};

const validationSchema = z.object({
  quoteFullName: z
    .string()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .refine((value) => !/\d/.test(value), {
      message: "Name should not contain numbers.",
    }),
  quoteEmailAddress: z
    .string()
    .nullable()
    .refine((value) => {
      // If the value is null, it's valid
      if (value === "") return true;
      // If the value is a string, it must be a valid email
      return z.string().email().safeParse(value).success;
    }),
  quotePhone: z.string().refine(
    (value) => {
      const normalizedValue = normalizePhoneNumber(value);
      // Adjust the regex to handle possible missing area codes or incorrect prefixes
      return phoneNumberRegex.test(normalizedValue);
    },
    {
      message: "Invalid phone number",
    }
  ),
  quoteRegoNumber: z.string().nullable(),
  quotePickupAddress: z
    .string()
    .min(5, "This Pickup Address has to be filled."),
  quoteNotes: z.string().nullable(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return validateForm(
    formData,
    validationSchema,
    async () => {
      const mailData = {
        subject: "New Quote Submission",
        content: `
            <h1>Quote Submission</h1>
            <p><strong>Name:</strong> ${formData.get("quoteFullName")}</p>
            <p><strong>Email:</strong> ${formData.get("quoteEmailAddress")}</p>
            <p><strong>Phone:</strong> <a
                href=tel:${formData.get("quotePhone")}
              > ${formData.get("quotePhone")}</a></p>
            <p><strong>Rego:</strong> ${formData.get("quoteRegoNumber")}</p>
            <p><strong>Pickup Address:</strong> ${formData.get(
              "quotePickupAddress"
            )}</p>
            <p><strong>Rego:</strong> ${formData.get("quoteNotes")}</p>
          `,
      };
      await sendEmail(mailData);
      return Response.json({ result: true }, { status: 200 });
    },
    (errors) =>
      Response.json(
        {
          errors,
          quoteFullName: formData.get("quoteFullName"),
          quoteEmailAddress: formData.get("quoteEmailAddress"),
          quotePhone: formData.get("quotePhone"),
          quoteRegoNumber: formData.get("quoteRegoNumber"),
          quotePickupAddress: formData.get("quotePickupAddress"),
          quoteNotes: formData.get("quoteNotes"),
        },
        { status: 400 }
      )
  );
};

export default function Index() {
  const actionData = useActionData<any>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  let $form = useRef<HTMLFormElement>(null);
  const { state } = useNavigation();

  useEffect(() => {
    if ((actionData as any)?.result) setShowSuccess(true);
    if (state === "idle" && (actionData as any)?.result) $form.current?.reset();
  }, [actionData?.result, state]);

  const scrollToElement = () => {
    const target = document.getElementById("quoteSection");
    if (!target) return;

    const duration = 1000;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, start + (end - start) * eased);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Hero Section */}
      <div className="bg-white p-8 font-[sans-serif]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-gray-800 text-4xl font-extrabold relative after:absolute after:-bottom-5 after:h-1 after:w-1/2 after:bg-blue-600 after:left-0 after:right-0 after:mx-auto after:rounded-full">
            Stlth Towing Services
          </h2>
          <div className="mt-12">
            <p className="text-gray-800 text-base">
              Fast, professional, and affordable towing for all your needs. Call{" "}
              <br />
              us at <b>1300 115 732</b> for immediate assistance.
            </p>
          </div>

          {/* Form Section */}
          <div id="quoteSection" className="py-12 px-6 bg-gray-100">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
              {showSuccess && (
                <Banner
                  className={
                    actionData?.result
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }
                  message={
                    actionData?.result
                      ? "Thanks! We’ve received your info and will reply soon."
                      : "Something went wrong! Please try again."
                  }
                  onClose={() => {
                    setShowSuccess(false);
                  }}
                />
              )}
              <Form
                className="flex flex-col gap-4"
                method="post"
                action="/?index"
                ref={$form}
              >
                <fieldset className="flex flex-col gap-2">
                  <label
                    htmlFor="quoteFullName"
                    className="text-lg font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="quoteFullName"
                    type="text"
                    name="quoteFullName"
                    className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    autoComplete="off"
                    defaultValue={actionData?.quoteFullName}
                  />
                  <ErrorMessage>
                    {actionData?.errors?.quoteFullName}
                  </ErrorMessage>
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <label
                    htmlFor="quoteEmailAddress"
                    className="text-lg font-medium"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="quoteEmailAddress"
                    type="text"
                    name="quoteEmailAddress"
                    className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    autoComplete="off"
                    defaultValue={actionData?.quoteEmailAddress}
                  />
                  <ErrorMessage>
                    {actionData?.errors?.quoteEmailAddress}
                  </ErrorMessage>
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="quotePhone" className="text-lg font-medium">
                    Phone
                  </label>
                  <input
                    id="quotePhone"
                    type="text"
                    name="quotePhone"
                    className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    autoComplete="off"
                    defaultValue={actionData?.quotePhone}
                  />
                  <ErrorMessage>{actionData?.errors?.quotePhone}</ErrorMessage>
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <label
                    htmlFor="quoteRegoNumber"
                    className="text-lg font-medium"
                  >
                    Rego Number (Optional)
                  </label>
                  <input
                    id="quoteRegoNumber"
                    type="text"
                    name="quoteRegoNumber"
                    className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your rego number"
                    autoComplete="off"
                    defaultValue={actionData?.quoteRegoNumber}
                  />
                  <ErrorMessage>
                    {actionData?.errors?.quoteRegoNumber}
                  </ErrorMessage>
                </fieldset>

                <fieldset className="flex flex-col gap-2">
                  <label
                    htmlFor="quotePickupAddress"
                    className="text-lg font-medium"
                  >
                    Pickup Address
                  </label>
                  <input
                    id="quotePickupAddress"
                    type="text"
                    name="quotePickupAddress"
                    className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter pickup address"
                    autoComplete="off"
                    defaultValue={actionData?.quotePickupAddress}
                  />
                  <ErrorMessage>
                    {actionData?.errors?.quotePickupAddress}
                  </ErrorMessage>
                </fieldset>
                <fieldset className="flex flex-col gap-2">
                  <label htmlFor="quoteNotes" className="text-lg font-medium">
                    Notes / Comments (Optional)
                  </label>
                  <input
                    id="quoteNotes"
                    type="text"
                    name="quoteNotes"
                    className="border h-20 border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Notes"
                    autoComplete="off"
                    defaultValue={actionData?.quoteNotes}
                  />
                  <ErrorMessage>{actionData?.errors?.quoteNotes}</ErrorMessage>
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
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to providing top-notch towing services with a focus
            on customer satisfaction and safety. Here’s why our clients choose
            us:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">
                Experienced Professionals
              </h3>
              <p className="mt-2 text-gray-600">
                Our team of experts ensures your vehicle is handled with care
                and transported safely to its destination.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">
                24/7 Availability
              </h3>
              <p className="mt-2 text-gray-600">
                We’re available around the clock to assist you with any towing
                needs, day or night.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600">
                Competitive Pricing
              </h3>
              <p className="mt-2 text-gray-600">
                Get high-quality towing services at prices that won’t break the
                bank. We offer transparent and fair rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-200 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            How It Works
          </h2>
          <div className="mt-8 space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full">
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Submit Your Details
                </h3>
                <p className="mt-2 text-gray-600">
                  Fill out the form with your contact and vehicle information to
                  request a towing service.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full">
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Receive a Quote
                </h3>
                <p className="mt-2 text-gray-600">
                  We will provide a quote and confirm the details of your towing
                  request.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white p-4 rounded-full">
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Get Towed
                </h3>
                <p className="mt-2 text-gray-600">
                  Our team will arrive promptly to handle the towing of your
                  vehicle safely and efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonials Section */}
      <div className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Don’t just take our word for it. See what our satisfied clients have
            to say about our services:
          </p>
          <div className="mt-8 flex flex-col space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                "Exceptional service! The team was prompt, professional, and
                handled everything with care. Highly recommended!"
              </p>
              <p className="mt-2 font-semibold text-gray-800">— Alex M.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                "Affordable and reliable. They took care of my vehicle and got
                it where it needed to go without any hassle."
              </p>
              <p className="mt-2 font-semibold text-gray-800">— Jordan T.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                "Great experience from start to finish. The form was easy to
                fill out, and the service was top-notch."
              </p>
              <p className="mt-2 font-semibold text-gray-800">— Taylor R.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-200 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800">
            Get In Touch With Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            For any inquiries or further details about our towing services, feel
            free to reach out via email.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Email:{" "}
            <a
              href="mailto:info@towingservice.com"
              className="text-blue-600 hover:underline"
            >
              admin@stlthtowing.com.au
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
