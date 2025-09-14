import {
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router";
import { Form } from "react-router";
import type { Route } from "./+types/home";
import { useEffect, useRef, useState, type HTMLAttributes } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function classNames(...names: Array<string | undefined>) {
  const className = names.reduce(
    (acc, name) => (name ? `${acc} ${name}` : acc),
    ""
  );

  return className || "";
}

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames("text-red-600 text-xs", className)} />
  ) : null;
}

function mergeClasses(...classes: (string | undefined)[]): string {
  // Create a Set to hold unique class names
  const uniqueClasses = new Set<string>();

  // Iterate over each class argument
  classes.forEach((cls) => {
    if (cls) {
      // Split the class string into individual class names and add them to the Set
      cls.split(/\s+/).forEach((className) => {
        if (className) {
          uniqueClasses.add(className);
        }
      });
    }
  });

  // Convert the Set back to a space-separated string
  return Array.from(uniqueClasses).join(" ");
}

const Banner = ({
  className,
  message,
  onClose,
}: {
  className: string;
  message: string;
  onClose(): void;
}) => {
  const defaultClasses =
    "relative py-3 pl-4 pr-10 leading-normal rounded-lg mt-2 mx-auto";

  const finalClasses = mergeClasses(defaultClasses, className);

  return (
    <div className={finalClasses} role="alert">
      <p>{message}</p>
      <span
        className="absolute inset-y-0 right-0 flex items-center mr-4 cursor-pointer"
        onClick={onClose}
        role="button"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </span>
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log({ formData });

  return Response.json({ result: true }, { status: 200 });
};

const Home = () => {
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
      <div className="text-4xl flex justify-center">QA Env</div>
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
          <label htmlFor="contactNotes" className="text-lg font-medium">
            Notes / Comments
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

export default Home;
