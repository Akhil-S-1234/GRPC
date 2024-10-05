import React from 'react';
import User from './components/User';
import './App.css'; // Optional for global styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User Information System</h1>
      </header>
      <User />
    </div>
  );
}

export default App;
