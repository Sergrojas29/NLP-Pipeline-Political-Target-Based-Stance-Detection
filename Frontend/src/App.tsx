import { useState, useMemo } from 'react';
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

import data from "./assets/example_Data.json";






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
      text: 'Political Stance by Person',
      color: '#333355',
      font: {
        family: "'JetBrains Mono', monospace",
        size: 16
      }
    },
    tooltip: {
      callbacks: {
        afterTitle: function(context: any) {
          if (context && context.length > 0) {
            const name = context[0].label;
            const rawData = data as Record<string, any>;
            for (const key in rawData) {
              if (rawData[key]?.name === name) {
                const desc = rawData[key]?.description;
                if (desc) {
                  const words = desc.split(' ');
                  const lines = [];
                  let currentLine = '';
                  words.forEach((w: string) => {
                    if ((currentLine + w).length > 40) {
                      lines.push(currentLine.trim());
                      currentLine = w + ' ';
                    } else {
                      currentLine += w + ' ';
                    }
                  });
                  lines.push(currentLine.trim());
                  return ['', ...lines, ''];
                }
              }
            }
          }
          return [];
        }
      }
    }
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

function AnalysisPanel() {
  const [inputText, setInputText] = useState('');
  

  // Dashboard Controls State
  const [showFavor, setShowFavor] = useState(true);
  const [showAgainst, setShowAgainst] = useState(true);
  const [showNeutral, setShowNeutral] = useState(true);
  const [confidence, setConfidence] = useState(0.7);

  const sourceData = useMemo(() => {
    const processed: Record<string, { favor: number; against: number; neutral: number }> = {};
    const rawData = data as Record<string, any>;
    
    for (const wikiId in rawData) {
      const person = rawData[wikiId];
      const name = person.name;
      
      let favor = 0;
      let against = 0;
      let neutral = 0;
      
      if (Array.isArray(person.stance)) {
        for (const s of person.stance) {
          if (s.labels && s.scores && s.labels.length > 0 && s.scores.length > 0) {
            const topLabel = s.labels[0];
            const topScore = s.scores[0];
            
            if (topScore >= confidence) {
              if (topLabel === "in favor of") favor++;
              else if (topLabel === "against") against++;
              else if (topLabel === "neutral toward") neutral++;
            }
          }
        }
      }
      
      processed[name] = { favor, against, neutral };
    }
    
    return processed;
  }, [confidence]);

  const [subjects, setSubjects] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const rawData = data as Record<string, any>;
    for (const wikiId in rawData) {
      if (rawData[wikiId]?.name) {
        initial[rawData[wikiId].name] = true;
      }
    }
    return initial;
  });

  const activeLabels = Object.keys(subjects).filter((s) => subjects[s]);

  const favorData = activeLabels.map((l) => sourceData[l]?.favor || 0);
  const againstData = activeLabels.map((l) => sourceData[l]?.against || 0);
  const neutralData = activeLabels.map((l) => sourceData[l]?.neutral || 0);

  const datasets = [];
  if (showFavor) {
    datasets.push({
      label: 'in FAVOR of',
      data: favorData,
      backgroundColor: 'rgba(76, 175, 80, 0.8)', // green
      borderColor: '#4caf50',
      borderWidth: 1,
    });
  }
  if (showAgainst) {
    datasets.push({
      label: 'AGAINST',
      data: againstData,
      backgroundColor: 'rgba(255, 153, 153, 0.8)', // pastel red
      borderColor: '#ff9999',
      borderWidth: 1,
    });
  }
  if (showNeutral) {
    datasets.push({
      label: 'NEUTRAL',
      data: neutralData,
      backgroundColor: 'rgba(184, 184, 255, 0.8)', // periwinkle
      borderColor: '#b8b8ffff',
      borderWidth: 1,
    });
  }

  const chartData = {
    labels: activeLabels,
    datasets,
  };

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => ({ ...prev, [subject]: !prev[subject] }));
  };

  return (
    <div className="mirror-container">
      <div className="glass-panel">
        <textarea 
          className="scroll-textarea" 
          placeholder="Enter text to analyze..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="chart-area" style={{ padding: '1rem', boxSizing: 'border-box' }}>
          <Bar options={chartOptions} data={chartData} />
        </div>

        {/* Controls Container */}
        <div className="chart-controls-container">
          <div className="controls-row">
            <label>Sentiment Data:</label>
            <button className={`toggle-btn ${showFavor ? 'active' : ''}`} style={showFavor ? { backgroundColor: 'rgba(76, 175, 80, 0.8)', borderColor: '#4caf50', color: 'white' } : {}} onClick={() => setShowFavor(!showFavor)}>FAVOR</button>
            <button className={`toggle-btn ${showAgainst ? 'active' : ''}`} style={showAgainst ? { backgroundColor: 'rgba(255, 153, 153, 0.8)', borderColor: '#ff9999', color: '#333' } : {}} onClick={() => setShowAgainst(!showAgainst)}>AGAINST</button>
            <button className={`toggle-btn ${showNeutral ? 'active' : ''}`} style={showNeutral ? { backgroundColor: 'rgba(184, 184, 255, 0.8)', borderColor: '#b8b8ffff', color: '#333' } : {}} onClick={() => setShowNeutral(!showNeutral)}>NEUTRAL</button>
          </div>
          
          <div className="controls-row">
            <label>Confidence Score: {confidence.toFixed(1)}</label>
            <input 
              type="range" 
              className="slider-input"
              min="0.1" 
              max="0.9" 
              step="0.1" 
              value={confidence} 
              onChange={(e) => setConfidence(parseFloat(e.target.value))} 
            />
          </div>

          <div className="controls-row">
            <label>Subjects:</label>
            {Object.keys(subjects).map((subject) => (
              <button 
                key={subject}
                className={`toggle-btn ${subjects[subject] ? 'active' : ''}`} 
                onClick={() => toggleSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function SubjectDetailPanel() {
  const rawData = data as Record<string, any>;
  const subjectsList = useMemo(() => {
    return Object.values(rawData)
      .filter((p: any) => p && p.name)
      .map((p: any) => p.name as string);
  }, []);
  
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>(subjectsList[0] || '');
  const [confidence, setConfidence] = useState(0.7);

  const subjectData = useMemo(() => {
    return Object.values(rawData).find((p: any) => p && p.name === selectedSubjectName);
  }, [selectedSubjectName, rawData]);

  if (!subjectData) {
    return null;
  }

  const mentions = Array.isArray(subjectData.span) ? subjectData.span.length : 0;
  const description = subjectData.description || 'No description available.';
  
  const filteredStances = Array.isArray(subjectData.stance) 
    ? subjectData.stance.filter((s: any) => {
        if (s.labels && s.scores && s.labels.length > 0 && s.scores.length > 0) {
          return s.scores[0] >= confidence;
        }
        return false;
      })
    : [];

  return (
    <div className="mirror-container" style={{ flex: '1 1 100%' }}>
      <div className="glass-panel" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', maxHeight: '700px' }}>
        <h2 style={{ color: '#333355', marginTop: 0, fontFamily: "'JetBrains Mono', monospace" }}>Detailed Subject Review</h2>
        
        <div className="controls-row" style={{ marginBottom: '1rem', justifyContent: 'flex-start' }}>
          <label>Select Subject:</label>
          <select 
            value={selectedSubjectName} 
            onChange={(e) => setSelectedSubjectName(e.target.value)}
            style={{ 
              padding: '0.5rem', 
              borderRadius: '8px', 
              border: '1px solid rgba(184, 184, 255, 0.5)',
              background: 'rgba(255, 255, 255, 0.5)',
              color: '#333355',
              fontFamily: "'JetBrains Mono', monospace",
              marginLeft: '1rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {subjectsList.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="controls-row" style={{ marginBottom: '1.5rem', justifyContent: 'flex-start' }}>
          <label>Sentence Confidence Score: {confidence.toFixed(1)}</label>
          <input 
            type="range" 
            className="slider-input"
            min="0.1" 
            max="0.9" 
            step="0.1" 
            value={confidence} 
            onChange={(e) => setConfidence(parseFloat(e.target.value))} 
            style={{ marginLeft: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem', color: '#555577', padding: '1rem', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '8px' }}>
          <p style={{ margin: '0.25rem 0' }}><strong>Name:</strong> {subjectData.name}</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Mentions (Span count):</strong> {mentions}</p>
          <p style={{ margin: '0.25rem 0' }}><strong>Description:</strong> {description}</p>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
          <h3 style={{ color: '#333355', fontFamily: "'JetBrains Mono', monospace", marginTop: 0, marginBottom: '1rem', position: 'sticky', top: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0))', paddingBottom: '0.5rem' }}>
            Stances ({filteredStances.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredStances.map((s: any, idx: number) => {
              const topLabel = s.labels[0];
              const topScore = s.scores[0];
              
              let badgeColor = 'rgba(184, 184, 255, 0.8)'; // neutral
              if (topLabel === 'in favor of') badgeColor = 'rgba(76, 175, 80, 0.8)'; 
              if (topLabel === 'against') badgeColor = 'rgba(255, 153, 153, 0.8)'; 

              return (
                <div key={idx} style={{ 
                  background: 'rgba(255, 255, 255, 0.6)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  borderLeft: `6px solid ${badgeColor}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', 
                      background: badgeColor, 
                      color: topLabel === 'neutral toward' ? '#333' : '#fff', 
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {topLabel}
                    </span>
                    <span style={{ color: '#555577', fontSize: '0.9rem', fontWeight: 600 }}>
                      Score: {topScore.toFixed(3)}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontStyle: 'italic', color: '#444', lineHeight: 1.5 }}>"{s.sequence}"</p>
                </div>
              );
            })}
            
            {filteredStances.length === 0 && (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No stances found meeting the current confidence threshold.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <h1>Political Stance Bias</h1>
      <div className="dashboard-container">
        
        {/* Left Analysis Mirror */}
        <AnalysisPanel />

        {/* Right Analysis Mirror */}
        {/* <AnalysisPanel /> */}

      </div>
      
      <div className="dashboard-container" style={{ marginTop: '2rem' }}>
        <SubjectDetailPanel />
      </div>
    </>
  );
}

export default App;
