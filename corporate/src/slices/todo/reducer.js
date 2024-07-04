import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosData: [
    {
      id: 1,
      title: "Todo 1",
      project_id: 1,
    },
    {
      id: 2,
      title: "Todo 2",
      project_id: 2,
    },
    {
      id: 3,
      title: "Todo 3",
      project_id: 3,
    },
  ],
  projectsData: [
    {
      id: 1,
      title: "Project 1",
    },
    {
      id: 2,
      title: "Project 2",
    },
    {
      id: 3,
      title: "Project 3",
    },
  ],
};

const TodoPageSlice = createSlice({
  name: "TodoPageSlice",
  initialState,
  reducers: {
    addTodoTodoPage: (state, action) => {
        const newTodos = [...state.todosData, action.payload];
        state.todosData = newTodos
    },
    addProjectTodoPage: (state,action) => {
      const newProjects = [...state.projectsData, action.payload];
      state.projectsData = newProjects;
    },
  },
});

export const { addProjectTodoPage, addTodoTodoPage } = TodoPageSlice.actions;
export default TodoPageSlice.reducer;