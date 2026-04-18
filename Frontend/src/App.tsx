import { useState } from 'react';

function App() {
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');

  return (
    <>
      <h1>Political Sentiment Dashboard</h1>
      <div className="dashboard-container">
        
        {/* Left Mirror Container */}
        <div className="mirror-container">
          <div className="glass-panel">
            <textarea 
              className="scroll-textarea" 
              placeholder="Enter text to analyze..."
              value={inputText1}
              onChange={(e) => setInputText1(e.target.value)}
            />
            <div className="chart-area">
              <p>Chart 1 will go here...</p>
            </div>
          </div>
        </div>

        {/* Right Mirror Container */}
        <div className="mirror-container">
          <div className="glass-panel">
            <textarea 
              className="scroll-textarea" 
              placeholder="Enter text to analyze..."
              value={inputText2}
              onChange={(e) => setInputText2(e.target.value)}
            />
            <div className="chart-area">
              <p>Chart 2 will go here...</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
