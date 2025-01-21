import { ListItem } from '@components/ListItem.tsx';
import { EditingListItem } from '@components/EditingListItem.tsx';
import { useTodos } from '@hooks/useTodos.ts';

export const TodoList = () => {
  const { todos, editingId } = useTodos();

  return (
    <ul className="space-y-3 max-h-96 overflow-y-auto">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center py-2 px-4 rounded-lg bg-white shadow-md"
        >
          {editingId === todo.id ? (
            <EditingListItem todo={todo} />
          ) : (
            <ListItem todo={todo} />
          )}
        </li>
      ))}
    </ul>
  );
};
