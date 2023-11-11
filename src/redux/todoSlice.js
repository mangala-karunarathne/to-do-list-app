import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodoItems: (state, action) => {
      const uniqueIds = new Set(state.map(todo => todo.id));
      action.payload.forEach(todo => {
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
      //
    },
    deleteTodo: (state, action) => {
      //
    },
    toggleComplete: (state, action) => {
      //
    },
  },
});

export const { addTodoItems, addTodo, editTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
