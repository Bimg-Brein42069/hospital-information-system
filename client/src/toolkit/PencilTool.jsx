import { IonButton } from '@ionic/react';
import React, { useLayoutEffect, useState, useRef } from 'react';

const PencilTool = ({ setData }) => {
  const [points, setPoints] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const lastPointRef = useRef(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    contextRef.current = ctx;
  }, []);

  const startDrawing = (event) => {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (isInsideRegion(x, y)) {
      setDrawing(true);
      lastPointRef.current = { x, y };
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    }
  };
  
  const finishDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL('image/png');
    setData(imgData);
  };

  const draw = (event) => {
    if (!drawing) return;
    
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (isInsideRegion(x, y)) {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      lastPointRef.current = { x, y };
    }
  };

  const isInsideRegion = (x, y) => {
    // Define the boundaries of the drawing region
    const minX = 0; // Example minimum X coordinate
    const maxX = 1400; // Example maximum X coordinate
    const minY = 0; // Example minimum Y coordinate
    const maxY = 400; // Example maximum Y coordinate

    // Check if the point is inside the defined boundaries
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };


  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerWidth}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      >
      </canvas>
    </>
  );
};

export default PencilTool;
