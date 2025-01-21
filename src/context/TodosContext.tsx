import { createContext, useState, ReactNode, useCallback } from 'react';
import { defaultContext } from '@context/defaultContext';

export type Todo = { id: string; text: string };

export interface TodosContextValue {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  editingId: string | null;
  startEditing: (id: string) => void;
  stopEditing: () => void;
  updateTodos: (id: string, newText: string) => void;
}

export const TodosContext = createContext<TodosContextValue>(defaultContext);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now().toString(), text }]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const stopEditing = () => {
    setEditingId(null);
  };

  const updateTodos = useCallback(
    (id: string, newText: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((prevTodo) =>
          prevTodo.id === id ? { ...prevTodo, text: newText } : prevTodo
        )
      );
    },
    [setTodos]
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        editingId,
        startEditing,
        stopEditing,
        updateTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
