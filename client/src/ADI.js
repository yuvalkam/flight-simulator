import React from 'react';

function ADI({ value }) {
  const max = 100;
  const numericValue = isNaN(Number(value)) ? 0 : Number(value);
  const clamped = Math.max(-max, Math.min(max, numericValue));
  const offset = (clamped / max) * 50;

  // צבע רקע לפי הדרישות
  let background = '#111'; // ברירת מחדל
  if (clamped === 100) background = 'blue';
  else if (clamped === 0) background = 'green';

  return (
    <div style={{
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      border: '2px solid white',
      position: 'relative',
      margin: '0 auto',
      backgroundColor: background,
      overflow: 'hidden'
    }}>
      {/* קו האופק */}
      <div style={{
        position: 'absolute',
        top: `calc(50% + ${-offset}px)`,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'cyan',
        transition: 'top 0.3s ease'
      }} />

      {/* סימונים */}
      <div style={{ position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '12px' }}>+100</div>
      <div style={{ position: 'absolute', bottom: '5px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '12px' }}>-100</div>
    </div>
  );
}

export default ADI;
