import React, { useEffect, useState } from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ progress, hasError }) => {
  // Store last valid progress
  const [localProgress, setLocalProgress] = useState(progress || 0);
  
  // Update whenever we get new progress
  useEffect(() => {
    console.log("⭐ Progress prop changed to:", progress);
    if (progress !== undefined && !isNaN(progress)) {
      setLocalProgress(progress);
    }
    
    // Also check window object as fallback
    if (window.lastProgress !== undefined && !isNaN(window.lastProgress)) {
      setLocalProgress(window.lastProgress);
    }
  }, [progress]);
  
  // Normalize to valid range 0-100
  const normalizedProgress = Math.min(100, Math.max(0, localProgress));
  
  // SVG parameters 
  const radius = 40;
  const diameter = radius * 2;
  const circumference = 2 * Math.PI * radius;
  const dashLength = (circumference * normalizedProgress) / 100;
  const dashGap = circumference - dashLength;
  
  // Debug output
  console.log(`Progress Circle: ${normalizedProgress.toFixed(1)}% - Dash: ${dashLength.toFixed(1)}`);
  
  // Construct stroke-dasharray value directly
  const strokeDashArray = `${dashLength} ${dashGap}`;
  
  return (
    <div className={`progress-circle-container ${hasError ? 'error' : ''}`}>
      <svg width="100" height="100">
        {/* Background circle */}
        <circle
          className="progress-circle-bg"
          cx="50" cy="50" r={radius}
        />
        
        {/* Direct approach: use stroke-dasharray to show progress */}
        <circle
          className="progress-circle-fg"
          cx="50" cy="50" r={radius}
          strokeDasharray={strokeDashArray}
          strokeDashoffset="0"
          transform="rotate(-90, 50, 50)"
        />
        
        {/* Percentage text */}
        <text 
          className="progress-text" 
          x="50" y="50" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          {hasError ? '!' : `${Math.round(normalizedProgress)}%`}
        </text>
      </svg>
    </div>
  );
};

export default ProgressCircle;