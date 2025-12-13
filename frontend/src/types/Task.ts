export type Task = {
  id: string;
  title: string;
  status: 'NOT_STARTED' | 'COMPLETED' | 'TRASHED';
};
