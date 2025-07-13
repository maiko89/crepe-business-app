import React from 'react';

interface TimerProps {
  seconds: number;
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Timer: React.FC<TimerProps> = ({ seconds, isActive, onToggle, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-100 rounded-xl space-y-4">
      <div className="text-6xl font-bold text-slate-800 tracking-wider">
        {formatTime(seconds)}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="px-8 py-3 font-semibold text-white bg-sky-400 rounded-full shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-transform transform hover:scale-105"
        >
          {isActive ? '一時停止' : 'タイマーを開始'}
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 font-semibold text-slate-600 bg-slate-200 rounded-full hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default Timer;