import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createAt: ""
}

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {payload: {fullName, nationalID, createAt: new Date().toISOString()}};
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createAt = action.payload.createAt;
      }
    },
    updateName(state, action) {
      state.fullName = action.payload.fullName;
    }
  }
});

export const {
  createCustomer,
  updateName
} = customer.actions;

export default customer.reducer;

/*
export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case "customers/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };
    case "customers/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      }
    default:
      return state;
  }
}


export function createCustomer(fullName, nationalID) {
  return {type: "customers/createCustomer", payload: {fullName, nationalID, createAt: new Date().toISOString()}};
}

export function updateName(fullName) {
  return {type: "customers/updateName", payload: {fullName}}
}
*/
