import React, { useState } from 'react';
import { COLOR_TOKENS, TYPOGRAPHY_TOKENS, BREAKPOINTS } from '../data/designSystemData';
import { Palette, Type, CheckCircle, AlertCircle, Copy, Check, Smartphone, Monitor } from 'lucide-react';

// Helper for WCAG relative luminance and contrast calculation
function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export const TokenInspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'colors' | 'contrast' | 'typography' | 'breakpoints'>('colors');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Custom contrast calculator inputs
  const [fgColor, setFgColor] = useState('#ffb84d');
  const [bgColor, setBgColor] = useState('#101510');

  const customRatio = getContrast(fgColor, bgColor);
  const passAANormal = customRatio >= 4.5;
  const passAALarge = customRatio >= 3.0;
  const passAAANormal = customRatio >= 7.0;
  const passAAALarge = customRatio >= 4.5;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const filteredTokens = selectedCategory === 'all'
    ? COLOR_TOKENS
    : COLOR_TOKENS.filter(t => t.category.startsWith(selectedCategory));

  return (
    <div className="w-full bg-[#181a1f] border border-[#2e323b] rounded-2xl overflow-hidden shadow-2xl">
      {/* Sub-nav tabs */}
      <div className="bg-[#20232a] border-b border-[#2e323b] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold tracking-wider text-slate-100 uppercase">
            Design Tokens &amp; Contrast Engine
          </h2>
        </div>

        <div className="flex items-center bg-[#141518] p-1 rounded-xl border border-[#2e323b] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'colors' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Paleta de Cores
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contrast')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'contrast' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Calculadora WCAG
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('typography')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'typography' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tipografia
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('breakpoints')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
              activeTab === 'breakpoints' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Breakpoints
          </button>
        </div>
      </div>

      {/* Tab 1: Color Tokens */}
      {activeTab === 'colors' && (
        <div className="p-6">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              { id: 'all', label: 'Todos os Tokens' },
              { id: 'dark', label: 'Forge (Dark)' },
              { id: 'light', label: 'Neumorphism (Light)' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-lg border transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                    : 'bg-[#20232a] text-slate-400 border-[#2e323b] hover:border-slate-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Color Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTokens.map(token => (
              <div
                key={token.id}
                className="bg-[#1e2128] border border-[#2d313b] rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-colors group"
              >
                <div>
                  {/* Swatch */}
                  <div
                    className="w-full h-16 rounded-lg mb-3 border border-black/30 shadow-inner flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-[1.02]"
                    style={{
                      backgroundColor: token.hex,
                      color: token.hex === '#ffffff' || token.hex === '#e0e0e0' ? '#111' : '#fff',
                    }}
                  >
                    {token.hex}
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 tracking-wide">{token.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{token.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2a2e38] flex items-center justify-between text-[11px] font-mono">
                  <div className="text-slate-400">
                    RGB: <span className="text-slate-200">{token.rgb}</span>
                  </div>

                  {token.wcagRating && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        token.wcagRating === 'AAA'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : token.wcagRating.startsWith('AA')
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {token.wcagRating} ({token.contrastRatio}:1)
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopy(token.hex, token.id)}
                    className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition-colors"
                    title="Copiar HEX"
                  >
                    {copiedToken === token.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Contrast Checker */}
      {activeTab === 'contrast' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Selectors & Live Preview */}
            <div className="space-y-4 bg-[#1e2128] border border-[#2d313b] rounded-xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                Amostrador de Cores &amp; Teste WCAG
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Texto (Foreground)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={e => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded border border-[#3e4350] bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={e => setFgColor(e.target.value)}
                      className="w-full bg-[#141518] border border-[#3e4350] px-3 py-2 text-xs font-mono rounded text-slate-200 uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Fundo (Background)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded border border-[#3e4350] bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={e => setBgColor(e.target.value)}
                      className="w-full bg-[#141518] border border-[#3e4350] px-3 py-2 text-xs font-mono rounded text-slate-200 uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2">
                <div className="text-xs text-slate-400 mb-2 font-mono">Predefinições do Sistema:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => { setFgColor('#ffb84d'); setBgColor('#101510'); }}
                    className="px-2.5 py-1 text-xs font-mono bg-[#282b34] hover:bg-[#343844] rounded border border-slate-700 text-amber-300 cursor-pointer"
                  >
                    Amber LCD (#ffb84d / #101510)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFgColor('#ecd9a0'); setBgColor('#191b20'); }}
                    className="px-2.5 py-1 text-xs font-mono bg-[#282b34] hover:bg-[#343844] rounded border border-slate-700 text-amber-100 cursor-pointer"
                  >
                    Split-Flap (#ecd9a0 / #191b20)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFgColor('#5c5c5c'); setBgColor('#e0e0e0'); }}
                    className="px-2.5 py-1 text-xs font-mono bg-[#282b34] hover:bg-[#343844] rounded border border-slate-700 text-slate-300 cursor-pointer"
                  >
                    Neumorphic Body (#5c5c5c / #e0e0e0)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFgColor('#8b9097'); setBgColor('#2b2e33'); }}
                    className="px-2.5 py-1 text-xs font-mono bg-[#282b34] hover:bg-[#343844] rounded border border-slate-700 text-slate-300 cursor-pointer"
                  >
                    Chassis Engraved (#8b9097 / #2b2e33)
                  </button>
                </div>
              </div>

              {/* Live Preview Box */}
              <div
                className="w-full p-6 rounded-xl border border-black/20 text-center transition-colors"
                style={{ backgroundColor: bgColor, color: fgColor }}
              >
                <div className="text-2xl font-bold tracking-wider" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  SKEUOMORPHIC &amp; NEUMORPHIC UI
                </div>
                <div className="text-sm mt-1 font-mono">
                  Share Tech Mono: 048 kPa · Telemetria Ativa
                </div>
              </div>
            </div>

            {/* Scoreboard & WCAG 2.1 Pass/Fail Cards */}
            <div className="space-y-4 bg-[#1e2128] border border-[#2d313b] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2">
                  Taxa de Contraste Calculada
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-mono font-bold text-amber-400">
                    {customRatio.toFixed(2)} : 1
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    (L1 + 0.05) / (L2 + 0.05)
                  </span>
                </div>
              </div>

              {/* Conformance Cards */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className={`p-3 rounded-lg border flex items-center justify-between ${
                  passAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div>
                    <div className="font-bold">WCAG AA Normal</div>
                    <div className="text-[10px] text-slate-400">Mínimo 4.5:1</div>
                  </div>
                  {passAANormal ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                </div>

                <div className={`p-3 rounded-lg border flex items-center justify-between ${
                  passAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div>
                    <div className="font-bold">WCAG AA Grande</div>
                    <div className="text-[10px] text-slate-400">Mínimo 3.0:1 (&gt;18pt)</div>
                  </div>
                  {passAALarge ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                </div>

                <div className={`p-3 rounded-lg border flex items-center justify-between ${
                  passAAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div>
                    <div className="font-bold">WCAG AAA Normal</div>
                    <div className="text-[10px] text-slate-400">Mínimo 7.0:1</div>
                  </div>
                  {passAAANormal ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                </div>

                <div className={`p-3 rounded-lg border flex items-center justify-between ${
                  passAAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}>
                  <div>
                    <div className="font-bold">WCAG AAA Grande</div>
                    <div className="text-[10px] text-slate-400">Mínimo 4.5:1 (&gt;18pt)</div>
                  </div>
                  {passAAALarge ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Typography */}
      {activeTab === 'typography' && (
        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-400 font-mono mb-2">
            Fontes carregadas: <strong>Rajdhani</strong> (Google Fonts 500, 600, 700) e <strong>Share Tech Mono</strong> (400).
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#2d313b] rounded-xl overflow-hidden font-mono">
              <thead className="bg-[#20232a] text-amber-300 border-b border-[#2d313b]">
                <tr>
                  <th className="p-3">Papel / Elemento</th>
                  <th className="p-3">Família &amp; Peso</th>
                  <th className="p-3">Tamanho &amp; Tracking</th>
                  <th className="p-3">Transform</th>
                  <th className="p-3">Amostra Renderizada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d313b] bg-[#181a1f]">
                {TYPOGRAPHY_TOKENS.map((t, i) => (
                  <tr key={i} className="hover:bg-[#1f222a] transition-colors">
                    <td className="p-3 font-bold text-slate-200">{t.role}</td>
                    <td className="p-3 text-slate-400">
                      {t.fontFamily}
                      <br />
                      <span className="text-amber-400/80">{t.fontWeight}</span>
                    </td>
                    <td className="p-3 text-slate-400">
                      {t.fontSize}
                      <br />
                      Tracking: {t.tracking}
                    </td>
                    <td className="p-3 text-slate-400">{t.textTransform}</td>
                    <td className="p-3">
                      <div
                        className="text-slate-100 px-3 py-1.5 rounded bg-black/40 border border-slate-800"
                        style={{
                          fontFamily: t.fontFamily,
                          letterSpacing: t.tracking,
                          textTransform: t.textTransform as any,
                        }}
                      >
                        {t.sampleText}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Breakpoints */}
      {activeTab === 'breakpoints' && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {BREAKPOINTS.map((bp, i) => (
            <div
              key={i}
              className="bg-[#1e2128] border border-[#2d313b] rounded-xl p-5 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {bp.width.includes('<') ? (
                    <Smartphone className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Monitor className="w-4 h-4 text-amber-400" />
                  )}
                  <h3 className="font-bold text-slate-100 text-sm tracking-wide">{bp.name}</h3>
                </div>
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {bp.width}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 mb-3 bg-[#141518] px-2.5 py-1 rounded border border-[#2c303a]">
                {bp.query}
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">{bp.description}</p>

              <div className="space-y-1 text-xs">
                {bp.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-2 text-slate-400">
                    <span className="text-amber-400 text-sm leading-none">•</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
