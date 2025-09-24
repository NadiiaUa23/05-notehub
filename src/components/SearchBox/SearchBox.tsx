import type { SearchBoxProps } from "../../types/note";
import css from "./SearchBox.module.css";

export default function SearchBox({
  value,
  onChange,
}: SearchBoxProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    return (
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={handleChange}
      />
    );
  };
}
