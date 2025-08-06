import React from 'react';
import PredictionForm from './PredictionForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Churn Prediction Platform</h1>
      </header>
      <main>
        <PredictionForm />
      </main>
    </div>
  );
}

export default App;