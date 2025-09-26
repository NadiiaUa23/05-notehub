import type { SearchBoxProps } from "../../types/note";
import css from "./SearchBox.module.css";

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={handleChange}
placeholder="Search notes
        data-testid="searchbox"
      />
    </div>
  );
}
