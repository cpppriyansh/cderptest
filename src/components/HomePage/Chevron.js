"use client";

import React, { useState, useEffect, useRef } from 'react';
import BackgroundAnimation from '@/components/Common/BackgroundAnimation';

// Only keep OuterSinusoidalWave (even though it's minimal, it's referenced in JSX)
const OuterSinusoidalWave = () => (
  <svg width="600" height="160" viewBox="0 0 600 160" fill="none" className="absolute -top-10 -left-8">
    {/* Empty paths removed - component kept for structure */}
  </svg>
);

export default function OfferLetter() {
  const steps = [
    { label: 'Enroll', color: '#34D399', topColored: true, icon: <img src="https://res.cloudinary.com/dujw4np0d/image/upload/v1756463856/business-contract_qech7t.avif" alt="Enroll" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { label: 'Corporate Training', color: '#FBBF24', topColored: false, icon: <img src="https://res.cloudinary.com/dujs6xvde/image/upload/v1760087019/investment_gcc5b9_compressed_svrrey.avif" alt="Corporate Training" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { label: 'Real-Time Scenario', color: '#8B5CF6', topColored: true, icon: <img src="https://res.cloudinary.com/dujs6xvde/image/upload/v1760086876/tasks_blby9z_compressed_plbokk.avif" alt="Real-Time Scenario" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { label: 'Interview Preparation', color: '#FB7185', topColored: false, icon:<img src="https://res.cloudinary.com/dujs6xvde/image/upload/v1760087151/interview_jwdnvq_compressed_kpyr9x.avif" alt="Interview Preparation" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { label: 'Experience Alteration', color: '#6366F1', topColored: true, icon: <img src="https://res.cloudinary.com/dujs6xvde/image/upload/v1760086929/personalization_h2ezuq_compressed_hq42o0.avif" alt="Experience Alteration" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /> },
    { label: 'Job Assistance', color: '#F59E0B', topColored: false, icon: <img src="https://res.cloudinary.com/dujw4np0d/image/upload/v1756464856/job-offer_ilhojs.avif" alt="Job Assistance" className="w-10 h-10" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />}
  ];

  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const animationStartRef = useRef(Date.now());

  useEffect(() => {
    const animationDuration = 3000;
    const visibleDuration = 5000;
    const hiddenGap = 600;
    const timers = [];

    function startCycle() {
      setVisible(true);
      const now = Date.now();
      const elapsed = (now - animationStartRef.current) % animationDuration;
      const timeUntilEnd = animationDuration - elapsed;

      const pauseTimer = setTimeout(() => {
        setIsPaused(true);
        const resumeTimer = setTimeout(() => {
          setIsPaused(false);
          setVisible(false);
          animationStartRef.current = Date.now();
          setCycleKey(k => k + 1);
        }, visibleDuration);
        timers.push(resumeTimer);
      }, timeUntilEnd);
      timers.push(pauseTimer);

      const nextTimer = setTimeout(() => startCycle(), timeUntilEnd + visibleDuration + hiddenGap);
      timers.push(nextTimer);
    }

    startCycle();
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const splitLabelIntoTwo = (text) => {
    const words = text.trim().split(/(\s+)/);
    if (words.length === 1) return [words[0], null];
    if (words.length <= 3) return [words[0], words.slice(1).join('')];

    const total = text.length;
    let bestIdx = 0;
    let bestDiff = Infinity;
    let cum = 0;
    for (let i = 0; i < words.length - 1; i++) {
      cum += words[i].length + 1;
      const diff = Math.abs(cum - total / 2);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
      }
    }
    const first = words.slice(0, bestIdx + 1).join(' ');
    const second = words.slice(bestIdx + 1).join(' ');
    return [first, second];
  };

  return (
    <div id="chevron-area" className="chevron-root min-h-[520px] relative overflow-visible" style={{ paddingBottom: '12px' }}>
      <BackgroundAnimation />

      <div className="containerCH">
        <h2>Training To Placement Approach</h2>
        <div className="titleUnderline" />
      </div>

      <div className="chevron-wave-wrapper absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <OuterSinusoidalWave />
      </div>

      <div className="chevron-content-wrapper absolute top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex items-center gap-6 w-max" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}>
          <svg key={cycleKey} width="700" height="120" viewBox="0 0 600 120" className={`wave absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none ${isPaused ? 'paused' : ''}`}>
            {
              (() => {
                const starts = [6, 110, 214, 318, 422, 526];
                const ends =   [74, 178, 282, 386, 490, 594];
                const colors = ['#34D399','#FBBF24','#8B5CF6','#FB7185','#6366F1','#F59E0B'];
                const segs = [];
                for (let i = 0; i < 6; i++) {
                  const startX = starts[i];
                  const endX = ends[i];
                  const dirFlag = (i % 2 === 0) ? 1 : 0;

                  if (i > 0) {
                    const prevEnd = ends[i - 1];
                    segs.push(
                      <path
                        key={`conn-${i}`}
                        d={`M${prevEnd} 60 L${startX} 60`}
                        stroke={colors[i]}
                        strokeWidth="30"
                        fill="none"
                        strokeLinecap="round"
                        className="wave-seg"
                        style={{ ['--delay']: `${i * 0.15}s` }}
                      />
                    );
                  }
                  segs.push(
                    <path
                      key={`arc-${i}`}
                      d={`M${startX} 60 A34 34 0 0 ${dirFlag} ${endX} 60`}
                      stroke={colors[i]}
                      strokeWidth="30"
                      fill="none"
                      strokeLinecap="round"
                      className="wave-seg"
                      style={{ ['--delay']: `${i * 0.15}s` }}
                    />
                  );
                }
                return segs;
              })()
            }
            <path d="M6 66 A34 34 0 0 1 74 66 A34 34 0 0 1 110 66 A34 34 0 0 1 178 66 A34 34 0 0 1 214 66 A34 34 0 0 1 282 66 A34 34 0 0 1 318 66 A34 34 0 0 1 386 66 A34 34 0 0 1 422 66 A34 34 0 0 1 490 66 A34 34 0 0 1 526 66 A34 34 0 0 1 594 66" stroke="rgba(2,6,23,0.06)" strokeWidth="8" fill="none" strokeLinecap="round" />
          </svg>

          <div className="flex items-center gap-6 relative z-10">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="icon-item relative w-20 h-20"
                style={{ ['--delay']: `${idx * 0.15}s` }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0">
                  <path className="semi-top" d="M6 40 A34 34 0 0 1 74 40" stroke={s.topColored ? s.color : '#E5E7EB'} strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path className="semi-bottom" d="M74 40 A34 34 0 0 1 6 40" stroke={s.topColored ? '#E5E7EB' : s.color} strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path className="semi-right" d="M40 6 A34 34 0 0 1 40 74" stroke={(idx % 2 === 0) ? s.color : '#E5E7EB'} strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path className="semi-left" d="M40 74 A34 34 0 0 1 40 6" stroke={(idx % 2 === 0) ? '#E5E7EB' : s.color} strokeWidth="10" fill="none" strokeLinecap="round" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="icon-inner w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10 text-black">
                    {s.icon}
                  </div>
                </div>

                <div className={`label-arrow absolute left-1/2 transform -translate-x-1/2 ${s.topColored ? 'arrow-top' : 'arrow-bottom'}`} aria-hidden="true">
                  {s.topColored ? (
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <path d="M7 0 L14 8 H0 L7 0 Z" fill={s.color} />
                    </svg>
                  ) : (
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <path d="M0 0 L14 0 L7 8 Z" fill={s.color} />
                    </svg>
                  )}
                </div>

                <div
                  className={`label absolute left-1/2 transform -translate-x-1/2 ${s.topColored ? '-top-12 label-top' : '-bottom-12 label-bottom'} ${visible ? 'label-visible' : ''}`}
                  style={{ background: s.color, color: '#fff', padding: '6px 10px', borderRadius: 8, transition: 'opacity 180ms ease, transform 180ms ease' }}
                >
                  {(() => {
                    const [first, second] = splitLabelIntoTwo(s.label);
                    if (!second) return <span className="label-line">{first}</span>;
                    return (
                      <span className="label-multiline">
                        <span className="label-line-first">{first}</span>
                        <span className="label-line-second">{second}</span>
                      </span>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .icon-item { opacity: 1; transform: translateY(0); }
        .icon-inner { transition: transform 180ms ease; }
        .icon-item:hover .icon-inner { transform: scale(1.06); }

        .label { opacity: 0; pointer-events: none; white-space: nowrap; font-weight: 600; font-size: 12px; }
        .label-visible { opacity: 1; pointer-events: auto; transform: translateY(0) !important; }
        .label-top { transform: translateY(-8px); }
        .label-bottom { transform: translateY(8px); }

        .label-arrow { width: 14px; height: 8px; pointer-events: none; z-index: 11; }
        .label-arrow.arrow-top { top: -8px; transform: translate(-30%, -140%); }
        .label-arrow.arrow-bottom { bottom: -8px; transform: translate(-30%, 140%); }

        .wave-seg { opacity: 1; transition: opacity 260ms ease; stroke-linecap: round; }
        .wave path { stroke-dasharray: 120; animation: flow 3s linear infinite; }
        .wave.paused path { animation-play-state: paused; }
        @keyframes flow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -240; } }
        @keyframes flow-vertical { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 240; } }

        .containerCH {
          padding: 14px 20px 8px 20px;
          margin: 12px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1800px;
          width: 97.5%;
          padding-bottom: 16px;
        }

        .containerCH h2 {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-shadow: 0 0 0px #fff, 0 0 10px #fff, 0 0 10px #0073e6, 0 0 20px #182e4a, 0 0 20px #182e4a, 0 0 30px #182e4a, 0 0 30px #182e4a;
          background: linear-gradient(90deg, #fff 35%, rgba(3, 163, 196, 1) 49%, #fff 62%);
          -webkit-background-clip: text;
          color: transparent;
          text-align: center;
        }

        .titleUnderline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #a76b2e, #f18436);
          margin: 12px auto;
          border-radius: 2px;
        }

        @media (min-width: 641px) {
          .label { left: 50% !important; }
          .label-top { transform: translate(-50%, -8px) !important; }
          .label-bottom { transform: translate(-50%, 8px) !important; }
          .label-visible { transform: translate(-50%, 0) !important; }
          .label-arrow { left: 50% !important; transform: translateX(-50%) !important; }
          .label-arrow.arrow-top { top: -10px !important; transform: translateX(-50%) translateY(-120%) !important; }
          .label-arrow.arrow-bottom { bottom: -10px !important; transform: translateX(-50%) translateY(120%) !important; }
        }

        @media (max-width: 640px) {
          .chevron-root { overflow-x: hidden !important; padding: 18px 0 50px 0 !important; min-height: 700px !important; }
          
          .chevron-wave-wrapper, .chevron-content-wrapper {
            position: absolute !important;
            left: 50% !important;
            top: 58% !important;
            transform: translate(-50%, -50%) !important;
            width: 100% !important;
            max-width: 420px !important;
          }

          .chevron-content-wrapper .relative.flex {
            width: 100% !important;
            max-width: 360px !important;
            margin: 0 auto !important;
            transform: none !important;
            padding: 0 12px !important;
            flex-direction: column !important;
          }

          .flex.items-center.gap-6.relative.z-10 {
            width: 100% !important;
            flex-direction: column !important;
            gap: 12px !important;
          }

          .icon-item {
            position: relative !important;
            width: 260px !important;
            height: 86px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .icon-item > svg, .icon-item > svg.absolute {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 80px !important;
            height: 80px !important;
          }

          .icon-item > .absolute {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 80px !important;
            height: 80px !important;
          }

          .icon-item > .absolute .icon-inner {
            width: 56px !important;
            height: 56px !important;
          }

          .label {
            position: absolute !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            font-size: 11px !important;
            padding: 6px 10px !important;
            max-width: 160px !important;
          }

          .icon-item:nth-child(odd) .label {
            left: calc(50% + 90px) !important;
            text-align: left !important;
          }

          .icon-item:nth-child(even) .label {
            right: calc(50% + 10px) !important;
            text-align: right !important;
          }

          .label-arrow { display: none !important; }
          .wave { display: none !important; }
          .semi-top, .semi-bottom { display: none !important; }
          .semi-left, .semi-right { display: block !important; }
          
          .containerCH h2 {
            font-size: clamp(1rem, 4.5vw, 1.25rem) !important;
            letter-spacing: 1px !important;
          }

          .label-multiline {
            display: inline-flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
        }

        @media (width: 768px) {
          .chevron-wave-wrapper, .chevron-content-wrapper {
            left: calc(50% + 38px) !important;
            top: calc(46% + 24px) !important;
          }
        }

        @media (width: 1024px) {
          #chevron-area .chevron-wave-wrapper, #chevron-area .chevron-content-wrapper {
            width: calc(100% - 64px) !important;
            max-width: 820px !important;
            transform: translate(-50%, -50%) translateX(110px) !important;
          }
          .chevron-root { min-height: 620px !important; }
        }
      `}</style>
    </div>
  );
}
