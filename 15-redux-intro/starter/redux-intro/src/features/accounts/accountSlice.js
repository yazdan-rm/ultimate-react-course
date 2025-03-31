const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "accounts/deposit":
      return {...state, balance: state.balance + action.payload};
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
    default:
      return state;
  }
}

export function deposit(amount) {
  return {type: "accounts/deposit", payload: amount};
}

export function withdraw(amount) {
  return {type: "accounts/withdraw", payload: amount};
}

export function requestLoan(amount, purpose) {
  return {type: "accounts/requestLoan", payload: {amount: amount, purpose: purpose}}
}

export function payLoan() {
  return {type: "accounts/payLoan"};
}