import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import Loader from "../Loader/Loader";
import { fetchNotes, deleteNote } from "../../services/noteService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const PER_PAGE = 12;

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: search || undefined,
      }),
    staleTime: 30_000,
  });

  const delMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      // Після видалення — оновимо список
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const items = notesQuery.data?.data ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 1;

  // Якщо змінюється пошук — повертайся на 1 сторінку
  useEffect(() => {
    setPage(1);
  }, [search]);

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
          message={notesQuery.error?.message ?? "Failed to load notes"}
        />
      )}

      {/* Список нотаток (показувати лише якщо є елементи) */}
      {!notesQuery.isLoading && !notesQuery.isError && items.length > 0 && (
        <NoteList items={items} onDelete={(id) => delMutation.mutate(id)} />
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
