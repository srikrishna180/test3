import type { HTMLAttributes } from "react";
import { classNames } from "~/utils/misc";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames("text-red-600 text-xs", className)} />
  ) : null;
}
