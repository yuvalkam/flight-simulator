import React from 'react';

function AltitudeBar({ value }) {
  const max = 3000;
  const height = 300; // גובה גרפי בפיקסלים
  const numericValue = isNaN(Number(value)) ? 0 : Number(value);
  const position = height - (numericValue / max) * height; // חישוב מיקום החץ

  return (
    <div style={{ margin: '0 auto', width: '100px', textAlign: 'center' }}>
      {/* סרגל ערכים */}
      <div style={{
        position: 'relative',
        height: `${height}px`,
        width: '50px',
        border: '2px solid white',
        margin: '0 auto',
        background: '#111'
      }}>
        {/* מחוון (החץ) */}
        <div style={{
          position: 'absolute',
          left: '100%',
          top: `${position - 5}px`,
          width: 0,
          height: 0,
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '10px solid red'
        }}></div>

        {/* סימונים מספריים */}
        {[0, 1000, 2000, 3000].map(val => (
          <div key={val} style={{
            position: 'absolute',
            bottom: `${(val / max) * height}px`,
            left: '5px',
            color: 'white',
            fontSize: '12px'
          }}>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AltitudeBar;
