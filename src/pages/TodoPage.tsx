import React from 'react';
import { ToDoInput } from '@components/TodoInput.tsx';
import { TodoList } from '@components/TodoList.tsx';
import { TodosProvider } from '@context/TodosContext.tsx';

const title = 'ToDo List';

const TodoPage: React.FC = () => {
  return (
    <TodosProvider>
      <div className="flex flex-col items-center mt-10">
        <div className="w-[550px] mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
          <ToDoInput />
          <TodoList />
        </div>
      </div>
    </TodosProvider>
  );
};

export default TodoPage;
