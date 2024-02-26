import { createSlice } from "@reduxjs/toolkit";

let todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todos: [],
    error: "",
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find((i) => i.id === Number(action.payload.id));
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      const allArr = state.todos.filter((i) => i.id !== Number(action.payload.id));
      state.todos = [...allArr];
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
