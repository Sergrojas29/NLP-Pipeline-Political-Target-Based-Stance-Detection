import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#333355',
        font: {
          family: "'JetBrains Mono', monospace"
        }
      }
    },
    title: {
      display: true,
      text: 'Political Sentiment by Person',
      color: '#333355',
      font: {
        family: "'JetBrains Mono', monospace",
        size: 16
      }
    },
  },
  scales: {
    x: {
      ticks: { 
        color: '#555577',
        font: {
          family: "'JetBrains Mono', monospace"
        }
      },
      grid: { color: 'rgba(184, 184, 255, 0.3)' }
    },
    y: {
      ticks: { 
        color: '#555577',
        font: {
          family: "'JetBrains Mono', monospace"
        }
      },
      grid: { color: 'rgba(184, 184, 255, 0.3)' }
    }
  }
};

const dummyData = {
  labels: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sam Davis'],
  datasets: [
    {
      label: 'in FAVOR of',
      data: [12, 19, 3, 5],
      backgroundColor: 'rgba(147, 129, 255, 0.8)', // soft-periwinkle
      borderColor: '#9381ffff',
      borderWidth: 1,
    },
    {
      label: 'AGAINST',
      data: [2, 3, 20, 15],
      backgroundColor: 'rgba(255, 153, 153, 0.8)', // pastel red
      borderColor: '#ff9999',
      borderWidth: 1,
    },
    {
      label: 'NEUTRAL',
      data: [3, 5, 2, 8],
      backgroundColor: 'rgba(184, 184, 255, 0.8)', // periwinkle
      borderColor: '#b8b8ffff',
      borderWidth: 1,
    },
  ],
};

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
            <div className="chart-area" style={{ padding: '1rem', boxSizing: 'border-box' }}>
              <Bar options={chartOptions} data={dummyData} />
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
            <div className="chart-area" style={{ padding: '1rem', boxSizing: 'border-box' }}>
              <Bar options={chartOptions} data={dummyData} />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
