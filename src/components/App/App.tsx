import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
// import axios from "axios";
// import ReactPaginate from "react-paginate";

export default function App() {
  return (
    //

    //   <div>
    //     <h4>название заметоки </h4>
    //     <p> инпут текст заметки</p>
    //     <p>тег с впливающим списком</p>
    //     <button className={css.button}>удалить</button>
    //   </div>

    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <div>нумерация страниц</div>
        {/* Пагінація */}
        <button className={css.button}> Create note +</button>
        {/* Кнопка створення нотатки  */}
      </header>
    </div>
  );
}
