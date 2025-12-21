import type { Task } from '../../types/Task';
import type { TaskRequest, TaskResponse } from './types';

const statusToApi = {
  notStarted: 'NOT_STARTED',
  completed: 'COMPLETED',
  trashed: 'TRASHED',
} as const;

const statusFromApi = {
  NOT_STARTED: 'notStarted',
  COMPLETED: 'completed',
  TRASHED: 'trashed',
} as const;

export const toTaskRequest = (task: Partial<Task>): Partial<TaskRequest> => ({
  ...task,
  status: task.status !== undefined ? statusToApi[task.status] : undefined,
});

export const toTask = (res: TaskResponse): Task => ({
  id: res.id,
  title: res.title,
  status: statusFromApi[res.status],
});
