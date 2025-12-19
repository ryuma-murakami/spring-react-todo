import { Plus } from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

type CreateTaskFormProps = {
  onSubmit: (title: string) => void;
};

export function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [form, setForm] = useState({ title: '' });
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_LENGTH = 30;

  useEffect(() => {
    if (form.title === '') {
      inputRef.current?.focus();
    }
  }, [form.title]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value });

    if (value.length > MAX_LENGTH) {
      setError(`タスクは${MAX_LENGTH}字以内にしてください`);
    } else {
      setError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = form.title.trim();

    if (trimmedTitle.length > MAX_LENGTH) {
      setError(`タスクは${MAX_LENGTH}字以内にしてください`);
      return;
    }

    onSubmit(trimmedTitle);
    setForm({ ...form, title: '' });
    setError('');
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
      {error && <span className="text-red-600 text-sm">{error}</span>}
      <div className="flex gap-0.5">
        <input
          ref={inputRef}
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="新しいタスクを入力してください"
          className="grow rounded-s border border-gray-300 p-2 bg-white"
        />
        <button
          type="submit"
          className="rounded-e bg-blue-600 text-white p-2 transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!form.title.trim()}
          aria-label="タスクを作成する"
        >
          <Plus />
        </button>
      </div>
    </form>
  );
}
