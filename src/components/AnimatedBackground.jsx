import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create canvases first
    const ctx = canvas.getContext('2d');
    const mCanvas = document.createElement('canvas');
    const mCtx = mCanvas.getContext('2d');

    // Set canvas size function - now that mCanvas exists
    const updateCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      mCanvas.width = width;
      mCanvas.height = height;
    };

    // Function to get predefined logo positions (only 3 now)
    const getLogoPositions = () => [
      { x: canvas.width * 0.2, y: canvas.height * 0.3 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7 },
      { x: canvas.width * 0.5, y: canvas.height * 0.5 }
    ];

    // Initialize canvas size
    updateCanvasSize();
    
    // Enhanced resize handler
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);

    // Extend function for deep object merging
    const extend = (deep, target, ...sources) => {
      if (!target) target = {};
      
      sources.forEach(source => {
        if (!source) return;
        
        Object.keys(source).forEach(key => {
          const value = source[key];
          if (deep && value && typeof value === 'object' && !Array.isArray(value)) {
            target[key] = extend(deep, target[key] || {}, value);
          } else {
            target[key] = value;
          }
        });
      });
      
      return target;
    };

    // Calculate tangent points for orbital animation
    const getTangentPoint = (circleCentrePoint, radius, outPoint) => {
      const dx = circleCentrePoint.x - outPoint.x;
      const dy = circleCentrePoint.y - outPoint.y;
      const r1 = Math.atan2(dy, dx);
      const d1 = Math.sqrt(dx * dx + dy * dy);
      const r2 = Math.asin(radius / d1);
      const r3 = r1 - r2;
      const r4 = r3 - Math.PI / 2;
      const x1 = radius * Math.cos(r4);
      const y1 = radius * Math.sin(r4);
      const r5 = Math.PI / 2 - r1 - r2;
      const r6 = -r5;
      const x2 = radius * Math.cos(r6);
      const y2 = radius * Math.sin(r6);
      return {
        point1: { x: circleCentrePoint.x + x1, y: circleCentrePoint.y + y1 },
        point2: { x: circleCentrePoint.x - x2, y: circleCentrePoint.y - y2 }
      };
    };

    // Time management system
    const time = {
      mctx: ctx,
      mcvs: mCanvas,
      ctx: mCtx,
      last: Date.now(),
      timeBodys: [],
      add(timeBody) {
        this.timeBodys.push(timeBody);
      },
      remove(timeBody) {
        const index = this.timeBodys.indexOf(timeBody);
        if (index !== -1) this.timeBodys.splice(index, 1);
      },
      clock() {
        const now = Date.now();
        const delta = (now - time.last) / 1000;
        time.last = now;
        
        time.ctx.clearRect(0, 0, canvas.width, canvas.height);
        time.mctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time.timeBodys.forEach(timeBody => {
          time.ctx.save();
          timeBody.clock(delta);
          time.ctx.restore();
        });
        
        time.mctx.drawImage(mCanvas, 0, 0);
        animationRef.current = requestAnimationFrame(time.clock);
      }
    };

    // Base animation task class
    class AniTask {
      constructor(timeSystem) {
        this.time = timeSystem;
        this.nextTask = null;
      }

      setNext(task) {
        this.nextTask = task;
      }

      next() {
        if (this.nextTask) this.nextTask.start();
      }

      start() {
        this.time.add(this);
      }

      finish() {
        setTimeout(() => {
          this.time.remove(this);
        }, 0);
      }

      clock(delta) {}
    }

    // Line animation class
    class AniLine extends AniTask {
      constructor(timeSystem, options = {}) {
        super(timeSystem);
        
        const defaults = {
          lineWeight: 6,
          weightDecay: 0.06,
          initAlpha: 0,
          finalAlpha: 0.3,
          startPos: { x: 0, y: 0 },
          endPos: { x: 0, y: 0 },
          initColor: 'rgba(51, 212, 255',
          finalColor: 'rgba(51, 212, 255',
          initV: 20,
          finalV: 20
        };

        this.options = extend(true, {}, defaults, options);
        this.dx = this.options.endPos.x - this.options.startPos.x;
        this.dy = this.options.endPos.y - this.options.startPos.y;
        this.disPass = 0;
        this.totalDis = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.lineWidth = parseInt(this.options.lineWeight / this.options.weightDecay) - 1;
        this.currentAlpha = this.options.initAlpha;
        this.currentV = this.options.initV;
        this.arrived = false;
      }

      clock(delta) {
        this.disPass += this.currentV * delta;
        const progress = Math.min(this.disPass / this.totalDis, 1);
        
        this.currentAlpha = this.options.initAlpha + (this.options.finalAlpha - this.options.initAlpha) * progress;
        this.currentV = this.options.initV + (this.options.finalV - this.options.initV) * progress;
        
        // Color interpolation
        const initRGB = this.options.initColor.match(/\d+/g) || [51, 212, 255];
        const finalRGB = this.options.finalColor.match(/\d+/g) || [51, 212, 255];
        const r = parseInt(initRGB[0]) + (parseInt(finalRGB[0]) - parseInt(initRGB[0])) * progress;
        const g = parseInt(initRGB[1]) + (parseInt(finalRGB[1]) - parseInt(initRGB[1])) * progress;
        const b = parseInt(initRGB[2]) + (parseInt(finalRGB[2]) - parseInt(initRGB[2])) * progress;
        this.currentColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;

        this.draw();

        if (!this.arrived && this.disPass >= this.totalDis) {
          this.next();
          this.arrived = true;
        }

        if (this.disPass - this.lineWidth >= this.totalDis) {
          this.finish();
        }
      }

      draw() {
        let drawing = this.disPass;
        let lineWeight = this.options.lineWeight;
        const opacityDecay = 1 / this.lineWidth;
        const ratio = drawing / this.totalDis;
        const drawX = this.options.startPos.x + this.dx * ratio;
        const drawY = this.options.startPos.y + this.dy * ratio;

        // Draw very subtle glowing light effect
        if (!this.arrived) {
          this.time.ctx.globalAlpha = this.currentAlpha * 0.3; // Much more subtle glow
          const grd = this.time.ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 40); // Smaller glow radius
          grd.addColorStop(0, this.currentColor + ', 0.2)'); // Lower opacity
          grd.addColorStop(1, this.currentColor + ', 0)');
          this.time.ctx.fillStyle = grd;
          this.time.ctx.beginPath();
          this.time.ctx.arc(drawX, drawY, 40, 0, Math.PI * 2); // Smaller glow
          this.time.ctx.fill();
        }

        // Draw trail
        this.time.ctx.globalAlpha = this.currentAlpha;
        for (let i = 0; i < this.lineWidth; i++) {
          drawing--;
          lineWeight -= this.options.weightDecay;
          if (drawing >= this.totalDis || drawing <= 0) continue;
          
          const ratio = drawing / this.totalDis;
          const drawX = this.options.startPos.x + this.dx * ratio;
          const drawY = this.options.startPos.y + this.dy * ratio;
          
          this.time.ctx.fillStyle = this.currentColor + `, ${1 - opacityDecay * i})`;
          this.time.ctx.beginPath();
          this.time.ctx.arc(drawX, drawY, lineWeight / 2, 0, Math.PI * 2);
          this.time.ctx.fill();
        }
      }
    }

    // Arc animation class
    class AniArc extends AniTask {
      constructor(timeSystem, options = {}) {
        super(timeSystem);
        
        const defaults = {
          lineWeight: 6,
          weightDecay: 0.06,
          circleCentre: { x: 0, y: 0 },
          radius: 100,
          startAngle: 0,
          endAngle: Math.PI,
          initAlpha: 0,
          finalAlpha: 0.3,
          initColor: 'rgba(51, 212, 255',
          finalColor: 'rgba(51, 212, 255',
          initV: 20,
          finalV: 20
        };

        this.options = extend(true, {}, defaults, options);
        this.disPass = 0;
        this.totalDis = Math.abs(this.options.startAngle - this.options.endAngle) * this.options.radius;
        this.counterclockwise = this.options.startAngle < this.options.endAngle ? false : true;
        this.lineWidth = parseInt(this.options.lineWeight / this.options.weightDecay) - 1;
        this.currentAlpha = this.options.initAlpha;
        this.currentV = this.options.initV;
        this.arrived = false;
      }

      clock(delta) {
        this.disPass += this.currentV * delta;
        const progress = Math.min(Math.max((this.disPass - this.lineWidth) / (this.totalDis - this.lineWidth), 0), 1);
        
        this.currentAlpha = this.options.initAlpha + (this.options.finalAlpha - this.options.initAlpha) * progress;
        this.currentV = this.options.initV + (this.options.finalV - this.options.initV) * progress;
        
        // Color interpolation
        const initRGB = this.options.initColor.match(/\d+/g) || [51, 212, 255];
        const finalRGB = this.options.finalColor.match(/\d+/g) || [51, 212, 255];
        const r = parseInt(initRGB[0]) + (parseInt(finalRGB[0]) - parseInt(initRGB[0])) * progress;
        const g = parseInt(initRGB[1]) + (parseInt(finalRGB[1]) - parseInt(initRGB[1])) * progress;
        const b = parseInt(initRGB[2]) + (parseInt(finalRGB[2]) - parseInt(initRGB[2])) * progress;
        this.currentColor = `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;

        this.draw();

        if (!this.arrived && this.disPass >= this.totalDis) {
          this.next();
          this.arrived = true;
        }

        if (this.disPass - this.lineWidth >= this.totalDis) {
          this.finish();
        }
      }

      draw() {
        let drawing = this.disPass;
        let lineWeight = this.options.lineWeight;
        const opacityDecay = 1 / this.lineWidth;
        const dir = this.counterclockwise ? -1 : 1;
        let angle = dir * drawing / this.options.radius + this.options.startAngle;
        let drawX = this.options.circleCentre.x + Math.cos(angle) * this.options.radius;
        let drawY = this.options.circleCentre.y + Math.sin(angle) * this.options.radius;

        // Draw very subtle orbit circle
        this.time.ctx.globalAlpha = 0.01; // Even more subtle
        this.time.ctx.strokeStyle = this.currentColor + ', 1)';
        this.time.ctx.lineWidth = 0.5; // Thinner orbit line
        this.time.ctx.beginPath();
        this.time.ctx.arc(this.options.circleCentre.x, this.options.circleCentre.y, this.options.radius, 0, Math.PI * 2);
        this.time.ctx.stroke();

        // Draw very subtle glowing light effect
        if (!this.arrived) {
          this.time.ctx.globalAlpha = this.currentAlpha * 0.3; // Much more subtle glow
          const grd = this.time.ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, 40); // Smaller glow radius
          grd.addColorStop(0, this.currentColor + ', 0.2)'); // Lower opacity
          grd.addColorStop(1, this.currentColor + ', 0)');
          this.time.ctx.fillStyle = grd;
          this.time.ctx.beginPath();
          this.time.ctx.arc(drawX, drawY, 40, 0, Math.PI * 2); // Smaller glow
          this.time.ctx.fill();
        }

        // Draw orbital trail
        this.time.ctx.globalAlpha = this.currentAlpha;
        for (let i = 0; i < this.lineWidth; i++) {
          lineWeight -= this.options.weightDecay;
          angle = dir * drawing / this.options.radius + this.options.startAngle;
          
          if (drawing < this.totalDis && drawing > 0) {
            drawX = this.options.circleCentre.x + Math.cos(angle) * this.options.radius;
            drawY = this.options.circleCentre.y + Math.sin(angle) * this.options.radius;
            this.time.ctx.fillStyle = this.currentColor + `, ${1 - opacityDecay * i})`;
            this.time.ctx.beginPath();
            this.time.ctx.arc(drawX, drawY, lineWeight / 2, 0, Math.PI * 2);
            this.time.ctx.fill();
          }
          drawing--;
        }
      }
    }

    // Circle explosion animation
    class AniCircle extends AniTask {
      constructor(timeSystem, options = {}) {
        super(timeSystem);
        
        const defaults = {
          pos: { x: 0, y: 0 },
          color: 'rgba(51, 212, 255'
        };

        this.options = extend(true, {}, defaults, options);
        this.disPass = 0;
        this.totalDis = 30;
        this.arrived = false;
      }

      clock() {
        this.disPass += 0.3; // Slower animation
        const alpha = (1 - (this.disPass / this.totalDis)) / 4; // Much more subtle
        
        this.time.ctx.globalAlpha = Math.max(alpha, 0);
        this.time.ctx.strokeStyle = this.options.color + ', 0.4)'; // Lower opacity
        this.time.ctx.fillStyle = this.options.color + ', 0.3)'; // Lower opacity
        this.time.ctx.lineWidth = 1; // Thinner lines
        
        this.time.ctx.beginPath();
        this.time.ctx.arc(this.options.pos.x, this.options.pos.y, this.disPass / 2, 0, Math.PI * 2);
        this.time.ctx.stroke();
        
        this.time.ctx.beginPath();
        this.time.ctx.arc(this.options.pos.x, this.options.pos.y, this.disPass / 2.4, 0, Math.PI * 2);
        this.time.ctx.fill();

        if (this.disPass > this.totalDis) {
          this.finish();
          return;
        }
        
        if (!this.arrived && this.disPass > 10) {
          this.arrived = true;
          this.next();
        }
      }
    }

    // Subtle floating logo animation
    class AniLogo extends AniTask {
      constructor(timeSystem, options = {}) {
        super(timeSystem);
        
        const defaults = {
          pos: { x: 0, y: 0 },
          fontSize: 60,
          color: 'rgba(51, 212, 255'
        };

        this.options = extend(true, {}, defaults, options);
        this.disPass = 0;
        this.totalDis = 180; // Longer duration
        this.maxAlpha = 0.08; // More visible
      }

      clock() {
        this.disPass += 0.5;
        
        // Create a fade in/out effect
        let alpha;
        if (this.disPass < this.totalDis / 3) {
          // Fade in
          alpha = (this.disPass / (this.totalDis / 3)) * this.maxAlpha;
        } else if (this.disPass < (this.totalDis * 2) / 3) {
          // Stay visible
          alpha = this.maxAlpha;
        } else {
          // Fade out
          alpha = this.maxAlpha * (1 - (this.disPass - (this.totalDis * 2) / 3) / (this.totalDis / 3));
        }

        this.time.ctx.save();
        this.time.ctx.globalAlpha = Math.max(alpha, 0);
        this.time.ctx.font = `${this.options.fontSize}px Space Mono, monospace`;
        this.time.ctx.fontWeight = '700';
        this.time.ctx.textAlign = 'center';
        this.time.ctx.textBaseline = 'middle';
        this.time.ctx.fillStyle = this.options.color + ', 1)';
        this.time.ctx.fillText('ΘΞ', this.options.pos.x, this.options.pos.y);
        this.time.ctx.restore();

        if (this.disPass > this.totalDis) {
          this.finish();
        }
      }
    }

    // Helper function to determine entry point for orbital animation
    const getEnterPoint = (startPos, tPoint1, tPoint2, circleCentre, counterclockwise) => {
      let angle1 = Math.atan2(tPoint1.y - circleCentre.y, tPoint1.x - circleCentre.x);
      let angle2 = Math.atan2(tPoint2.y - circleCentre.y, tPoint2.x - circleCentre.x);
      let sAngle = Math.atan2(startPos.y - circleCentre.y, startPos.x - circleCentre.x);

      // Normalize angles to [0, 2π]
      angle1 += (angle1 < 0 ? Math.PI * 2 : 0);
      angle2 += (angle2 < 0 ? Math.PI * 2 : 0);
      sAngle += (sAngle < 0 ? Math.PI * 2 : 0);

      if (sAngle > Math.max(angle1, angle2)) {
        if (angle1 > angle2) {
          angle2 += 2 * Math.PI;
        } else {
          angle1 += 2 * Math.PI;
        }
      } else if (sAngle < Math.min(angle1, angle2)) {
        sAngle += 2 * Math.PI;
        if (angle1 > angle2) {
          angle2 += 2 * Math.PI;
        } else {
          angle1 += 2 * Math.PI;
        }
      }

      return counterclockwise ? (angle1 > angle2 ? tPoint2 : tPoint1) : (angle1 > angle2 ? tPoint1 : tPoint2);
    };

    // Main function to create a complete moving star animation
    const createMovingStar = (timeSystem, startPos, endPos, circleCentre, radius, options = {}) => {
      const defaults = {
        lineWeight: 6,
        laps: 0,
        weightDecay: 0.06,
        counterclockwise: false,
        initColor: 'rgba(51, 212, 255',
        finalColor: 'rgba(51, 212, 255',
        line1: {
          initAlpha: 0,
          finalAlpha: 0.5,
          initV: 200,
          finalV: 200
        },
        arc: {
          initAlpha: 0.5,
          finalAlpha: 0.5,
          initV: 200,
          finalV: 400
        },
        line2: {
          initAlpha: 0.5,
          finalAlpha: 0,
          initV: 400,
          finalV: 400
        }
      };

      options = extend(true, {}, defaults, options);

      // Calculate tangent points for both start and end positions
      const stPoints = getTangentPoint({ x: circleCentre.x, y: circleCentre.y }, radius, startPos);
      const etPoints = getTangentPoint({ x: circleCentre.x, y: circleCentre.y }, radius, endPos);

      // Determine entry and exit points based on direction
      const enterPoint = getEnterPoint(startPos, stPoints.point1, stPoints.point2, circleCentre, options.counterclockwise);
      const outPoint = getEnterPoint(endPos, etPoints.point1, etPoints.point2, circleCentre, !options.counterclockwise);

      // Calculate start and end angles for the orbital path
      let startAngle = Math.atan2(enterPoint.y - circleCentre.y, enterPoint.x - circleCentre.x);
      let endAngle = Math.atan2(outPoint.y - circleCentre.y, outPoint.x - circleCentre.x);

      if (options.counterclockwise) {
        if (endAngle > startAngle) startAngle += 2 * Math.PI;
      } else {
        if (endAngle < startAngle) endAngle += 2 * Math.PI;
      }

      endAngle += options.laps * 2 * Math.PI * (options.counterclockwise ? -1 : 1);

      // Create animation sequence
      const circle1 = new AniCircle(timeSystem, { pos: startPos, color: options.initColor });
      const circle2 = new AniCircle(timeSystem, { pos: endPos, color: options.finalColor });

      const line1 = new AniLine(timeSystem, extend(true, {}, options.line1, {
        startPos: startPos,
        endPos: enterPoint,
        initColor: options.initColor,
        finalColor: options.initColor,
        lineWeight: options.lineWeight,
        weightDecay: options.weightDecay
      }));

      const arc = new AniArc(timeSystem, extend(true, {}, options.arc, {
        circleCentre: circleCentre,
        startAngle: startAngle,
        endAngle: endAngle,
        radius: radius,
        initColor: options.initColor,
        finalColor: options.finalColor,
        lineWeight: options.lineWeight,
        weightDecay: options.weightDecay
      }));

      const line2 = new AniLine(timeSystem, extend(true, {}, options.line2, {
        startPos: outPoint,
        endPos: endPos,
        initColor: options.finalColor,
        finalColor: options.finalColor,
        lineWeight: options.lineWeight,
        weightDecay: options.weightDecay
      }));

      // Chain animations together
      circle1.setNext(line1);
      line1.setNext(arc);
      arc.setNext(line2);
      line2.setNext(circle2);
      
      circle1.start();
    };

    // Animation generation function
    const generateAnimation = () => {
      if (time.timeBodys.length < 4) { // Limit concurrent animations for subtlety
        // Use very subtle blue colors with low opacity
        const blueColors = [
          'rgba(51, 212, 255',
          'rgba(100, 220, 255',
          'rgba(150, 230, 255',
          'rgba(80, 200, 255'
        ];
        
        const initColor = blueColors[Math.floor(Math.random() * blueColors.length)];
        const finalColor = blueColors[Math.floor(Math.random() * blueColors.length)];
        const lineWeight = Math.random() * 1.5 + 1; // Much thinner lines (1-2.5)
        const weightDecay = lineWeight / 60; // Faster decay for finer trails
        
        // Generate random positions ensuring they fit on screen
        const circleCentre = {
          x: Math.random() * (canvas.width - 600) + 300,
          y: Math.random() * (canvas.height - 600) + 300
        };
        const radius = Math.floor((Math.random() * 120 + 80) / 20) * 20;
        
        const startPos = {
          x: Math.max(50, Math.min(canvas.width - 50, circleCentre.x - radius - Math.random() * 400)),
          y: Math.max(50, Math.min(canvas.height - 50, Math.random() * canvas.height))
        };
        const endPos = {
          x: Math.max(50, Math.min(canvas.width - 50, circleCentre.x + radius + Math.random() * 400)),
          y: Math.max(50, Math.min(canvas.height - 50, Math.random() * canvas.height))
        };

        createMovingStar(time, startPos, endPos, circleCentre, radius, {
          counterclockwise: Math.random() > 0.5,
          laps: Math.floor(Math.random() * 2), // 0-1 laps for subtlety
          initColor: initColor,
          finalColor: finalColor,
          lineWeight: lineWeight,
          weightDecay: weightDecay,
          // Override default options for more discrete animation
          line1: {
            initAlpha: 0,
            finalAlpha: 0.15, // Much lower opacity
            initV: 150,
            finalV: 150
          },
          arc: {
            initAlpha: 0.15,
            finalAlpha: 0.15,
            initV: 150,
            finalV: 200
          },
          line2: {
            initAlpha: 0.15,
            finalAlpha: 0,
            initV: 200,
            finalV: 200
          }
        });
      }

      // Schedule next animation with longer intervals for discretion
      setTimeout(generateAnimation, Math.random() * 15000 + 8000); // 8-23 seconds
    };

         // Function to create logos at predefined positions
     const generateFloatingLogo = () => {
       const logoPositions = getLogoPositions();
       const selectedPosition = logoPositions[Math.floor(Math.random() * logoPositions.length)];
       
       const fontSize = 60 + Math.random() * 30; // Size between 60-90px
       
       const logo = new AniLogo(time, {
         pos: selectedPosition,
         fontSize: fontSize,
         color: 'rgba(51, 212, 255'
       });
       
       logo.start();

       // Schedule next logo every 5-10 seconds
       setTimeout(generateFloatingLogo, Math.random() * 5000 + 5000); // 5-10 seconds
     };

         // Start the animation system
    time.clock();
    generateAnimation();
    generateFloatingLogo();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.4 // Much more discrete overall
      }}
    />
  );
};

export default AnimatedBackground; 