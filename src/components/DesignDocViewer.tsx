import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { RAW_DESIGN_MD_CONTENT } from '../data/designSystemData';
import { Download, Copy, Check, Search, FileText, Bookmark } from 'lucide-react';

export const DesignDocViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(RAW_DESIGN_MD_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
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

  // Sections outline
  const sections = [
    { id: '1-executive-summary', title: '1. Executive Summary & Aesthetic Architecture' },
    { id: '2-color-palettes', title: '2. Color Palettes & Semantic Design Tokens' },
    { id: '3-typography', title: '3. Typography Architecture' },
    { id: '4-hardware-primitives', title: '4. Hardware Primitives & Material Physics' },
    { id: '5-neumorphic-elevation', title: '5. Neumorphic Elevation & Photometric Physics' },
    { id: '6-interactive-components', title: '6. Interactive Component Specifications' },
    { id: '7-master-motion', title: '7. Master Motion, Easing & Transition Timing' },
    { id: '8-accessibility', title: '8. Accessibility & Keyboard Navigation' },
    { id: '9-responsive-breakpoints', title: '9. Responsive Breakpoints & Adaptive Layout' },
    { id: '10-agent-implementation', title: '10. Agent Implementation Guide & CSS Recipes' },
  ];

  return (
    <div className="w-full bg-[#181a1f] border border-[#2e323b] rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="bg-[#20232a] border-b border-[#2e323b] p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-wider text-slate-100 uppercase">
                DESIGN.md Reference Specification
              </h2>
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                REV C
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-wide">
              Complete Dual-Aesthetic Architecture for Dashboard UI Development
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold font-mono uppercase bg-[#2a2d36] hover:bg-[#343844] text-slate-200 border border-[#3e4350] rounded-lg transition-colors cursor-pointer"
            title="Copiar markdown completo para a área de transferência"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar DESIGN.md'}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold font-mono uppercase bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors cursor-pointer shadow-lg shadow-amber-500/20"
            title="Baixar arquivo DESIGN.md"
          >
            <Download className="w-4 h-4" />
            Baixar .md
          </button>
        </div>
      </div>

      {/* Main Content Area: Sidebar TOC + Markdown Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
        {/* Table of Contents Sidebar */}
        <aside className="lg:col-span-1 border-r border-[#2a2d36] p-4 bg-[#141518]/70">
          <div className="sticky top-4">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              Índice de Seções
            </div>

            <div className="space-y-1 text-xs">
              {sections.map(sec => (
                <div
                  key={sec.id}
                  className="p-2 rounded-lg text-slate-300 hover:bg-[#252830] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                  <span className="truncate">{sec.title}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#2a2d36] text-[11px] text-slate-400 leading-relaxed font-mono">
              <span className="text-amber-400 font-bold">Arquivo raiz:</span>
              <br />
              <code>/DESIGN.md</code>
              <br />
              Pronto para importação por agentes e bibliotecas de estilo.
            </div>
          </div>
        </aside>

        {/* Formatted Markdown Content */}
        <div className="lg:col-span-3 p-6 sm:p-10 max-h-[850px] overflow-y-auto font-sans leading-relaxed text-slate-200">
          <div className="markdown-body prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-wide prose-headings:text-slate-100 prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-slate-700/60 prose-h2:pb-2 prose-h3:text-lg prose-table:w-full prose-table:text-xs prose-th:bg-slate-800/80 prose-th:p-2.5 prose-th:text-amber-300 prose-td:p-2.5 prose-td:border-b prose-td:border-slate-800 prose-code:font-mono prose-code:text-amber-300 prose-code:bg-slate-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
            <Markdown>{RAW_DESIGN_MD_CONTENT}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
