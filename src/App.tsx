import React, { useState, useEffect, useCallback } from 'react';
import { HardwareState, NeumorphicState, ViewMode } from './types';
import { HeaderNav } from './components/HeaderNav';
import { SkeuomorphicForge } from './components/SkeuomorphicForge';
import { NeumorphicPanel } from './components/NeumorphicPanel';
import { DesignDocViewer } from './components/DesignDocViewer';
import { TokenInspector } from './components/TokenInspector';
import { AnimationSpecsViewer } from './components/AnimationSpecsViewer';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [helpOpen, setHelpOpen] = useState(false);

  // Hardware Forge Dark Mode State
  const [hardwareState, setHardwareState] = useState<HardwareState>({
    power: true,
    sweep: false,
    backlight: false,
    value: 35,
    knobAngle: -40.5,
    wordIdx: 0,
  });

  // Neumorphic Light Mode State
  const [neumorphicState, setNeumorphicState] = useState<NeumorphicState>({
    count: 0,
    level: 35,
    autoIncrement: false,
  });

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();

      if (key === 'P') {
        e.preventDefault();
        setHardwareState(prev => ({
          ...prev,
          power: !prev.power,
          value: !prev.power ? 35 : 0,
        }));
      } else if (key === 'S') {
        e.preventDefault();
        setHardwareState(prev => (prev.power ? { ...prev, sweep: !prev.sweep } : prev));
      } else if (key === 'L') {
        e.preventDefault();
        setHardwareState(prev => ({ ...prev, backlight: !prev.backlight }));
      } else if (key === 'R') {
        e.preventDefault();
        setHardwareState(prev => ({
          ...prev,
          sweep: false,
          knobAngle: -135,
          value: 0,
        }));
      } else if (key === 'T') {
        e.preventDefault();
        setHardwareState(prev => (prev.power ? { ...prev, wordIdx: (prev.wordIdx + 1) % 4 } : prev));
      } else if (key === '1') {
        setViewMode('all');
      } else if (key === '2') {
        setViewMode('hardware-dark');
      } else if (key === '3') {
        setViewMode('neumorphic-light');
      } else if (key === '4') {
        setViewMode('docs');
      } else if (key === '5') {
        setViewMode('tokens');
      } else if (key === '6') {
        setViewMode('motion');
      } else if (e.key === '?') {
        e.preventDefault();
        setHelpOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Application Header */}
      <HeaderNav
        currentMode={viewMode}
        onSelectMode={setViewMode}
        powerOn={hardwareState.power}
        onOpenHelp={() => setHelpOpen(true)}
      />

      {/* Main Container Stage */}
      <main className="stage flex-1 w-full max-w-[1160px] mx-auto px-4 py-8" id="mainContainer">
        {/* VIEW 1: ALL / SIDE-BY-SIDE DASHBOARD SHOWCASE */}
        {viewMode === 'all' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Top Skeuomorphic Dark Forge Section */}
            <section aria-labelledby="dark-forge-heading">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                  <h2 id="dark-forge-heading" className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Estilo 01: Industrial Skeuomorphic Forge (Modo Escuro)
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {hardwareState.power ? 'SISTEMA OPERACIONAL' : 'STANDBY'} · {Math.round(hardwareState.value)} kPa
                </span>
              </div>
              <SkeuomorphicForge state={hardwareState} onChange={setHardwareState} />
            </section>

            {/* Bottom Neumorphic Light Section */}
            <section aria-labelledby="light-neu-heading">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
                  <h2 id="light-neu-heading" className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Estilo 02: Neumorphic Soft UI (Modo Claro)
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  NÍVEL {Math.round(neumorphicState.level)}% · CONTAGEM {neumorphicState.count}
                </span>
              </div>
              <NeumorphicPanel state={neumorphicState} onChange={setNeumorphicState} />
            </section>
          </div>
        )}

        {/* VIEW 2: HARDWARE FORGE ONLY */}
        {viewMode === 'hardware-dark' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#191b20] border border-[#2b2e37] rounded-xl p-4 flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                Visualização Focada: Industrial Skeuomorphic Forge (Dark)
              </span>
              <span className="text-slate-400">
                Atalhos: [P] Energia · [S] Varredura · [L] Luz · [T] Teste · [R] Reset
              </span>
            </div>
            <SkeuomorphicForge state={hardwareState} onChange={setHardwareState} />
          </div>
        )}

        {/* VIEW 3: NEUMORPHIC LIGHT ONLY */}
        {viewMode === 'neumorphic-light' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#191b20] border border-[#2b2e37] rounded-xl p-4 flex items-center justify-between text-xs font-mono">
              <span className="text-blue-400 font-bold uppercase tracking-wider">
                Visualização Focada: Neumorphic Soft UI (Light)
              </span>
              <span className="text-slate-400">
                Substrato neutro contínuo #e0e0e0 com sombreamento direcional a 315°
              </span>
            </div>
            <NeumorphicPanel state={neumorphicState} onChange={setNeumorphicState} />
          </div>
        )}

        {/* VIEW 4: DESIGN.MD DOCUMENT VIEWER */}
        {viewMode === 'docs' && (
          <div className="animate-in fade-in duration-300">
            <DesignDocViewer />
          </div>
        )}

        {/* VIEW 5: DESIGN TOKENS & CONTRAST ENGINE */}
        {viewMode === 'tokens' && (
          <div className="animate-in fade-in duration-300">
            <TokenInspector />
          </div>
        )}

        {/* VIEW 6: ANIMATION & PHYSICS MATRIX */}
        {viewMode === 'motion' && (
          <div className="animate-in fade-in duration-300">
            <AnimationSpecsViewer />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#202229] bg-[#0d0e11] py-6 px-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            SKEUOMORPHIC FORGE &amp; SOFT UI · MÓDULO 02: HARDWARE · ANIMAÇÕES · NEUMORFISMO
          </span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>WCAG 2.1 AA / AAA</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Atalhos de Teclado [?]
            </button>
          </div>
        </div>
      </footer>

      {/* Modal for Keyboard Shortcuts */}
      <KeyboardShortcutsModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
