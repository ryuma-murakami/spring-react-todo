import type { Task } from '../../types/Task';
import { toTask, toTaskRequest } from './mapper';
import type { TaskResponse } from './types';

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

export const getActiveTasks = async (): Promise<Task[]> => {
  const res = await apiFetchWithData<TaskResponse[]>(`${BASE_URL}/active`);
  return res.map(toTask);
};

export const getTrashedTasks = async (): Promise<Task[]> => {
  const res = await apiFetchWithData<TaskResponse[]>(`${BASE_URL}/trashed`);
  return res.map(toTask);
};

export const createTask = async (title: string): Promise<Task> => {
  const res = await apiFetchWithData<TaskResponse>(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return toTask(res);
};

export const updateTask = async (
  id: string,
  update: Partial<Task>,
): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toTaskRequest(update)),
  });

export const deleteAllTrashedTasks = async (): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/trashed`, { method: 'DELETE' });

export const deleteTask = async (id: string): Promise<void> =>
  await apiFetchNoData(`${BASE_URL}/${id}`, { method: 'DELETE' });
