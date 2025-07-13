import React from 'react';

interface TaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (e: React.FormEvent) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ value, onChange, onAdd }) => {
  return (
    <form onSubmit={onAdd} className="flex items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="新しいタスクを入力..."
        className="flex-grow w-full px-4 py-3 text-slate-700 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
      />
      <button
        type="submit"
        className="px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-transform transform hover:scale-105"
      >
        追加
      </button>
    </form>
  );
};

export default TaskInput;