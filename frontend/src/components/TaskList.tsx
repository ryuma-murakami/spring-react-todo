import { TaskItem } from './TaskItem';
import { CreateTaskForm } from './CreateTaskForm';
import { useTasks } from '../hooks/useTasks';

export function TaskList() {
  const { activeTaskList, createTask, updateTask } = useTasks();

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
