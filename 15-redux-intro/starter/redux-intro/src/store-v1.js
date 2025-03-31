import {combineReducers, createStore} from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: ""
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: ""
}

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "accounts/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };
    case "accounts/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer);

/*
store.dispatch({type: "accounts/deposit", payload: 500});
store.dispatch({type: "accounts/withdraw", payload: 200});
console.log(store.getState());

store.dispatch({type: "accounts/requestLoan", payload: {amount: 1000, purpose: "Buy a car"}});
store.dispatch({type: "accounts/payLoan"});

console.log(store.getState());*/

function deposit(amount) {
  return {type: "accounts/deposit", payload: amount};
}

function withdraw(amount) {
  return {type: "accounts/withdraw", payload: amount};
}

function requestLoan(amount, purpose) {
  return {type: "accounts/requestLoan", payload: {amount: amount, purpose: purpose}}
}

function payLoan() {
  return {type: "accounts/payLoan"};
}

store.dispatch(deposit(500));
store.dispatch(withdraw(500));
store.dispatch(requestLoan(500, "test"));
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {type: "accounts/createCustomer", payload: {fullName, nationalID, createAt: new Date().toISOString()}};
}

function updateName(fullName) {
  return {type: "accounts/updateName", payload: {fullName}}
}

store.dispatch(createCustomer("Yazdan", "234234234"));
console.log(store.getState());

store.dispatch(updateName("test"));
console.log(store.getState());


