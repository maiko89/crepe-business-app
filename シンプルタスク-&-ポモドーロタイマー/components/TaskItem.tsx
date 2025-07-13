import React from 'react';
import { Task } from '../types';
import TrashIcon from './icons/TrashIcon';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`flex items-center p-4 rounded-lg transition-colors duration-300 ${
        task.completed ? 'bg-slate-100' : 'bg-white shadow-sm'
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-sky-500 focus:ring-sky-500 cursor-pointer"
      />
      <span
        className={`flex-grow mx-4 text-slate-700 transition-colors duration-300 ${
          task.completed ? 'line-through text-slate-400' : ''
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        aria-label="タスクを削除"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskItem;