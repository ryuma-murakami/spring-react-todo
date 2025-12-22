import { cva } from 'class-variance-authority';
import type { Task } from '../types/Task';
import { Trash2 } from 'lucide-react';
import { useState, type ChangeEvent, type KeyboardEvent } from 'react';

const inputVariants = cva('flex-1 border px-2 py-1 border-gray-300 bg-white', {
  variants: {
    completed: {
      true: 'text-gray-400 line-through disabled:cursor-not-allowed',
      false: null,
    },
  },
});

type TaskItemProps = {
  task: Task;
  onChange: (id: string, update: Partial<Task>) => void;
};

export function TaskItem({ task, onChange }: TaskItemProps) {
  const [title, setTitle] = useState(task.title);

  const handleStatusToggle = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(task.id, {
      status: event.target.checked ? 'completed' : 'notStarted',
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleBlur = () => onChange(task.id, { title: title.trim() });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') {
      return;
    }
    event.currentTarget.blur();
  };

  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={handleStatusToggle}
        className="size-5 cursor-pointer"
      />
      <input
        type="text"
        name="title"
        value={title}
        disabled={task.status === 'completed'}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputVariants({ completed: task.status === 'completed' })}
      />
      <button
        type="button"
        className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
        onClick={() =>
          onChange(task.id, {
            status: 'trashed',
          })
        }
        aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
      >
        <Trash2 className="size-5 text-gray-500" />
      </button>
    </div>
  );
}
