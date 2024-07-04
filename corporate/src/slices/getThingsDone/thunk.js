import { addTitle, addStep } from "./reducer";

export const addTitleThunk = (title) => async(dispatch) => {
    dispatch(addTitle(title));
}
export const addStepThunk = (stepTitle) => async (dispatch) => {
  dispatch(addStep(stepTitle));
};