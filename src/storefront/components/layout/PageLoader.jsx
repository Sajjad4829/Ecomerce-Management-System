import { useEffect, useState, useRef } from 'react';

/**
 * PageLoader — Exact Hatil.com style loader.
 * White full-screen background, brand square with letter, three bouncing dots.
 * Configurable via loaderConfig prop.
 */
export default function PageLoader({ onDone, config = {} }) {
  const {
    brandLetter  = 'D',
    brandColor   = '#dc2626',  // red
    dotColor     = '#dc2626',
    duration     = 1200,       // ms before auto-dismissing
  } = config;

  const [dotPhase, setDotPhase] = useState(0); // 0,1,2 — which dot is "active"
  const [fadeOut, setFadeOut]   = useState(false);
  const intervalRef = useRef(null);
  const timerRef    = useRef(null);

  useEffect(() => {
    // Cycle through dots: 0 → 1 → 2 → 0 …
    intervalRef.current = setInterval(() => {
      setDotPhase(p => (p + 1) % 3);
    }, 280);

    // After `duration` ms, begin fade-out
    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => onDone?.(), 350);
    }, duration);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timerRef.current);
    };
  }, [onDone, duration]);

  return (
    <>
      <style>{`
        @keyframes loaderDotBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }
      `}</style>

      <div
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         9999,
          background:     '#ffffff',
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          gap:            '18px',
          opacity:        fadeOut ? 0 : 1,
          transition:     'opacity 0.35s ease',
          pointerEvents:  fadeOut ? 'none' : 'all',
        }}
      >
        {/* Brand square — exactly like Hatil's red "H" square */}
        <div
          style={{
            width:           '52px',
            height:          '52px',
            background:      brandColor,
            borderRadius:    '4px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            flexShrink:      0,
          }}
        >
          <span
            style={{
              color:       '#ffffff',
              fontFamily:  '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontSize:    '28px',
              fontWeight:  800,
              lineHeight:  1,
              letterSpacing: '-0.02em',
              userSelect:  'none',
            }}
          >
            {brandLetter}
          </span>
        </div>

        {/* Three bouncing dots — like Hatil's */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {[0, 1, 2].map((i) => {
            const isActive = dotPhase === i;
            return (
              <div
                key={i}
                style={{
                  width:        '10px',
                  height:       '10px',
                  borderRadius: '50%',
                  background:   isActive ? dotColor : 'transparent',
                  border:       `2px solid ${dotColor}`,
                  animation:    isActive
                    ? 'loaderDotBounce 0.55s ease infinite'
                    : 'none',
                  transition:   'background 0.2s ease',
                  flexShrink:   0,
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
