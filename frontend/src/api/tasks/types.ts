export type TaskStatusApi = 'NOT_STARTED' | 'COMPLETED' | 'TRASHED';

export type TaskRequest = {
  title: string;
  status?: TaskStatusApi;
};

export type TaskResponse = {
  id: string;
  title: string;
  status: TaskStatusApi;
};
