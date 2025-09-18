import type { ActionFunctionArgs, MetaFunction } from "react-router";
// import { ActionFunctionArgs } from "react-router";
import { Form, useActionData, useNavigation } from "react-router";
import { useEffect, useRef, useState } from "react";
import { sendEmail } from "~/utils/email.server";
import Banner from "~/components/Banner";
import { z } from "zod";
import { normalizePhoneNumber, phoneNumberRegex } from "~/utils/misc";
import { validateForm } from "~/utils/validation";
import { ErrorMessage } from "~/components/forms";

export const meta: MetaFunction = () => {
  return [
    { title: "Towing - Careers" },
    { name: "description", content: "Careers Towing company" },
  ];
};

// Custom validator to check if the file is a PDF
const isPdfFile = (file: File) => {
  if (!file || typeof file !== "object" || !file.type) return false;
  return file.type === "application/pdf";
};

const validationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must contain at least 3 character(s)")
    .refine((value) => !/\d/.test(value), {
      message: "Name should not contain numbers.",
    }),
  emailAddress: z.string().email(),
  phone: z.string().refine(
    (value) => {
      const normalizedValue = normalizePhoneNumber(value);
      // Adjust the regex to handle possible missing area codes or incorrect prefixes
      return phoneNumberRegex.test(normalizedValue);
    },
    {
      message: "Invalid phone number",
    }
  ),
  // citizen: z.enum(["yes", "no"], {
  //   errorMap: () => ({
  //     message:
  //       "Please indicate your citizenship status by selecting one of the options.",
  //   }),
  // }),
  // resume: z.instanceof(File),
  // .refine(isPdfFile, {
  //   message: "File must be a PDF.",
  // }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  return validateForm(
    formData,
    validationSchema,
    async () => {
      const mailData = {
        subject: "New Resume Submission",
        content: `
            <h1>New Resume Submitted</h1>
            <p><strong>Name:</strong> ${formData.get("fullName")}</p>
            <p><strong>Email:</strong> ${formData.get("emailAddress")}</p>
            <p><strong>Phone:</strong> <a
                href=tel:${formData.get("phone")}
              > ${formData.get("phone")}</a></p>
            <p><strong>Australian Citizen:</strong> ${formData.get(
              "citizen"
            )}</p>
          `,
      };
      // const file = formData.;
      const file = formData.get("resume") as File;

      await sendEmail(mailData, file);
      return Response.json({ result: true }, { status: 200 });
    },
    (errors) =>
      Response.json(
        {
          errors,
          fullName: formData.get("fullName"),
          emailAddress: formData.get("emailAddress"),
          phone: formData.get("phone"),
          citizen: formData.get("citizen"),
        },
        { status: 400 }
      )
  );
};

export default function Careers() {
  const actionData = useActionData<any>();
  const [showSuccess, setShowSuccess] = useState(false);
  let $form = useRef<HTMLFormElement>(null);
  const { state } = useNavigation();

  useEffect(() => {
    if ((actionData as any)?.result) setShowSuccess(true);
    if (state === "idle" && (actionData as any)?.result) $form.current?.reset();
  }, [actionData?.result, state]);

  return (
    <div className="mx-auto max-w-lg p-5">
      {showSuccess && (
        <Banner
          className={
            (actionData as any)?.result
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }
          message={
            (actionData as any)?.result
              ? "Thanks! We’ve received your resume and will reply soon."
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
        encType="multipart/form-data"
        ref={$form}
      >
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-lg font-medium">
            Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            autoComplete="off"
            defaultValue={actionData?.fullName}
          />
          <ErrorMessage>{actionData?.errors?.fullName}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="emailAddress" className="text-lg font-medium">
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            name="emailAddress"
            className="border border-gray-300 rounded-md w-full py-2 px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            autoComplete="off"
            defaultValue={actionData?.emailAddress}
          />
          <ErrorMessage>{actionData?.errors?.emailAddress}</ErrorMessage>
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
            placeholder="Enter your phone number"
            autoComplete="off"
            defaultValue={actionData?.phone}
          />
          <ErrorMessage>{actionData?.errors?.phone}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-lg font-medium">
            Are you an Australian Citizen?
          </legend>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="citizen"
                id="yes"
                value="yes"
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="citizen"
                id="no"
                value="no"
                className="form-radio text-blue-500"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
          <ErrorMessage>{actionData?.errors?.citizen}</ErrorMessage>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="resume" className="text-lg font-medium">
            Upload your resume
          </label>
          <input
            id="resume"
            type="file"
            name="resume"
            className="file:border file:border-gray-300 file:rounded-md file:py-2 file:px-4 file:text-black-500 focus:outline-none"
          />
          <ErrorMessage>{actionData?.errors?.resume}</ErrorMessage>
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
}
