import type { Task } from '../types/Task';

const BASE_URL = '/api/tasks';

export const getActiveTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/active`);
  if (!res.ok) throw new Error('Failed to fetch active tasks');
  return res.json();
};

export const getTrashedTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/trashed`);
  if (!res.ok) throw new Error('Failed to fetch trashed tasks');
  return res.json();
};

export const createTask = async (title: string): Promise<Task> => {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (id: string, update: Partial<Task>) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  if (!res.ok) throw new Error('Failed to update task');
};

export const deleteAllTrashedTasks = async () => {
  const res = await fetch(`${BASE_URL}/trashed`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete trashed tasks');
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
};
