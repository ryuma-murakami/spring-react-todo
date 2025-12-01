import { useEffect, useState } from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from '../types/Task';
import { CreateTaskForm } from './CreateTaskForm';

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const taskListStorage = localStorage.getItem('taskList');

    return JSON.parse(taskListStorage ?? '[]');
  });

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

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

  return (
    <div className="relative">
      <div className="sticky top-0 bg-slate-100 px-10 py-5">
        <CreateTaskForm onSubmit={createTask} />
      </div>
      <div className="space-y-3 px-10 pb-10">
        {activeTaskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          activeTaskList.map(task => (
            <TaskItem key={task.id} task={task} onChange={updateTask} />
          ))
        )}
      </div>
    </div>
  );
}
