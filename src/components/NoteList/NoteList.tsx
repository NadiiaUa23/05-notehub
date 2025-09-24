import css from "./NoteList.module.css";
import type { NoteListProps } from "../../types/note";

export default function NoteList({ items, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {items.map((n) => (
        <li className={css.listItem} key={n.id}>
          <h2 className={css.title}>{n.title}</h2>
          <p className={css.content}>{n.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{n.tag}</span>
            <button className={css.button} onClick={() => onDelete(n.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
