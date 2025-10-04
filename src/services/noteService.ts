import http from "./http";
import type { CreateNoteDto, Note } from "../types/note";

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  data: Note[]; // масив нотаток
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
interface ApiNotesResponse {
  notes: Note[]; // <-- головне поле
  page?: number; // може бути
  perPage?: number; // може бути
  total?: number; // може бути
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 10, search = "" } = params;

  const res = await http.get<ApiNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  });
  const body = res.data;
  const items = body.notes ?? [];
  const total = body.total ?? items.length;
  const _perPage = body.perPage ?? perPage;
  const totalPages =
    body.totalPages ??
    (_perPage ? Math.max(1, Math.ceil(total / _perPage)) : 1);
  const _page = body.page ?? page;

  return {
    data: items,
    page: _page,
    perPage: _perPage,
    total,
    totalPages,
  };
}

export async function createNote(data: CreateNoteDto): Promise<Note> {
  const res = await http.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await http.delete<Note>(`/notes/${id}`);
  return res.data;
}
