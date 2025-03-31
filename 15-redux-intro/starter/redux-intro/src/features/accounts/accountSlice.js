import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  balance: 0, loan: 0, loanPurpose: "", isLoading: false
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {amount, purpose}
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      }
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }
  }
});

export function deposit(amount, currency) {
  if (currency === "USD") return {type: "account/deposit", payload: amount};
  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"})
    // API CALL
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}base=${currency}&symbols=USD`);
    const data = await res.json();
    const convertedAmount = data.rates["USD"];
    // return action
    dispatch({type: "account/deposit", payload: convertedAmount});
  }
}

export const {
  withdraw,
  payLoan,
  requestLoan
} = accountSlice.actions;

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "accounts/deposit":
      return {...state, balance: state.balance + action.payload, isLoading: false};
    case "accounts/withdraw":
      return {...state, balance: state.balance - action.payload};
    case "accounts/requestLoan":
      if (state.loan > 0) return state;
      // TODO: Later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount
      };
    case "accounts/payLoan":
      return {...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan};
    case "accounts/convertingCurrency":
      return {...state, isLoading: true};
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return {type: "accounts/deposit", payload: amount};
  return async function (dispatch, getState) {
    dispatch({type: "accounts/convertingCurrency"})
    // API CALL
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}base=${currency}&symbols=USD`);
    const data = await res.json();
    const convertedAmount = data.rates["USD"];
    // return action
    dispatch({type: "accounts/deposit", payload: convertedAmount});
  }
}

export function withdraw(amount) {
  return {type: "accounts/withdraw", payload: amount};
}

export function requestLoan(amount, purpose) {
  return {type: "accounts/requestLoan", payload: {amount: amount, purpose: purpose}}
}

export function payLoan() {
  return {type: "accounts/payLoan"};
}*/
