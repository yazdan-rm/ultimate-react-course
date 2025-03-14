import {useEffect, useState} from "react";
import './App.css'

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CAD');
  const [output, setOutput] = useState('');
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${inputValue}&from=${fromCurrency}&to=${toCurrency}`,
            {signal: controller.signal});
        const data = await res.json();
        setOutput(data.rates[toCurrency]);
      } catch (e) {
        if (e.name !== 'AbortError') return e;
      }
    }

    if (!inputValue) return;
    fetchData();

    return () => controller.abort();
  }, [inputValue, fromCurrency, toCurrency]);

  return (
      <div>
        <p>{output ? output : 'OUTPUT'}</p>
        <input type="text"
               value={inputValue}
               onChange={e => setInputValue(e.target.value)}/>
        <select value={fromCurrency}
                onChange={e => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toCurrency}
                onChange={e => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
  )
}