import css from "./Modal.module.css";

export default function Modal() {
  return (
    <div className="{css.backdrop}">
      <p>модальное окно с полями и созданием заметки</p>
    </div>
  );
}
