import { useState } from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from '../types/Task';
import { CreateTaskForm } from './CreateTaskForm';

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);

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

  return (
    <div className="relative">
      <div className="sticky top-0 bg-slate-100 px-10 py-5">
        <CreateTaskForm onSubmit={createTask} />
      </div>
      <div className="space-y-3 px-10 pb-10">
        {taskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          taskList.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
