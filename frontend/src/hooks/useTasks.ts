import { useLocalStorageStatus } from './useLocalStorageState';
import type { Task } from '../types/Task';

export function useTasks() {
  const [taskList, setTaskList] = useLocalStorageStatus<Task[]>('taskList', []);

  const activeTaskList = taskList.filter(({ status }) => status !== 'trashed');

  const createTask = (title: string) => {
    setTaskList(prevTaskList => {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        status: 'notStarted',
      };
      return [...prevTaskList, newTask];
    });
  };

  const updateTask = (id: string, update: Partial<Task>) => {
    setTaskList(prevTaskList =>
      prevTaskList.map(task =>
        task.id === id ? { ...task, ...update } : task,
      ),
    );
  };

  return {
    activeTaskList,
    createTask,
    updateTask,
  };
}
