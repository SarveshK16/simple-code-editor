import React from 'react';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Simple Code Editor</h1>
      <div style={{ width: '600px', height: '400px', margin: '0 auto' }}>
        <CodeEditor />
      </div>
    </div>
  );
}

export default App;