import React, { useState, useEffect, useRef } from 'react';
import { FiRotateCcw, FiPlay, FiPause, FiMaximize } from 'react-icons/fi';

export default function Product360Viewer({ frames = [], autoRotate = false, speed = 50 }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const containerRef = useRef(null);
  
  const totalFrames = frames.length;

  useEffect(() => {
    let interval;
    if (isPlaying && totalFrames > 0 && !isDragging) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalFrames, speed, isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setIsPlaying(false);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || totalFrames === 0) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = clientX - startXRef.current;
    
    // Sensitivity: how many pixels of drag = 1 frame
    const sensitivity = 10;
    
    if (Math.abs(deltaX) > sensitivity) {
      const frameDelta = deltaX > 0 ? -1 : 1;
      
      setCurrentFrame((prev) => {
        let next = prev + frameDelta;
        if (next < 0) next = totalFrames - 1;
        if (next >= totalFrames) next = 0;
        return next;
      });
      
      startXRef.current = clientX; // Reset start x after a frame change
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (totalFrames === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400">
        No frames provided
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col group select-none">
      {/* Viewer Area */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative cursor-ew-resize overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {frames.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`360 view frame ${index}`}
            draggable="false"
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-0 ${
              index === currentFrame ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        
        {/* Overlay instruction */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
          {!isDragging && (
             <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow text-xs font-bold tracking-wider uppercase text-stone-700 flex items-center gap-2">
               <FiRotateCcw /> Drag to rotate
             </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1.5 text-stone-600 hover:text-stone-900 transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
        </button>
        <div className="w-[1px] h-4 bg-stone-300 mx-1"></div>
        <div className="text-xs font-mono font-medium text-stone-500 w-12 text-center">
          {currentFrame + 1} / {totalFrames}
        </div>
      </div>
    </div>
  );
}
