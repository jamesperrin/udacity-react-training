import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <div className="container">
        <input type="text" placeholder="Say Something" value={inputText} onChange={handleChange} />
        <p className="echo">Echo:</p>
        <p>{inputText}</p>
      </div>
    </div>
  );
};

export default App;
