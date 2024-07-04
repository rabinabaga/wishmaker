import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  title: "",
  steps: [{
    stepTitle:"",
    id:uuidv4(), 
  }],
};

const newTaskSlice = createSlice({
    name:"NewTask",
     initialState,
    reducers:{
        addStep:(state, action) => {
         state.steps[state.steps.length-1].stepTitle = action.payload;
          state.steps.push({
            stepTitle: "",
            id: uuidv4(),
          });
        },
        addTitle:(state,action) => {
            state.title = action.payload
        }
    },
    
})

export const { addStep, addTitle } = newTaskSlice.actions;
export default newTaskSlice.reducer;
