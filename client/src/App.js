import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AltitudeBar from './AltitudeBar';
import Compass from './Compass';
import ADI from './ADI';



function App() {
  const [data, setData] = useState({ altitude: 0, hsi: 0, adi: 0 });
  const [view, setView] = useState('TEXT');
  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState({ altitude: '', hsi: '', adi: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/data');
    const { altitude, hsi, adi } = res.data;
    setData({ altitude, hsi, adi });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // מאפשר הקלדה של "-" או ריק בלי להפיל את האפליקציה
    if (value === '' || value === '-' || isNaN(Number(value))) {
      setData({ ...data, [name]: value });
      return;
    }

    const numericValue = Number(value);
    let error = '';

    if (name === 'altitude' && (numericValue < 0 || numericValue > 3000)) {
      error = 'Altitude must be between 0 and 3000';
    } else if (name === 'hsi' && (numericValue < 0 || numericValue > 360)) {
      error = 'HSI must be between 0 and 360';
    } else if (name === 'adi' && (numericValue < -100 || numericValue > 100)) {
      error = 'ADI must be between -100 and 100';
    }

    if (!error) {
      setData({ ...data, [name]: numericValue });
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSend = async () => {
    const { altitude, hsi, adi } = data;
    await axios.post('http://localhost:5000/api/data', { altitude, hsi, adi });
    fetchData();
  };

  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/api/history');
    setHistory(res.data);
    setView('HISTORY');
  };

  const clearHistory = async () => {
    try {
      await axios.delete('http://localhost:5000/api/history');
      setHistory([]);              // מנקה את ההיסטוריה במסך
      setView('TEXT');             // חוזר לתצוגת טקסט
      alert('History cleared!');
    } catch (error) {
      console.error('Error clearing history:', error);
      alert('Failed to clear history. Is the server running?');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setView('TEXT')}>TEXT</button>
        <button onClick={() => setView('VISUAL')}>VISUAL</button>
        <button onClick={fetchData}>+</button>
        <button onClick={fetchHistory}>Show History</button>
        <button onClick={clearHistory}>🗑️ Clear History</button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <div>
          <input
            name="altitude"
            value={data.altitude}
            onChange={handleChange}
            placeholder="Altitude"
          />
          {errors.altitude && <div style={{ color: 'red', fontSize: 12 }}>{errors.altitude}</div>}
        </div>

        <div>
          <input
            name="hsi"
            value={data.hsi}
            onChange={handleChange}
            placeholder="HSI"
          />
          {errors.hsi && <div style={{ color: 'red', fontSize: 12 }}>{errors.hsi}</div>}
        </div>

        <div>
          <input
            name="adi"
            value={data.adi}
            onChange={handleChange}
            placeholder="ADI"
          />
          {errors.adi && <div style={{ color: 'red', fontSize: 12 }}>{errors.adi}</div>}
        </div>

        <button onClick={handleSend}>SEND</button>
      </div>

      {view === 'TEXT' && (
        <div>
          <p>Altitude: {data.altitude}</p>
          <p>HSI: {data.hsi}</p>
          <p>ADI: {data.adi}</p>
        </div>
      )}

{view === 'VISUAL' && (
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    padding: '20px'
  }}>
    <div>
      <h4 style={{ color: 'white', textAlign: 'center' }}>Altitude</h4>
      <AltitudeBar value={data.altitude} />
    </div>
    <div>
      <h4 style={{ color: 'white', textAlign: 'center' }}>HSI</h4>
      <Compass angle={data.hsi} />
    </div>
    <div>
      <h4 style={{ color: 'white', textAlign: 'center' }}>ADI</h4>
      <ADI value={data.adi} />
    </div>
  </div>
)}


      {view === 'HISTORY' && (
        <div>
          <h3>History:</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                Altitude: {entry.altitude}, HSI: {entry.hsi}, ADI: {entry.adi}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
