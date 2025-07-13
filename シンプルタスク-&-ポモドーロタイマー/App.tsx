import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Task } from './types';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Timer from './components/Timer';

const POMODORO_DURATION = 25 * 60; // 25 minutes in seconds

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(POMODORO_DURATION);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timerId: number | undefined;

    if (isTimerActive && timeRemaining > 0) {
      timerId = window.setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (isTimerActive && timeRemaining <= 0) {
      alert('お疲れ様です！');
      setIsTimerActive(false);
      setTimeRemaining(POMODORO_DURATION);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isTimerActive, timeRemaining]);
  
  const handleAddTask = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
  }, [newTaskText]);

  const handleToggleTask = useCallback((id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const handleTimerToggle = useCallback(() => {
    setIsTimerActive(prev => !prev);
  }, []);

  const handleTimerReset = useCallback(() => {
    setIsTimerActive(false);
    setTimeRemaining(POMODORO_DURATION);
  }, []);

  const uncompletedTasksCount = useMemo(() => {
    return tasks.filter(task => !task.completed).length;
  }, [tasks]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <main className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-6 sm:p-8 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">タスク & フォーカス</h1>
          <p className="text-slate-500 mt-2">タスクを管理し、ポモドーロタイマーで集中力を高めましょう。</p>
        </header>

        <Timer
          seconds={timeRemaining}
          isActive={isTimerActive}
          onToggle={handleTimerToggle}
          onReset={handleTimerReset}
        />

        <div className="space-y-6">
          <TaskInput
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
            onAdd={handleAddTask}
          />
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        </div>

        <footer className="text-center text-slate-500 pt-4 border-t border-slate-200">
          <p>未完了のタスク: {uncompletedTasksCount}</p>
        </footer>
      </main>
    </div>
  );
};

export default App;