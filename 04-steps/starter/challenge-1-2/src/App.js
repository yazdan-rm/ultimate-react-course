import './App.css';
import {useState} from "react";

function App() {

  return (<div className={'App'}>
    <Counter/>
  </div>);
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  function reset() {
    setCount(0);
    setStep(1);
  }

  return (<div>
    <div>
      <input type="range" min='1' max='10' value={step} onChange={(e) => setStep(+e.target.value)}/>
      <span>{step}</span>
    </div>
    <div>
      <button onClick={() => setCount((c) => c - step)}>-</button>
      <input type="text" value={count} onChange={e => setCount(+e.target.value)}/>
      <button onClick={() => setCount((c) => c + step)}>+</button>
    </div>
    <p>
      <span>
          {count === 0 ? "Today is " : count > 0 ? `${count} days from today is ` : `${Math.abs(count)} days ago was `}
      </span>
      <span>{date.toDateString()}</span>
    </p>
    {step !== 1 || count !== 0 ? <button onClick={reset}>Reset</button> : null}
  </div>)
}

export default App;
