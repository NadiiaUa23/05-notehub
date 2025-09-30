import type { ErrorMessageProps } from "../../types/note";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage({
  message = "Failed to load notes",
}: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
}
