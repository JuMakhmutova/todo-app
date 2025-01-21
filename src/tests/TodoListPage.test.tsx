import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ToDoInput } from '@components/TodoInput.tsx';
import { TodosProvider } from '@context/TodosContext.tsx';
import { TodoList } from '@components/TodoList.tsx';

describe('TodoList Page', () => {
  beforeEach(() => {
    render(
      <TodosProvider>
        <ToDoInput />
        <TodoList />
      </TodosProvider>
    );
  });

  test('Renders input and button', () => {
    expect(screen.getByText('+ Add Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
  });
  test('Does not call setTodos for empty input', () => {
    const addButton = screen.getByText('+ Add Task');
    fireEvent.click(addButton);
    expect(addButton).toBeDisabled();
    expect(screen.queryByRole('listitem')).toBeNull();
  });
  test('Changes text in todo input', () => {
    const addButton = screen.getByText('+ Add Task');
    const input = screen.getByPlaceholderText('Add a new task');
    expect(addButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // Type new task name in input
    fireEvent.change(input, { target: { value: 'Test task' } });
    expect(input).toHaveValue('Test task');
  });
  test('Adds todos and clears input when adding a task via button click', () => {
    const addButton = screen.getByText('+ Add Task');
    const input = screen.getByPlaceholderText('Add a new task');
    expect(addButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // Type new task name in input
    fireEvent.change(input, { target: { value: 'Test task' } });
    expect(input).toHaveValue('Test task');
    // Add new task
    fireEvent.click(addButton);
    // New task should be added to the list
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(input).toHaveValue('');
  });
  test('Adds a task when pressing Enter key', () => {
    const addButton = screen.getByText('+ Add Task');
    const input = screen.getByPlaceholderText('Add a new task');
    expect(addButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Test task' } });
    expect(input).toHaveValue('Test task');
    // Add new task to the list by pressing 'Enter' button
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(input).toHaveValue('');
  });
  test('Can delete item', () => {
    global.confirm = vi.fn().mockReturnValue(true);
    const addButton = screen.getByText('+ Add Task');
    const input = screen.getByPlaceholderText('Add a new task');
    expect(addButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // Add two new tasks
    fireEvent.change(input, { target: { value: 'Test task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Test task 2' } });
    fireEvent.click(addButton);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    const firstItemDeleteButton = screen.getAllByTestId('delete-button')[1];
    fireEvent.click(firstItemDeleteButton);
    // Check confirmation window
    expect(global.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this task?'
    );
    // List length decreased after deletion
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
  test('Switches to edit mode by click on Edit button', async () => {
    const addButton = screen.getByText('+ Add Task');
    const input = screen.getByPlaceholderText('Add a new task');
    expect(addButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // Add three new tasks
    fireEvent.change(input, { target: { value: 'Test task 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Test task 2' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Test task 3' } });
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
    );
    // Click on Edit button
    const secondItemEditButton = screen.getAllByTestId('edit-button')[1];
    fireEvent.click(secondItemEditButton);
    await waitFor(() =>
      expect(screen.getByTestId('edit-input')).toBeInTheDocument()
    );
  });
});
