import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodoItems: (state, action) => {
      const uniqueIds = new Set(state.map((todo) => todo.id));
      action.payload.forEach((todo) => {
        if (!uniqueIds.has(todo.id)) {
          state.push(todo);
          uniqueIds.add(todo.id);
        }
      });
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      return state.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
    },
    deleteTodo: (state, action) => {
      const idToDelete = action.payload.id;
      return state.filter((todo) => todo.id !== idToDelete);
    },
    toggleComplete: (state, action) => {
      const { id, completed } = action.payload;
      const todoIndex = state.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state[todoIndex].completed = completed;
      }
    },
  },
});

export const { addTodoItems, addTodo, editTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
