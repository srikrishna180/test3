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

const SuccessBanner = ({
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

export default SuccessBanner;
