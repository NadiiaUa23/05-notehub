import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message = "Failed to load notes",
}: ErrorMessageProps) {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
}
