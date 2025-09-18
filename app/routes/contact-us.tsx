import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { sendEmail } from "~/utils/email.server";
import Banner from "~/components/Banner";
import { validateForm } from "~/utils/validation";
import { ErrorMessage } from "~/components/forms";
import { normalizePhoneNumber, phoneNumberRegex } from "~/utils/misc";
import {
  Form,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
  type MetaFunction,
} from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - Contact us" },
    { name: "description", content: "Contact us" },
  ];
};

const validationSchema = z.object({
  contactFullName: z
    .string()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .refine((value) => !/\d/.test(value), {
      message: "Name should not contain numbers.",
    }),
  contactEmailAddress: z.string().email(),
  contactBusiness: z.string().nullable(),
  contactPhone: z.string().refine(
    (value) => {
      const normalizedValue = normalizePhoneNumber(value);
      // Adjust the regex to handle possible missing area codes or incorrect prefixes
      return phoneNumberRegex.test(normalizedValue);
    },
    {
      message: "Invalid phone number",
    }
  ),
  contactNotes: z.string().nullable(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return validateForm(
    formData,
    validationSchema,
    async () => {
      // console.log(contactFullName);

      const mailData = {
        subject: "New Contact Submission",
        content: `
            <h1>Contact Form submitted</h1>
            <p><strong>Name:</strong> ${formData.get("contactFullName")}</p>
            <p><strong>Email:</strong> ${formData.get(
              "contactEmailAddress"
            )}</p>
            <p><strong>Business:</strong> ${formData.get("contactBusiness")}</p>
            <p><strong>Phone:</strong> <a
                href=tel:${formData.get("contactPhone")}
              > ${formData.get("contactPhone")}</a></p>
            <p><strong>Notes:</strong> ${formData.get("contactNotes")}</p>
          `,
      };
      await sendEmail(mailData);
      return Response.json({ result: true }, { status: 200 });
    },
    (errors) =>
      Response.json(
        {
          errors,
          contactFullName: formData.get("contactFullName"),
          contactEmailAddress: formData.get("contactEmailAddress"),
          contactBusiness: formData.get("contactBusiness"),
          contactPhone: formData.get("contactPhone"),
          contactNotes: formData.get("contactNotes"),
        },
        { status: 400 }
      )
  );
};

const a = () => {
  const actionData = useActionData<any>();
  const [showSuccess, setShowSuccess] = useState(false);
  let $form = useRef<HTMLFormElement>(null);
  const { state } = useNavigation();

  useEffect(() => {
    if ((actionData as any)?.result) setShowSuccess(true);
    if (state === "idle" && (actionData as any)?.result) $form.current?.reset();
  }, [actionData?.result, state]);

  return (
    <div className="mx-auto max-w-md p-5">
      {showSuccess && (
        <Banner
          className={
            actionData?.result
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }
          message={
            actionData?.result
              ? "Thanks! We’ve received your enquiry and will reply soon."
              : "Something went wrong! Please try again."
          }
          onClose={() => {
            setShowSuccess(false);
          }}
        />
      )}
      <Form className="flex flex-col gap-4" method="post" ref={$form}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="contactFullName" className="text-lg font-medium">
            Name
          </label>
          <input
            id="contactFullName"
            type="text"
            name="contactFullName"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            autoComplete="off"
            defaultValue={actionData?.contactFullName}
          />
          <ErrorMessage>{actionData?.errors?.contactFullName}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="contactEmailAddress" className="text-lg font-medium">
            Email Address
          </label>
          <input
            id="contactEmailAddress"
            type="text"
            name="contactEmailAddress"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="off"
            defaultValue={actionData?.contactEmailAddress}
          />
          <ErrorMessage>{actionData?.errors?.contactEmailAddress}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="contactBusiness" className="text-lg font-medium">
            Business (Optional)
          </label>
          <input
            id="contactBusiness"
            type="text"
            name="contactBusiness"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Business"
            autoComplete="off"
            defaultValue={actionData?.contactBusiness}
          />
          <ErrorMessage>{actionData?.errors?.contactBusiness}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="contactPhone" className="text-lg font-medium">
            Phone
          </label>
          <input
            id="contactPhone"
            type="text"
            name="contactPhone"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            autoComplete="off"
            defaultValue={actionData?.contactPhone}
          />
          <ErrorMessage>{actionData?.errors?.contactPhone}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="contactNotes" className="text-lg font-medium">
            Notes / Comments (Optional)
          </label>
          <input
            id="contactNotes"
            type="text"
            name="contactNotes"
            className="border h-20 border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Notes"
            autoComplete="off"
            defaultValue={actionData?.contactNotes}
          />
          <ErrorMessage>{actionData?.errors?.contactNotes}</ErrorMessage>
        </fieldset>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 disabled:cursor-wait disabled:bg-blue-200"
          disabled={state === "submitting" || state === "loading"}
        >
          Submit enquiry
        </button>
      </Form>
    </div>
  );
};

export default a;
