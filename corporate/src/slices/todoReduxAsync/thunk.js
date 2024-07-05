import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProjectTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/addProjectTodoPageAsync",
  async (project) => {
    try {
      const response = await axios.post("/todoprojects", project);
      return response.result;
    } catch (exception) {
      return exception;
    }
  }
);


export const getProjectsTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/getProjectsTodoPageAsync",
  async () => {
    try {
      const response = await axios.get("/todoprojects");
      return response.result;
    } catch (exception) {
      return exception;
    }
  }
);

export const addTodoTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/addTodoTodoPageAsync",
  async (todo) => {
    try {
      const response = await axios.post("/game_plan", todo);
      return response.result;
    } catch (exception) {
      return exception;
    }
  }
);

// export const addCampaignPageAsync = createAsyncThunk(
//   "TodoPageAsyncSlice/addTodoTodoPageAsync",
//   async (todo) => {
//     try {
//       const response = await axios.post("/game_plan", todo);
//       return response.result;
//     } catch (exception) {
//       return exception;
//     }
//   }
// );
export const getTodoTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/getTodoTodoPageAsync",
  async () => {
    try {
      const response = await axios.get("/game_plan");
      console.log("game plants", response);
      return response.result;
    } catch (exception) {
      return exception;
    }
  }
);

;
export const deleteTodoTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/deleteTodoTodoPageAsync",
  async (id) => {
    try {
      const response = await axios.delete(`/game_plan/${id}`);
      return {response:response.result,id:id};
    } catch (exception) {
      return exception;
    }
  }
);

export const updateTodoTodoPageAsync = createAsyncThunk(
  "TodoPageAsyncSlice/updateTodoTodoPageAsync",
  async (todo) => {
    const {_id, ...body} = todo;
    try {
      const response = await axios.put(`/game_plan/${_id}`,body);
      return { response: response.result, id: _id };
    } catch (exception) {
      return exception;
    }
  }
);
