import React from 'react';
import { ViewMode } from '../types';
import { Cpu, Sun, Layers, FileText, Palette, Activity, HelpCircle, Download } from 'lucide-react';
import { RAW_DESIGN_MD_CONTENT } from '../data/designSystemData';

interface Props {
  currentMode: ViewMode;
  onSelectMode: (mode: ViewMode) => void;
  powerOn: boolean;
  onOpenHelp: () => void;
}

export const HeaderNav: React.FC<Props> = ({ currentMode, onSelectMode, powerOn, onOpenHelp }) => {
  const handleDownloadMd = () => {
    const blob = new Blob([RAW_DESIGN_MD_CONTENT], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DESIGN.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs: { id: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'all', label: 'Visão Completa', icon: <Layers className="w-4 h-4" /> },
    { id: 'hardware-dark', label: 'Forge (Dark)', icon: <Cpu className="w-4 h-4" /> },
    { id: 'neumorphic-light', label: 'Soft UI (Light)', icon: <Sun className="w-4 h-4" /> },
    { id: 'docs', label: 'DESIGN.md', icon: <FileText className="w-4 h-4" />, badge: 'SPEC' },
    { id: 'tokens', label: 'Tokens & WCAG', icon: <Palette className="w-4 h-4" /> },
    { id: 'motion', label: 'Física & Movimento', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <nav className="w-full bg-[#131418]/90 backdrop-blur-md border-b border-[#252830] sticky top-0 z-40 px-4 py-3">
      <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b3f46] to-[#1c1e22] border border-[#444] shadow-md">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                powerOn
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  : 'bg-slate-600'
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-widest text-slate-100 text-sm uppercase">
                Skeuomorphic Forge
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                MOD-02
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider block">
              DESIGN SYSTEM &amp; DASHBOARD SPEC
            </span>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="flex items-center bg-[#181a20] p-1 rounded-xl border border-[#2b2f38] overflow-x-auto text-xs font-mono">
          {tabs.map(tab => {
            const isActive = currentMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectMode(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-100'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-[#20232a]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                      isActive ? 'bg-black/30 text-slate-900' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadMd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22252e] hover:bg-[#2c303c] border border-[#373c48] text-xs font-mono text-slate-200 transition-colors cursor-pointer"
            title="Baixar arquivo DESIGN.md diretamente"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">DESIGN.md</span>
          </button>

          <button
            type="button"
            onClick={onOpenHelp}
            className="p-2 rounded-lg bg-[#22252e] hover:bg-[#2c303c] border border-[#373c48] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
            title="Guia de Atalhos de Teclado [?]"
            aria-label="Atalhos de Teclado"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};
