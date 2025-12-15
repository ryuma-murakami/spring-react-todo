import { Trash2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { TrashedTaskItem } from './TrashedTaskItem';

export function TrashedTaskList() {
  const {
    trashedTaskList,
    editTask,
    removeAllTrashedTasks,
    removeTask,
    loading,
    error,
  } = useTasks();

  if (loading) {
    return <p className="text-center text-sm">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-sm text-red-500">Error: {error.message}</p>
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-0 flex justify-end bg-slate-100 px-10 py-5">
        <button
          onClick={removeAllTrashedTasks}
          className="flex items-center gap-1 rounded-md p-2 text-sm text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed"
          disabled={trashedTaskList!.length === 0}
        >
          <Trash2 className="size-4" />
          ゴミ箱を空にする
        </button>
      </div>
      <div className="space-y-3 px-10 pb-10">
        {trashedTaskList!.length === 0 && (
          <p className="text-center text-sm">ゴミ箱にタスクはありません</p>
        )}
        {trashedTaskList!.map(task => (
          <TrashedTaskItem
            key={task.id}
            task={task}
            onRestore={editTask}
            onDelete={removeTask}
          />
        ))}
      </div>
    </div>
  );
}
