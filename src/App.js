import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);  // Track if the circle is being dragged
  const [circlePosition, setCirclePosition] = useState({ x: 250, y: 250 });  // Initial circle position
  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw a circle and check for collision with mouse
    const drawCircle = (x, y) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'blue';  // Set color
      ctx.fill();
      ctx.stroke();
    };

    // Initial drawing
    drawCircle(circlePosition.x, circlePosition.y);

    // Mouse event listeners
    const handleMouseMove = (event) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Check if mouse is inside the circle
      const isInsideCircle = Math.sqrt(
        (mouseX - circlePosition.x) ** 2 + (mouseY - circlePosition.y) ** 2
      ) < radius;

      if (isDragging) {
        // Move the circle with the mouse if dragging
        setCirclePosition({ x: mouseX, y: mouseY });
        drawCircle(mouseX, mouseY);
      } else {
        // Draw the circle in blue if the mouse isn't inside
        drawCircle(circlePosition.x, circlePosition.y);
      }
    };

    const handleMouseDown = (event) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;
      // Start dragging if the mouse is inside the circle
      const isInsideCircle = Math.sqrt(
        (mouseX - circlePosition.x) ** 2 + (mouseY - circlePosition.y) ** 2
      ) < radius;

      if (isInsideCircle) {
        setIsDragging(true);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners on unmount
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [circlePosition, isDragging]);

  return (
    <div className="App">
      <h1>Move On Canvas</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
    </div>
  );
}

export default App;
