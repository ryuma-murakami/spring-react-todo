import { Plus } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

type CreateTaskFormProps = {
  onSubmit: (title: string) => void;
};

export function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [form, setForm] = useState({ title: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = form.title.trim();
    if (!trimmed) {
      return;
    }

    onSubmit(trimmed);

    setForm({ ...form, title: '' });
  };

  return (
    <form className="flex gap-0.5" onSubmit={handleSubmit}>
      <input
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
    </form>
  );
}
