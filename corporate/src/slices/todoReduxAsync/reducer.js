import { createSlice } from "@reduxjs/toolkit";
import {
  addProjectTodoPageAsync,
  addTodoTodoPageAsync,
  deleteTodoTodoPageAsync,
  getProjectsTodoPageAsync,
  getTodoTodoPageAsync,
  updateTodoTodoPageAsync,
} from "./thunk";

const initialState = {
  todosData: [],
  projectsDataAsync: [],
};

const TodoPageAsyncSlice = createSlice({
  name: "TodoPageAsyncSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProjectTodoPageAsync.pending, () => {
      console.log("post project pending");
    });
    builder.addCase(addProjectTodoPageAsync.fulfilled, (state, action) => {
      const newProjects = [...state.projectsDataAsync, action.payload];
      state.projectsDataAsync = newProjects;
    });
    builder.addCase(getProjectsTodoPageAsync.pending, () => {
      console.log("get project pending");
    });
    builder.addCase(getProjectsTodoPageAsync.fulfilled, (state, action) => {
      const newProjects =action.payload;
      state.projectsDataAsync = newProjects;
    });
    builder.addCase(addTodoTodoPageAsync.fulfilled, (state, action) => {
      const newTodos = [...state.todosData, action.payload];
      state.todosData = newTodos;
    });
    builder.addCase(getTodoTodoPageAsync.fulfilled, (state, action) => {
      const newTodos =  action.payload;
      state.todosData = newTodos;
    });

    builder.addCase(deleteTodoTodoPageAsync.pending, (state, action) => {
      console.log("delete pending");
    });
    builder.addCase(deleteTodoTodoPageAsync.fulfilled, (state, action) => {
      if (action.payload.response.numberOfDeletedDocuments >= 1) {
        const result = state.todosData.filter(
          (item) => item._id !== action.payload.id
        );
        state.todosData = result;
      }
    });
    builder.addCase(updateTodoTodoPageAsync.pending, (state, action) => {
      console.log("update task pending");
    });
    builder.addCase(updateTodoTodoPageAsync.fulfilled, (state, action) => {
      //action.payload.response has result send from backend which in this case is updated object
      const updatedTodos = state.todosData.map((item) => {
        if (item._id === action.payload.id) {
          return action.payload.response;
        } else return item;
      });
      console.log("updated todos", updatedTodos);
      state.todosData = updatedTodos;
    });
  },
});

export default TodoPageAsyncSlice.reducer;
