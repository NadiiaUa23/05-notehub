import { useEffect, useState } from "react";
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import { fetchNotes } from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useDebounce } from "use-debounce";

const PER_PAGE = 12;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // відкладене значення пошуку
  const [searchDebounced] = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ["notes", page, searchDebounced],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search || undefined,
      }),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const items = notesQuery.data?.data ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 1;

  // Якщо змінився пошук — повертаємось на 1-шу сторінку
  useEffect(() => {
    setPage(1);
  }, [searchDebounced]);

  // (Опціонально) префетч наступної сторінки — швидша навігація
  useEffect(() => {
    if (!notesQuery.data) return;
    const { page: cur, totalPages: tp } = notesQuery.data;
    if (cur < tp) {
      queryClient.prefetchQuery({
        queryKey: ["notes", page + 1, searchDebounced],
        queryFn: () =>
          fetchNotes({
            page: page + 1,
            perPage: PER_PAGE,
            search: searchDebounced || undefined,
          }),
      });
    }
  }, [page, searchDebounced, notesQuery.data, queryClient]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox  */}
        <SearchBox value={search} onChange={setSearch} />

        {/* Пагінація (показувати тільки якщо > 1 сторінки) */}
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}

        {/* Кнопка створення  нотатки*/}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Стани запиту */}
      {notesQuery.isLoading && <Loader />}
      {notesQuery.isError && (
        <ErrorMessage
          message={
            notesQuery.error instanceof Error
              ? notesQuery.error.message
              : "Failed to load notes"
          }
        />
      )}

      {/* Список нотаток (показувати лише якщо є елементи) */}
      {!notesQuery.isLoading && !notesQuery.isError && items.length > 0 && (
        <NoteList items={items} />
      )}

      {/* Порожній стан r */}
      {!notesQuery.isLoading && !notesQuery.isError && items.length === 0 && (
        <div className={css.empty}>No notes yet</div>
      )}

      {/* Модалка створення */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onCancel={() => setIsModalOpen(false)}
          onCreated={() => {
            setIsModalOpen(false);
            // Після створення — оновимо список і повернемось на 1 сторінку
            setPage(1);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
          }}
        />
      </Modal>
    </div>
  );
}
