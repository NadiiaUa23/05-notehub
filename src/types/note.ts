export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface ApiNotesResponse {
  notes: Note[]; // <-- головне поле
  page?: number; // може бути
  perPage?: number; // може бути
  total?: number; // може бути
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[]; // масив нотаток
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ErrorMessageProps {
  message: string;
}

export interface SearchBoxProps {
  value: string;
  onChange: (newValue: string) => void;
}

export interface PaginationProps {
  pageCount: number; // скільки всього сторінок
  page: number; // поточна сторінка (1-базована)
  onPageChange: (nextPage: number) => void;
}

export interface NoteListProps {
  items: Note[];
  onDelete: (id: string) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface NoteFormProps {
  onCancel: () => void;
  onCreated: () => void; // що робити після успіху
}

export interface FormValues {
  title: string;
  content: string;
  tag: NoteTag | "";
}
