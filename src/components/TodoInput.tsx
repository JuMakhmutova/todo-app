import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { useTodos } from '@hooks/useTodos.ts';

export const ToDoInput = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { addTodo } = useTodos();

  const handleAdd = () => {
    addTodo(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
    [setInputValue]
  );

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 p-2 border rounded-lg shadow-sm"
        placeholder="Add a new task"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="px-4 py-2 text-blue-700 bg-blue-100 hover:border-blue-700 rounded-lg disabled:opacity-50 disabled:hover:border-transparent"
        onClick={handleAdd}
        disabled={inputValue === ''}
      >
        + Add Task
      </button>
    </div>
  );
};
