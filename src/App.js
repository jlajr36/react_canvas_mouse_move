import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw a simple rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 150, 100);

    // Draw a line
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 150);
    ctx.stroke();
  }, []);

  return (
    <div className="App">
      <h1>React Canvas Example</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
    </div>
  );
}

export default App;
