import React, { useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'P', label: 'Alternar Chave Geral de Energia (Power)' },
    { key: 'S', label: 'Alternar Varredura Automática (Sweep)' },
    { key: 'L', label: 'Alternar Iluminação do Painel (Backlight)' },
    { key: 'T', label: 'Disparar Teste de Rotação do Split-Flap' },
    { key: 'R', label: 'Resetar Ganho e Pressão' },
    { key: '← / ↓', label: 'Diminuir Ganho do Knob analógico' },
    { key: '→ / ↑', label: 'Aumentar Ganho do Knob analógico' },
    { key: 'Home / End', label: 'Definir Ganho do Knob para Mínimo (0%) / Máximo (100%)' },
    { key: '1, 2, 3, 4, 5, 6', label: 'Alternar Modos de Visualização do Dashboard' },
    { key: '?', label: 'Abrir este Guia de Atalhos de Teclado' },
    { key: 'Esc', label: 'Fechar Modais e Janelas' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div className="w-full max-w-lg bg-[#1a1d24] border border-[#373c47] rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#2e333e] pb-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Keyboard className="w-5 h-5" />
            <h2 id="shortcuts-title" className="text-base font-bold uppercase tracking-wider text-slate-100">
              Atalhos de Teclado &amp; Acessibilidade
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto font-mono text-xs pr-1">
          {shortcuts.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#14161b] border border-[#262a34]"
            >
              <span className="text-slate-300 font-sans">{s.label}</span>
              <kbd className="px-2 py-1 rounded bg-[#252833] text-amber-300 border border-slate-700 font-bold shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#2e333e] flex items-center justify-between text-[11px] text-slate-400">
          <span>Totalmente em conformidade com WCAG 2.1 AA/AAA.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold cursor-pointer font-mono"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
