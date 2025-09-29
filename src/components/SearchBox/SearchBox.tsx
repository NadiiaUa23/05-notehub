import type { ChangeEvent } from "react";
import type { SearchBoxProps } from "../../types/note";
import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    400
  );

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={value} // неконтрольований інпут
        onChange={handleChange}
        data-testid="searchbox"
      />
    </div>
  );
}
