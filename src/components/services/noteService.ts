import http from "./http";
import type {
  CreateNoteDto,
  FetchNotesParams,
  FetchNotesResponse,
  Note,
  ApiNotesResponse,
} from "../../types/note";

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 10, search = "" } = params;

  const res = await http.get<ApiNotesResponse>("/notes", {
    params: {
      page,
      perPage, // бек ігнорує порожній search — не шлемо пустий
      ...(search ? { search } : {}),
    },
  });
  const body = res.data;
  // Нормалізуємо в єдиний формат, який очікує App
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
