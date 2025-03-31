import "./styles.css";
import {useReducer} from "react";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank accounts! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using accounts numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening accounts) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the accounts is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an accounts (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their accounts now (see next point)

7. Customer can only close an accounts if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the accounts is deactivated and all money is withdrawn. The accounts basically gets back to the initial state
*/

const initialState = {
  balance: 0, loan: 0, isActive: false
};

function reducer(state, action) {
  if (!state.isActive && action.type !== 'openAccount') return state;
  switch (action.type) {
    case 'openAccount':
      return {...state, isActive: !state.isActive, balance: 500};
    case 'deposit':
      return {...state, balance: state.balance + action.payload};
    case 'withdraw':
      return {...state, balance: state.balance !== 0 ? state.balance - action.payload : state.balance};
    case 'requestLoan':
      return {
        ...state,
        loan: state.loan === 0 ? state.loan + action.payload : state.loan,
        balance: state.balance + action.payload
      };
    case 'payLoan':
      return {
        ...state,
        loan: state.loan !== 0 ? state.loan - action.payload : state.loan,
        balance: state.balance - action.payload
      };
    case 'closeAccount':
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

export default function App() {
  const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);
  return (<div className="App">
    <h1>useReducer Bank Account</h1>
    <p>Balance: {balance}</p>
    <p>Loan: {loan}</p>

    <p>
      <button className={`btn ${isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'openAccount'});
      }} disabled={isActive}>
        <span>&#x1F3E6;</span> Open account
      </button>
    </p>
    <p>
      <button className={`btn ${!isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'deposit', payload: 150});
      }} disabled={!isActive}>
        <span>&#x1F4B0;</span> Deposit 150
      </button>
    </p>
    <p>
      <button className={`btn ${!isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'withdraw', payload: 50});
      }} disabled={!isActive}>
        <span>&#x1F4B8;</span> Withdraw 50
      </button>
    </p>
    <p>
      <button className={`btn ${!isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'requestLoan', payload: 5000});
      }} disabled={!isActive}>
        <span>&#x1F4E9;</span> Request a loan of 5000
      </button>
    </p>
    <p>
      <button className={`btn ${!isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'payLoan', payload: 5000});
      }} disabled={!isActive}>
        <span>&#x1F4B3;</span> Pay loan
      </button>
    </p>
    <p>
      <button className={`btn ${!isActive && 'disabled'}`} onClick={() => {
        dispatch({type: 'closeAccount'})
      }} disabled={!isActive}>
        <span>&#x1F512;</span> Close account
      </button>
    </p>
  </div>);
}
