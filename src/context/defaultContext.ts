import { TodosContextValue } from '@context/TodosContext.tsx';

export const defaultContext: TodosContextValue = {
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  editingId: null,
  startEditing: () => {},
  stopEditing: () => {},
  updateTodos: () => {},
};
