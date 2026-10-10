// src/data/motionsData.js

export const motionsData = [
  {
    id: 'spring-physics',
    name: 'Spring Physics & Damping',
    cnName: '弹簧弹性阻尼 / 机械回弹',
    category: 'Physics-Based',
    tags: ['Spring', 'Framer Motion', 'Bounce', 'Tactile'],
    specs: 'Stiffness: 420 | Damping: 28 | Mass: 0.9',
    prompt: 'Snappy physics spring animation with tactile overshoot and natural settle. Stiffness: 420, damping: 28, mass: 0.9. Fast response curve on pointer-down (scale: 0.96) with instant tactile snap-back on release.',
    cssSnippet: `/* CSS Spring approximation */
transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
&:active {
  transform: scale(0.95);
  transition-duration: 0.08s;
}`,
    sandboxType: 'spring-button'
  },
  {
    id: 'stagger-reveal',
    name: 'Stagger Fade-In Reveal',
    cnName: '阶梯交错淡入 / 级联显现',
    category: 'Sequence & Choreography',
    tags: ['Choreography', 'Cascade', 'List Entry', 'Micro-delays'],
    specs: 'Step delay: 45ms | Ease: cubic-bezier(0.16, 1, 0.3, 1)',
    prompt: 'Staggered cascade fade-up entry for list/card elements. Each consecutive child delays by 45ms. translateY offset starts from 14px to 0px, opacity from 0 to 1, easing curve: cubic-bezier(0.16, 1, 0.3, 1).',
    cssSnippet: `/* Stagger sequence using animation delays */
@keyframes staggerUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.item:nth-child(1) { animation-delay: 0ms; }
.item:nth-child(2) { animation-delay: 50ms; }
.item:nth-child(3) { animation-delay: 100ms; }`,
    sandboxType: 'stagger-list'
  },
  {
    id: 'parallax-tilt',
    name: 'Interactive Parallax 3D Tilt',
    cnName: '3D 悬浮视差 / 轴向倾角跟手',
    category: 'Cursor Tracking',
    tags: ['3D Matrix', 'Cursor', 'Hover Reflection', 'Depth'],
    specs: 'Max Rotate: 12deg | Perspective: 800px',
    prompt: 'Interactive 3D card tilt tracking cursor coordinates in real-time. CSS transform perspective(800px) rotateX and rotateY mapped dynamically to mouse offset, coupled with a glint specular reflection sheen gradient across surface.',
    cssSnippet: `/* Cursor reactive transform */
transform: perspective(800px) rotateX(calc(var(--mouse-y) * 10deg)) rotateY(calc(var(--mouse-x) * -10deg));
transition: transform 0.1s ease-out;`,
    sandboxType: 'parallax-card'
  },
  {
    id: 'magnetic-snap',
    name: 'Magnetic Cursor Snap',
    cnName: '磁吸附引力 / 准星吸引',
    category: 'Cursor Interaction',
    tags: ['Magnetic', 'Micro-interaction', 'Gravitational'],
    specs: 'Pull radius: 60px | Strength: 0.35',
    prompt: 'Magnetic interactive button that subtly pulls toward the user pointer when within a 60px influence radius. Smooth spring pull with quick elastic snap release once pointer exits boundary.',
    cssSnippet: `/* Smooth translation following pointer offset */
transform: translate3d(var(--pull-x, 0px), var(--pull-y, 0px), 0);
transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1);`,
    sandboxType: 'magnetic-button'
  },
  {
    id: 'tactile-stamp',
    name: 'Tactile Stamp / Emboss Pop',
    cnName: '机械钢印压花 / 盖印触感',
    category: 'Haptic Feedback',
    tags: ['Stamp', 'Haptic', 'Confirmation', 'Tactile'],
    specs: 'Duration: 220ms | Rotation: -6deg to 0deg',
    prompt: 'Tactile ink stamp confirmation feedback. Scale pops from 1.3 to 0.95 with brief -6deg mechanical twist before settling at 1.0, paired with instant hard border color strobe.',
    cssSnippet: `@keyframes stampEmboss {
  0% { transform: scale(1.3) rotate(-6deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(-2deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}`,
    sandboxType: 'stamp-trigger'
  },
  {
    id: 'infinite-marquee',
    name: 'Seamless Kinetic Marquee',
    cnName: '无缝动力学跑马灯 / 滚动机能条',
    category: 'Continuous Ambient',
    tags: ['Ticker', 'Marquee', 'Kinetic', 'Loop'],
    specs: 'Speed: 25s linear infinite | Pause on hover',
    prompt: 'Hardware telemetry kinetic marquee strip. Seamless continuous horizontal scroll running at constant linear velocity, zero stutter loop, pauses on hover with decelerating ease.',
    cssSnippet: `@keyframes marqueeScroll {
  from { transform: translateX(0%); }
  to { transform: translateX(-50%); }
}
.ticker-track {
  animation: marqueeScroll 20s linear infinite;
}
.ticker-track:hover {
  animation-play-state: paused;
}`,
    sandboxType: 'infinite-marquee'
  }
];
