import useSWR from 'swr';
import type { Task } from '../types/Task';
import {
  getActiveTasks,
  getTrashedTasks,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTrashedTasks,
} from '../api/tasks';

export function useTasks() {
  const {
    data: activeTaskList,
    error: activeError,
    isValidating: validatingActive,
    mutate: mutateActive,
  } = useSWR<Task[]>('activeTasks', getActiveTasks);

  const {
    data: trashedTaskList,
    error: trashedError,
    isValidating: validatingTrashed,
    mutate: mutateTrashed,
  } = useSWR<Task[]>('trashedTasks', getTrashedTasks);

  const loading =
    !activeTaskList ||
    !trashedTaskList ||
    validatingActive ||
    validatingTrashed;

  const error = activeError || trashedError;

  const addTask = async (title: string) => {
    await createTask(title);
    await mutateActive();
  };

  const editTask = async (id: string, update: Partial<Task>) => {
    await updateTask(id, update);
    await Promise.all([mutateActive(), mutateTrashed()]);
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    await Promise.all([mutateActive(), mutateTrashed()]);
  };

  const removeAllTrashedTasks = async () => {
    await deleteAllTrashedTasks();
    await mutateTrashed();
  };

  return {
    activeTaskList,
    trashedTaskList,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    removeAllTrashedTasks,
  };
}
