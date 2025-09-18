export function classNames(...names: Array<string | undefined>) {
  const className = names.reduce(
    (acc, name) => (name ? `${acc} ${name}` : acc),
    ""
  );

  return className || "";
}

// Updated regex to handle optional leading zero for mobile numbers and landline formats
export const phoneNumberRegex =
  /^(?:\+61|0)?(?:4[ \-]?\d{2}[ \-]?\d{3}[ \-]?\d{3}|2[ \-]?\d{2}[ \-]?\d{4}[ \-]?\d{4}|[3-9][ \-]?\d{2}[ \-]?\d{4}[ \-]?\d{4})$/;

// Function to normalize phone number by removing spaces and dashes
export const normalizePhoneNumber = (value: string) => {
  return value.replace(/[\s\-]/g, ""); // Remove spaces and dashes
};
