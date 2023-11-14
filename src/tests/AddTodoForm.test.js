import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../components/AddTodoForm';

const createTodoItem = jest.fn();
const title = "New Todo";
const handleInputChange = jest.fn();
const isEditing = false;
const updateTodoItem = jest.fn();

describe("AddTodoForm", () => {
  it('should render same text passed into title prop', async () => {
    render(<AddTodoForm
        createTodoItem={createTodoItem}
        title={title}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        updateTodoItem={updateTodoItem}
    />);
    const inputElement = screen.getByPlaceholderText(/Add a Task/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should be able to type in input', async () => {
    render(<AddTodoForm
      createTodoItem={createTodoItem}
      title={title}
      handleInputChange={handleInputChange}
      isEditing={isEditing}
      updateTodoItem={updateTodoItem}
    />);
    const inputElement = screen.getByPlaceholderText(/Add a Task/i);
    fireEvent.change(inputElement, { target: { value: "New Todo"} })
    expect(inputElement.value).toBe("New Todo");
  });

  it('should have empty input when add button is clicked', async () => {
      render(<AddTodoForm
        createTodoItem={createTodoItem}
        title={''}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        updateTodoItem={updateTodoItem}
    />);
    const inputElement = screen.getByPlaceholderText(/Add a Task/i);
    const buttonElement = screen.getByRole("button", { name: /Add/i})
    fireEvent.change(inputElement, { target: { value: "New Todo"} })
    fireEvent.click(buttonElement)
    expect(inputElement.value).toBe("");
  });
})