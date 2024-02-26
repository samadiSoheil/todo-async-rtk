import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// http://localhost:5000/todos

// get todos
export const getAsyncTodo = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get("http://localhost:5000/todos");
      return await responce.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// post todos
export const postAsyncTodo = createAsyncThunk(
  "todos/posttAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const responce = await axios.post("http://localhost:5000/todos", {
        title: payload.title,
        id: Date.now(),
        completed: false,
      });
      return await responce.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// delete todos
export const deletAsyncTodo = createAsyncThunk(
  "todos/delettAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${payload.id}`);
      return { id: payload.id };
    } catch (err) {
      console.log({ id: payload.id });
      return rejectWithValue(err.message);
    }
  }
);

// toggle todos
export const editeAsyncTodo = createAsyncThunk(
  "todos/editeAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:5000/todos/${payload.id}`, {
        completed: payload.completed,
        title: payload.title,
      });
      console.log(response.data);
      return { id: payload.id };
    } catch (err) {
      // console.log({ id: payload.id });
      return rejectWithValue(err.message);
    }
  }
);

let todoSlice = createSlice({
  name: "todo",
  initialState: {
    loading: false,
    todos: [],
    error: "",
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     const newTodo = {
  //       id: Date.now(),
  //       title: action.payload.title,
  //       completed: false,
  //     };
  //     state.todos.push(newTodo);
  //   },
  //   toggleTodo: (state, action) => {
  //     const selectedTodo = state.todos.find((i) => i.id === Number(action.payload.id));
  //     selectedTodo.completed = !selectedTodo.completed;
  //   },
  //   deleteTodo: (state, action) => {
  //     const allArr = state.todos.filter((i) => i.id !== Number(action.payload.id));
  //     state.todos = [...allArr];
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncTodo.pending, (state, action) => {
        state.loading = true;
        state.todos = [];
        state.error = "";
      })
      .addCase(getAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postAsyncTodo.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(postAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((i) => i.id != action.payload.id);
      })
      .addCase(deletAsyncTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editeAsyncTodo.fulfilled, (state, action) => {
        state.loading = false;
        const selectedNote = state.todos.find((i) => i.id == +action.payload.id);
        selectedNote.completed = !selectedNote.completed;
      });
    // .addCase(editeAsyncTodo.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
