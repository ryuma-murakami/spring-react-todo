import { cva } from 'class-variance-authority';
import type { Task } from '../types/Task';
import { Trash2 } from 'lucide-react';
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';

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
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_LENGTH = 30;

  const handleStatusToggle = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(task.id, {
      status: event.target.checked ? 'completed' : 'notStarted',
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);

    if (value.length > MAX_LENGTH) {
      setError(`タスクは${MAX_LENGTH}字以内にしてください`);
    } else {
      setError('');
    }
  };

  const handleBlur = () => {
    if (title.trim().length === 0) {
      setError(`タスクは必須入力です`);
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }
    if (title.length > MAX_LENGTH) {
      setError(`タスクは${MAX_LENGTH}字以内にしてください`);
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    onChange(task.id, { title: title.trim() });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing || event.key !== 'Enter') {
      return;
    }

    event.currentTarget.blur();
  };

  return (
    <div className="flex flex-col gap-1">
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleStatusToggle}
          className="size-5 cursor-pointer"
        />
        <input
          ref={inputRef}
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
    </div>
  );
}
