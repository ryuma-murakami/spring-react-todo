export type TaskStatus = 'notStarted' | 'completed' | 'trashed';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
