import type { Task } from '../types/Task';

const BASE_URL = '/api/tasks';

const apiFetchWithData = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Request failed (${res.status}): ${msg}`);
  }

  return res.json();
};

const apiFetchNoData = async (
  url: string,
  options?: RequestInit,
): Promise<void> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Request failed (${res.status}): ${msg}`);
  }

  return;
};

export const getActiveTasks = (): Promise<Task[]> =>
  apiFetchWithData<Task[]>(`${BASE_URL}/active`);

export const getTrashedTasks = (): Promise<Task[]> =>
  apiFetchWithData<Task[]>(`${BASE_URL}/trashed`);

export const createTask = async (title: string): Promise<Task> =>
  apiFetchWithData<Task>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

export const updateTask = async (
  id: string,
  update: Partial<Task>,
): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });

export const deleteAllTrashedTasks = async (): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/trashed`, { method: 'DELETE' });

export const deleteTask = async (id: string): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/${id}`, { method: 'DELETE' });
