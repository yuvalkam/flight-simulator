import React from 'react';

function Compass({ angle }) {
  const numericAngle = isNaN(Number(angle)) ? 0 : Number(angle);

  return (
    <div style={{
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      border: '2px solid white',
      position: 'relative',
      margin: '0 auto',
      backgroundColor: '#111'
    }}>
      {/* סימוני כיוונים */}
      {[
        { label: '0', top: '5px', left: '50%', transform: 'translateX(-50%)' },
        { label: '90', top: '50%', right: '5px', transform: 'translateY(-50%)' },
        { label: '180', bottom: '5px', left: '50%', transform: 'translateX(-50%)' },
        { label: '270', top: '50%', left: '5px', transform: 'translateY(-50%)' },
      ].map((pos, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            color: 'white',
            fontSize: '12px',
            ...pos
          }}
        >
          {pos.label}
        </div>
      ))}

      {/* חץ */}
      <div style={{
        position: 'absolute',
        width: '2px',
        height: '70px',
        backgroundColor: 'red',
        top: '30px',
        left: '50%',
        transform: `translateX(-50%) rotate(${numericAngle}deg)`,
        transformOrigin: 'bottom center',
        transition: 'transform 0.5s ease'
      }} />
    </div>
  );
}

export default Compass;
