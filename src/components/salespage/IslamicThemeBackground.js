'use client';

/**
 * Subtle Islamic Architectural & Geometric Background Components
 * Designed to add elegant Islamic thematic elements to salespages without overpowering content.
 */

export function IslamicPatternOverlay({ opacity = 0.055 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FDE047' stroke-width='0.5' stroke-opacity='1'%3E%3Cpath d='M0 0l40 40M40 0L0 40M40 40l40 40M80 40L40 80M40 0l40 40M0 40l40 40'/%3E%3Cpolygon points='40,12 48,20 60,20 60,32 68,40 60,48 60,60 48,60 40,68 32,60 20,60 20,48 12,40 20,32 20,20 32,20'/%3E%3Cpolygon points='40,20 45,25 52,25 52,32 57,37 52,42 52,49 45,49 40,54 35,49 28,49 28,42 23,37 28,32 28,25 35,25'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: opacity,
        zIndex: 1,
      }}
    />
  );
}

export function IslamicArchSilhouette({ opacity = 0.15, height = '100%' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 1000"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1200px',
        height: height,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
      }}
    >
      <defs>
        <linearGradient id="islamicArchGoldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#070D20" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="islamicArchFillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#070D20" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Outer Pointed Mihrab Arch */}
      <path
        d="M 60 1000 V 380 Q 60 160 400 30 Q 740 160 740 380 V 1000"
        fill="url(#islamicArchFillGrad)"
        stroke="url(#islamicArchGoldGrad)"
        strokeWidth="2.5"
      />
      {/* Inner Pointed Mihrab Arch Accent */}
      <path
        d="M 90 1000 V 390 Q 90 185 400 60 Q 710 185 710 390 V 1000"
        fill="none"
        stroke="url(#islamicArchGoldGrad)"
        strokeWidth="1.2"
        strokeDasharray="10 8"
      />
      {/* Arch Peak Ornament */}
      <circle cx="400" cy="24" r="5" fill="#FDE047" opacity="0.7" />
      <path d="M 400 8 L 400 24" stroke="#FDE047" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

export function MosqueSilhouette({ opacity = 0.12, height = '180px' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: height,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
      }}
    >
      <defs>
        <linearGradient id="mosqueOutlineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#070D20" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#mosqueOutlineGrad)" strokeWidth="1.8">
        {/* Central Dome */}
        <path d="M 500 300 V 180 Q 500 90 600 70 Q 700 90 700 300" />
        <path d="M 600 70 V 40" strokeWidth="2" />
        <circle cx="600" cy="35" r="4" fill="#FDE047" />
        {/* Side Domes */}
        <path d="M 340 300 V 210 Q 340 150 420 135 Q 500 150 500 210" />
        <path d="M 700 210 Q 700 150 780 135 Q 860 150 860 300" />
        {/* Left Minaret */}
        <path d="M 210 300 V 95 L 200 85 L 220 30 L 240 85 L 230 95 V 300" />
        <path d="M 220 30 V 15" strokeWidth="2" />
        {/* Right Minaret */}
        <path d="M 970 300 V 95 L 960 85 L 980 30 L 1000 85 L 990 95 V 300" />
        <path d="M 980 30 V 15" strokeWidth="2" />
        {/* Decorative Mihrab Arches inside dome */}
        <path d="M 570 300 V 230 Q 600 200 630 230 V 300" />
      </g>
    </svg>
  );
}

export function IslamicCardArchFrame({ children, style = {} }) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px 24px 16px 16px',
        border: '1.5px solid rgba(253,224,71,0.35)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        background: 'linear-gradient(180deg, rgba(13,26,58,0.95) 0%, rgba(7,13,32,0.98) 100%)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <IslamicPatternOverlay opacity={0.035} />
      {/* Arch header curve accent line */}
      <svg
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '24px',
          pointerEvents: 'none',
          opacity: 0.4,
        }}
      >
        <path d="M 0 0 Q 200 35 400 0" fill="none" stroke="#FDE047" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}
