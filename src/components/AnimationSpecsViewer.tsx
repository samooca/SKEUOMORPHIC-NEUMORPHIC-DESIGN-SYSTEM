import React, { useState } from 'react';
import { ANIMATION_SPECS } from '../data/designSystemData';
import { Play, Sparkles, Activity, Clock } from 'lucide-react';

export const AnimationSpecsViewer: React.FC = () => {
  const [activeAnim, setActiveAnim] = useState<string | null>(null);

  const triggerAnimation = (name: string) => {
    setActiveAnim(null);
    requestAnimationFrame(() => {
      setActiveAnim(name);
    });
  };

  return (
    <div className="w-full bg-[#181a1f] border border-[#2e323b] rounded-2xl overflow-hidden shadow-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#2e323b] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wider text-slate-100 uppercase">
              Motor de Física &amp; Especificações de Animação
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Curvas de Easing, Duração e Comportamento Mecânico Calibrado
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Animation Specs with Live Test Harness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ANIMATION_SPECS.map((spec, i) => {
          const isTriggered = activeAnim === spec.name;

          return (
            <div
              key={i}
              className="bg-[#1e2128] border border-[#2d313b] rounded-xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <h3 className="font-bold text-slate-100 text-sm tracking-wide">{spec.name}</h3>
                  </div>

                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {spec.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">{spec.description}</p>

                <div className="bg-[#141518] p-3 rounded-lg border border-[#2a2e38] font-mono text-[11px] space-y-1 mb-4">
                  <div className="text-slate-400">
                    Curva: <span className="text-amber-300 font-bold">{spec.curveName}</span>
                  </div>
                  <div className="text-slate-400">
                    Cubic Bezier: <span className="text-slate-200">{spec.cubicBezier}</span>
                  </div>
                  <div className="text-slate-400">
                    Alvo CSS: <span className="text-slate-300">{spec.targetComponent}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer Track */}
              <div className="pt-3 border-t border-[#2a2e38]">
                <div className="w-full h-10 bg-[#121316] rounded-lg border border-[#2a2d36] p-1 flex items-center relative overflow-hidden mb-3">
                  <div
                    className={`h-7 px-3 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all shadow-md ${
                      isTriggered
                        ? 'bg-amber-400 text-slate-950 translate-x-32 scale-105'
                        : 'bg-slate-700 text-slate-300 translate-x-0 scale-100'
                    }`}
                    style={{
                      transitionDuration: spec.duration,
                      transitionTimingFunction: spec.cubicBezier.includes('cubic-bezier') ? spec.cubicBezier : 'ease',
                    }}
                  >
                    {isTriggered ? 'PLAYING' : 'READY'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => triggerAnimation(spec.name)}
                  className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-mono font-bold uppercase bg-[#2a2d36] hover:bg-[#343844] text-amber-300 border border-[#3e4350] transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Testar Animação ({spec.duration})
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
