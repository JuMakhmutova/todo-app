import { Todo } from '@context/TodosContext.tsx';
import { useTodos } from '@hooks/useTodos.ts';

interface ListItemProps {
  todo: Todo;
}

export const ListItem = ({ todo }: ListItemProps) => {
  const { deleteTodo, startEditing } = useTodos();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  const handleEdit = () => {
    startEditing(todo.id);
  };

  return (
    <>
      <span className="truncate w-3/4 pr-2">{todo.text}</span>
      <div className="flex gap-2">
        <button
          className="text-blue-700 bg-blue-100 hover:border-blue-700"
          onClick={handleEdit}
          data-testid="edit-button"
        >
          Edit
        </button>
        <button
          className="text-red-700 bg-red-100 hover:border-red-700"
          onClick={handleDelete}
          data-testid="delete-button"
        >
          Delete
        </button>
      </div>
    </>
  );
};
