import type { MetaFunction } from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  useActionData,
  useFetcher,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { sendEmail } from "~/utils/email.server";
import Banner from "~/components/Banner";
import { ErrorMessage } from "~/components/forms";
import { normalizePhoneNumber, phoneNumberRegex } from "~/utils/misc";
import { validateForm } from "~/utils/validation";
import { z } from "zod";

export const meta: MetaFunction = () => {
  return [
    { title: "Stlth Towing - trailer hire" },
    { name: "description", content: "trailer us" },
  ];
};
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const validationSchema = z.object({
  trailerFullName: z
    .string()
    .min(3, { message: "Name must contain at least 3 character(s)" })
    .refine((value) => !/\d/.test(value), {
      message: "Name should not contain numbers please.",
    }),
  trailerlicenceNumber: z.string().min(3, {
    message: "Driver's Licence Number must contain at least 3 character(s)",
  }),
  trailerlicenceState: z.string().min(3, {
    message: "Driver's Licence State must contain at least 3 character(s)",
  }),
  trailerlicenceExpiry: z.string().date(),
  trailerEmailAddress: z
    .string()
    .nullable()
    .refine((value) => {
      // If the value is null, it's valid
      if (value === "") return true;
      // If the value is a string, it must be a valid email
      return z.string().email().safeParse(value).success;
    }),
  trailerphoneNumber: z.string().refine(
    (value) => {
      const normalizedValue = normalizePhoneNumber(value);
      // Adjust the regex to handle possible missing area codes or incorrect prefixes
      return phoneNumberRegex.test(normalizedValue);
    },
    {
      message: "Invalid phone number",
    }
  ),
  trailerdestination: z
    .string()
    .min(3, { message: "Destination must contain at least 3 character(s)" }),
  trailerdate: z.string().date(),
  trailertime: z.string().regex(timePattern, "Invalid time format"),
  trailerduration: z
    .string()
    .min(3, { message: "Duration must contain at least 3 character(s)" }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return validateForm(
    formData,
    validationSchema,
    async () => {
      // console.log(contactFullName);

      const mailData = {
        subject: "New trailer Submission",
        content: `
      <h1>trailer Form submitted</h1>
      <p><strong>Name:</strong> ${formData.get("trailerFullName")}</p>
      <p><strong>Driver's Licence Number:</strong> ${formData.get(
        "trailerlicenceNumber"
      )}</p>
      <p><strong>Driver's Licence State:</strong> ${formData.get(
        "trailerlicenceState"
      )}</p>
      <p><strong>Driver's Licence Expiry:</strong> ${formData.get(
        "trailerlicenceExpiry"
      )}</p>
      <p><strong>Email:</strong> ${formData.get("trailerEmailAddress")}</p>
      <p><strong>Phone:</strong> <a
                href=tel:${formData.get("trailerphoneNumber")}
              > ${formData.get("trailerphoneNumber")}</a></p>
      <p><strong>Destination:</strong> ${formData.get("trailerdestination")}</p>
      <p><strong>Date:</strong> ${formData.get("trailerdate")}</p>
      <p><strong>Time:</strong> ${formData.get("trailertime")}</p>
      <p><strong>Duration:</strong> ${formData.get("trailerduration")}</p>
    `,
      };
      await sendEmail(mailData);
      return json({ result: true }, { status: 200 });
    },
    (errors) =>
      json(
        {
          errors,
          trailerFullName: formData.get("trailerFullName"),
          trailerlicenceNumber: formData.get("trailerlicenceNumber"),
          trailerlicenceState: formData.get("trailerlicenceState"),
          trailerlicenceExpiry: formData.get("trailerlicenceExpiry"),
          trailerEmailAddress: formData.get("trailerEmailAddress"),
          trailerphoneNumber: formData.get("trailerphoneNumber"),
          trailerdestination: formData.get("trailerdestination"),
          trailerdate: formData.get("trailerdate"),
          trailertime: formData.get("trailertime"),
          trailerduration: formData.get("trailerduration"),
        },
        { status: 400 }
      )
  );
};

const TrailerHire = () => {
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
      <Form className="flex flex-col gap-4" method="post" ref={$form}>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerFullName" className="text-lg font-medium">
            Name
          </label>
          <input
            id="trailerFullName"
            type="text"
            name="trailerFullName"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            autoComplete="off"
            defaultValue={actionData?.trailerFullName}
          />
          <ErrorMessage>{actionData?.errors?.trailerFullName}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerlicenceNumber" className="text-lg font-medium">
            Driver's Licence Number
          </label>
          <input
            id="trailerlicenceNumber"
            type="text"
            name="trailerlicenceNumber"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your driver's licence number"
            autoComplete="off"
            defaultValue={actionData?.trailerlicenceNumber}
          />
          <ErrorMessage>
            {actionData?.errors?.trailerlicenceNumber}
          </ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerlicenceState" className="text-lg font-medium">
            Driver's Licence State
          </label>
          <input
            id="trailerlicenceState"
            type="text"
            name="trailerlicenceState"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your driver's licence state"
            autoComplete="off"
            defaultValue={actionData?.trailerlicenceState}
          />
          <ErrorMessage>{actionData?.errors?.trailerlicenceState}</ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerlicenceExpiry" className="text-lg font-medium">
            Driver's Licence Expiry
          </label>
          <input
            id="trailerlicenceExpiry"
            type="date"
            name="trailerlicenceExpiry"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your driver's licence expiry"
            autoComplete="off"
            defaultValue={actionData?.trailerlicenceExpiry}
          />
          <ErrorMessage>
            {actionData?.errors?.trailerlicenceExpiry}
          </ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerEmailAddress" className="text-lg font-medium">
            Email Address (Optional)
          </label>
          <input
            id="trailerEmailAddress"
            type="email"
            name="trailerEmailAddress"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="off"
            defaultValue={actionData?.trailerEmailAddress}
          />
          <ErrorMessage>{actionData?.errors?.trailerEmailAddress}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerphoneNumber" className="text-lg font-medium">
            Phone
          </label>
          <input
            id="trailerphoneNumber"
            type="text"
            name="trailerphoneNumber"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            autoComplete="off"
            defaultValue={actionData?.trailerphoneNumber}
          />
          <ErrorMessage>{actionData?.errors?.trailerphoneNumber}</ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerlicenceExpiry" className="text-lg font-medium">
            Destination
          </label>
          <input
            id="trailerlicenceExpiry"
            type="text"
            name="trailerdestination"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your destination"
            autoComplete="off"
            defaultValue={actionData?.trailerdestination}
          />
          <ErrorMessage>{actionData?.errors?.trailerdestination}</ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerdate" className="text-lg font-medium">
            Date
          </label>
          <input
            id="trailerdate"
            type="date"
            name="trailerdate"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter date"
            autoComplete="off"
            defaultValue={actionData?.trailerdate}
          />
          <ErrorMessage>{actionData?.errors?.trailerdate}</ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailertime" className="text-lg font-medium">
            Time
          </label>
          <input
            id="trailertime"
            type="time"
            name="trailertime"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your time"
            autoComplete="off"
            defaultValue={actionData?.trailertime}
          />
          <ErrorMessage>{actionData?.errors?.trailertime}</ErrorMessage>
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="trailerNotes" className="text-lg font-medium">
            Duration
          </label>
          <input
            id="trailerduration"
            type="text"
            name="trailerduration"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter duration"
            autoComplete="off"
            defaultValue={actionData?.trailerduration}
          />
          <ErrorMessage>{actionData?.errors?.trailerduration}</ErrorMessage>
        </fieldset>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 disabled:cursor-wait disabled:bg-blue-200"
          disabled={state === "submitting" || state === "loading"}
        >
          Submit your details
        </button>
      </Form>
    </div>
  );
};

export default TrailerHire;
