import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { Todo } from '@context/TodosContext.tsx';
import { useTodos } from '@hooks/useTodos.ts';

interface EditingListItemProps {
  todo: Todo;
}

export const EditingListItem = ({ todo }: EditingListItemProps) => {
  const [itemText, setItemText] = useState<string>(todo.text);
  const { deleteTodo, updateTodos, stopEditing } = useTodos();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setItemText(e.target.value),
    [setItemText]
  );

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  const handleSave = useCallback(() => {
    if (itemText !== todo.text) {
      updateTodos(todo.id, itemText);
    }
    stopEditing();
  }, [stopEditing, todo, itemText, updateTodos]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <>
      <input
        className="max-w-64 rounded-md p-1 border"
        type="text"
        value={itemText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-testid="edit-input"
      />
      <div className="flex gap-2">
        <button
          className="text-blue-700 border-blue-700  hover:bg-blue-100"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-gray-200 text-white"
          onClick={handleDelete}
          disabled
        >
          Delete
        </button>
      </div>
    </>
  );
};
