"use client";
import React, { useRef, useEffect } from "react";

const AbstractArt: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRandomColor = () => {
    // Define additional colors
    const color1 = "#0090fd"; // Example color 1
    const color2 = "#fd2060"; // Example color 2

    // Randomly decide whether to use grayscale or one of the additional colors
    const randomNum = Math.random();
    if (randomNum < 0.015) return color1; // x% chance for color 1
    if (randomNum < 0.025) return color2; // Additional x% chance for color 2
    // Grayscale for other cases
    const grayScale = Math.random() * 255;
    return `rgba(${grayScale}, ${grayScale}, ${grayScale}, ${Math.random()})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Adjust for high-DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Drawing fewer and larger rectangles
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(
          Math.random() * rect.width,
          Math.random() * rect.height,
          Math.random() * 200 + 50, // Increased width
          Math.random() * 200 + 50 // Increased height
        );
      }

      // Drawing circles if included
      const includeCircles = Math.random() < 0.2; // 20% chance to include circles
      if (includeCircles) {
        for (let i = 0; i < 10; i++) {
          ctx.fillStyle = getRandomColor();
          ctx.beginPath();
          ctx.arc(
            Math.random() * rect.width,
            Math.random() * rect.height,
            Math.random() * 50 + 10, // Random radius
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }

      // Drawing right-angled lines with varying thickness
      for (let i = 0; i < 40; i++) {
        ctx.strokeStyle = getRandomColor();
        ctx.lineWidth = Math.random() * 10 + 0.5; // Random thickness from 0.5 to 10.5
        if (Math.random() > 0.5) {
          const y = Math.random() * rect.height;
          const x1 = Math.random() * rect.width;
          const x2 = Math.random() * rect.width;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
        } else {
          const x = Math.random() * rect.width;
          const y1 = Math.random() * rect.height;
          const y2 = Math.random() * rect.height;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
        }
        ctx.stroke();
      }
    }
  }, []);

  return <canvas ref={canvasRef} className="w-full h-96" />;
};

export default AbstractArt;
