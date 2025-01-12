import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const circlePosition = useRef({ x: 250, y: 250 });  // Using ref to store circle position
  const isDragging = useRef(false);  // Using ref to track dragging state
  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Function to draw circle and line from center to circle
    const drawCircle = (x, y) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw line from the center to the circle
      ctx.beginPath();
      ctx.moveTo(centerX, centerY); 
      ctx.lineTo(x, y); 
      ctx.strokeStyle = 'red';
      ctx.stroke();

      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'blue';  
      ctx.fill();
      ctx.stroke();
    };

    // Initial drawing of circle
    drawCircle(circlePosition.current.x, circlePosition.current.y);

    // Handle mouse move event
    const handleMouseMove = (event) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // If dragging, update position
      if (isDragging.current) {
        circlePosition.current = { x: mouseX, y: mouseY };
        drawCircle(mouseX, mouseY);
      } else {
        drawCircle(circlePosition.current.x, circlePosition.current.y);
      }
    };

    // Handle mouse down event
    const handleMouseDown = (event) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      // Check if mouse is inside the circle
      const isInsideCircle = Math.sqrt(
        (mouseX - circlePosition.current.x) ** 2 + (mouseY - circlePosition.current.y) ** 2
      ) < radius;

      if (isInsideCircle) {
        isDragging.current = true;
      }
    };

    // Handle mouse up event
    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Add event listeners for mouse events
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Cleanup event listeners when component is unmounted
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);  // Empty dependency array so the effect runs only once when the component mounts

  return (
    <div className="App">
      <h1>Move On Canvas</h1>
      <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />
    </div>
  );
}

export default App;
