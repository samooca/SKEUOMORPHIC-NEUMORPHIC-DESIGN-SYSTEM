import React, { useEffect, useState } from 'react';
import { NeumorphicState } from '../types';

interface Props {
  state: NeumorphicState;
  onChange: (updater: (prev: NeumorphicState) => NeumorphicState) => void;
}

export const NeumorphicPanel: React.FC<Props> = ({ state, onChange }) => {
  const { count, level, autoIncrement } = state;
  const [bigPressed, setBigPressed] = useState(false);

  // Auto increment timer
  useEffect(() => {
    if (!autoIncrement) return;
    const interval = setInterval(() => {
      onChange(prev => ({
        ...prev,
        level: (prev.level + 1) % 101,
      }));
    }, 110);
    return () => clearInterval(interval);
  }, [autoIncrement, onChange]);

  const handleBigClick = () => {
    onChange(prev => ({ ...prev, count: prev.count + 1 }));
    setBigPressed(true);
    setTimeout(() => setBigPressed(false), 140);
  };

  const handleMinus = () => {
    onChange(prev => ({ ...prev, level: Math.max(0, prev.level - 5) }));
  };

  const handlePlus = () => {
    onChange(prev => ({ ...prev, level: Math.min(100, prev.level + 5) }));
  };

  return (
    <section className="neu-section w-full" id="neuSection" aria-label="Demonstração de Neumorfismo e Soft UI">
      {/* Header */}
      <div className="neu-head">
        <h2>
          Neumorfismo <span>· Soft UI</span>
        </h2>
        <p>Fundo em tom médio, sombras duplas, sem bordas — a profundidade vem da luz.</p>
      </div>

      {/* Neumorphic Grid */}
      <div className="neu-grid">
        {/* Card 1: Big Press & Count */}
        <div className="neu-card" id="neuCardCounter">
          <button
            type="button"
            className={`neu-big ${bigPressed ? 'pressed' : ''}`}
            id="neuBig"
            onClick={handleBigClick}
            onPointerDown={() => setBigPressed(true)}
            onPointerUp={() => setBigPressed(false)}
            onPointerLeave={() => setBigPressed(false)}
            aria-label="Botão Neumórfico Central - Pressione para Contar"
            title="Clique ou pressione Enter/Espaço para incrementar contador"
          >
            {count}
          </button>
          <span className="engraved">Pressione &amp; conte</span>
        </div>

        {/* Card 2: Recessed Level Display & Mini Buttons */}
        <div className="neu-card" id="neuCardLevel">
          <div className="neu-display" role="meter" aria-label="Nível de Fluido" aria-valuenow={Math.round(level)} aria-valuemin={0} aria-valuemax={100}>
            <div className="neu-value" id="neuValue">
              {String(Math.round(level)).padStart(2, '0')}
            </div>
            <div className="neu-track">
              <div
                className="neu-fill"
                id="neuFill"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>

          <div className="neu-mini-btns">
            <button
              type="button"
              className="neu-round"
              id="neuMinus"
              onClick={handleMinus}
              aria-label="Diminuir nível em 5%"
              title="Diminuir 5%"
            >
              −
            </button>
            <button
              type="button"
              className="neu-round"
              id="neuPlus"
              onClick={handlePlus}
              aria-label="Aumentar nível em 5%"
              title="Aumentar 5%"
            >
              +
            </button>
          </div>
          <span className="engraved">Nível</span>
        </div>

        {/* Card 3: Neumorphic Toggle & Auto Loop */}
        <div className="neu-card" id="neuCardToggle">
          <label className="neu-toggle" id="neuToggleLabel">
            <input
              type="checkbox"
              id="neuAuto"
              checked={autoIncrement}
              onChange={e => {
                onChange(prev => ({ ...prev, autoIncrement: e.target.checked }));
              }}
              role="switch"
              aria-checked={autoIncrement}
              aria-label="Incremento Automático"
            />
            <div className="neu-ttrack">
              <div className="neu-tthumb" />
            </div>
          </label>

          <div className="neu-status" id="neuStatus" aria-live="polite">
            {autoIncrement ? 'RODANDO' : 'PARADO'}
          </div>
          <span className="engraved">Incremento automático</span>
        </div>

        {/* Accessibility & Design Note */}
        <div className="neu-note" id="neuNote">
          <b>Quando NÃO usar Neumorfismo</b>
          <br />
          Fundos <span style={{ fontFamily: "'Share Tech Mono', monospace" }}>#fff</span> ou{' '}
          <span style={{ fontFamily: "'Share Tech Mono', monospace" }}>#000</span> · interfaces com muito texto (baixo contraste) · elementos menores que 24px · requisitos de altíssimo contraste WCAG AAA para leitura densa.
        </div>
      </div>
    </section>
  );
};
