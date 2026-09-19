import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HardwareState } from '../types';

interface Props {
  state: HardwareState;
  onChange: (updater: (prev: HardwareState) => HardwareState) => void;
  onSnap?: (target: 'flip' | 'knob') => void;
}

const WORDS = [' FORGE', 'PRONTO', 'FORJAR', 'ATIVO!'];
const CELLS_COUNT = 6;

export const SkeuomorphicForge: React.FC<Props> = ({ state, onChange }) => {
  const { power, sweep, backlight, value, knobAngle, wordIdx } = state;

  // Local state for split-flap cards
  const [cells, setCells] = useState<{ char: string; flipping: boolean }[]>(
    () => Array.from({ length: CELLS_COUNT }, () => ({ char: ' ', flipping: false }))
  );

  // Snap animation triggers
  const [snapFlip, setSnapFlip] = useState(false);
  const [snapKnob, setSnapKnob] = useState(false);

  // Knob dragging reference
  const knobRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // COM LED random telemetry blink
  const [comLedOn, setComLedOn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setComLedOn(power && Math.random() > 0.45);
    }, 420);
    return () => clearInterval(timer);
  }, [power]);

  // Sine-wave sweep tick
  useEffect(() => {
    if (!sweep || !power) return;
    const interval = setInterval(() => {
      const t = performance.now() / 950;
      const nextVal = (Math.sin(t) * 0.5 + 0.5) * 100;
      const nextAngle = -135 + (nextVal / 100) * 270;
      onChange(prev => ({
        ...prev,
        value: nextVal,
        knobAngle: nextAngle,
      }));
    }, 100);
    return () => clearInterval(interval);
  }, [sweep, power, onChange]);

  // Auto cycle words when power is on
  useEffect(() => {
    if (!power) {
      // blank cells when off
      setCells(Array.from({ length: CELLS_COUNT }, () => ({ char: ' ', flipping: false })));
      return;
    }

    const currentWord = WORDS[wordIdx] || ' FORGE';
    // Flip to current word with cascade
    for (let i = 0; i < CELLS_COUNT; i++) {
      const targetChar = currentWord[i] || ' ';
      const delay = i * 70;
      setTimeout(() => {
        setCells(prev => {
          const next = [...prev];
          if (next[i].char !== targetChar) {
            next[i] = { char: targetChar, flipping: true };
          }
          return next;
        });

        setTimeout(() => {
          setCells(prev => {
            const next = [...prev];
            next[i] = { ...next[i], flipping: false };
            return next;
          });
        }, 330);
      }, delay);
    }
  }, [power, wordIdx]);

  // Advance word
  const nextWord = useCallback(() => {
    if (!power) return;
    onChange(prev => ({
      ...prev,
      wordIdx: (prev.wordIdx + 1) % WORDS.length,
    }));
  }, [power, onChange]);

  // Snap trigger helpers
  const triggerSnapFlip = () => {
    setSnapFlip(false);
    requestAnimationFrame(() => setSnapFlip(true));
    setTimeout(() => setSnapFlip(false), 400);
  };

  const triggerSnapKnob = () => {
    setSnapKnob(false);
    requestAnimationFrame(() => setSnapKnob(true));
    setTimeout(() => setSnapKnob(false), 400);
  };

  // Knob interaction
  const handleKnobPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleKnobDrag(e);
  };

  const handleKnobDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !knobRef.current) return;
    const rect = knobRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let ang = (Math.atan2(e.clientX - cx, -(e.clientY - cy)) * 180) / Math.PI;

    if (ang > 135) ang = 135;
    if (ang < -135) ang = -135;

    const val = ((ang + 135) / 270) * 100;
    onChange(prev => ({
      ...prev,
      sweep: false,
      knobAngle: ang,
      value: val,
    }));
  };

  const handleKnobPointerUp = () => {
    isDraggingRef.current = false;
  };

  // Keyboard accessibility for knob
  const handleKnobKeyDown = (e: React.KeyboardEvent) => {
    let delta = 0;
    const step = e.shiftKey ? 5 : 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') delta = step;
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') delta = -step;
    else if (e.key === 'PageUp') delta = 10;
    else if (e.key === 'PageDown') delta = -10;
    else if (e.key === 'Home') {
      e.preventDefault();
      onChange(prev => ({ ...prev, sweep: false, value: 0, knobAngle: -135 }));
      return;
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(prev => ({ ...prev, sweep: false, value: 100, knobAngle: 135 }));
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      onChange(prev => {
        const nextVal = Math.min(100, Math.max(0, prev.value + delta));
        const nextAngle = -135 + (nextVal / 100) * 270;
        return {
          ...prev,
          sweep: false,
          value: nextVal,
          knobAngle: nextAngle,
        };
      });
    }
  };

  // Power switch toggle
  const togglePower = () => {
    onChange(prev => {
      const nextPower = !prev.power;
      if (!nextPower) {
        return {
          ...prev,
          power: false,
          sweep: false,
          value: 0,
        };
      } else {
        // Self-test sequence
        return {
          ...prev,
          power: true,
          value: 100,
        };
      }
    });

    // If powering on, settle value after 800ms
    if (!power) {
      setTimeout(() => {
        onChange(prev => ({ ...prev, value: 35 }));
      }, 850);
    }
  };

  // Needle angle calculation
  const needleDeg = power ? -100 + (value / 100) * 200 : -100;
  const isAlarm = power && value > 85;

  return (
    <div className="w-full">
      {/* ======= HEADER PLATE ======= */}
      <header className="panel plate" id="headerPlate">
        <span className="screw" style={{ left: '14px', top: '50%', marginTop: '-5px', ['--screw-angle' as any]: '12deg' }} />
        <span className="screw" style={{ right: '14px', top: '50%', marginTop: '-5px', ['--screw-angle' as any]: '74deg' }} />
        <span className="rivet rivet-left" style={{ left: '24%', top: '50%', transform: 'translateY(-50%)' }} />
        <span className="rivet rivet-right" style={{ right: '24%', top: '50%', transform: 'translateY(-50%)' }} />

        <div className="plate-title">
          <h1 id="panelTitle">SKEUOMORPHIC FORGE</h1>
          <p>Painel de Demonstração · Hardware, Animações &amp; Neumorfismo</p>
        </div>

        <span className="plate-tag" id="plateTag">MOD-02 · REV C</span>
      </header>

      {/* ======= MAIN HARDWARE PANEL ======= */}
      <section
        className={`panel main-panel ${backlight ? 'backlight' : ''}`}
        id="mainPanel"
        aria-label="Console de Instrumentação Industrial"
      >
        {/* Structural Hinges */}
        <span className="hinge" style={{ top: '-7px', left: '16%' }} />
        <span className="hinge" style={{ top: '-7px', right: '16%' }} />

        {/* 6 Structural Perimeter Screws */}
        <span className="screw" style={{ top: '12px', left: '12px', ['--screw-angle' as any]: '24deg' }} />
        <span className="screw" style={{ top: '12px', right: '12px', ['--screw-angle' as any]: '-48deg' }} />
        <span className="screw" style={{ bottom: '12px', left: '12px', ['--screw-angle' as any]: '66deg' }} />
        <span className="screw" style={{ bottom: '12px', right: '12px', ['--screw-angle' as any]: '-15deg' }} />
        <span className="screw" style={{ top: '12px', left: '50%', marginLeft: '-5px', ['--screw-angle' as any]: '41deg' }} />
        <span className="screw" style={{ bottom: '12px', left: '50%', marginLeft: '-5px', ['--screw-angle' as any]: '-72deg' }} />

        <div className="panel-grid">
          {/* ---- Column 1: Analog Gauge & LCD ---- */}
          <div className="gauge-block" id="gaugeBlock">
            <div className="bezel gauge-bezel">
              <div
                className="gauge-dial"
                id="gaugeDial"
                role="meter"
                aria-label="Manômetro de Pressão da Linha"
                aria-valuenow={power ? Math.round(value) : 0}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {/* 21 Dial Ticks */}
                <div style={{ position: 'absolute', inset: 0 }}>
                  {Array.from({ length: 21 }).map((_, ti) => (
                    <div
                      key={ti}
                      className={`tick ${ti % 5 === 0 ? 'major' : ''}`}
                      style={{ transform: `rotate(${-100 + ti * 10}deg)` }}
                    />
                  ))}
                </div>

                <span className="gauge-min">0</span>
                <span className="gauge-max">100</span>
                <span className="gauge-name engraved">PRESSÃO · kPa</span>

                {/* Pivot Needle */}
                <div
                  className="needle"
                  id="needle"
                  style={{ transform: `rotate(${needleDeg}deg)` }}
                />
                <div className="needle-cap" />
              </div>
            </div>

            {/* Amber LCD Segment Screen */}
            <div className="lcd" id="lcd" aria-live="polite">
              {power ? String(Math.round(value)).padStart(3, '0') : '---'}
            </div>
            <span className="engraved">MANÔMETRO DA LINHA</span>
          </div>

          {/* ---- Column 2: Controls Cluster (LEDs, Toggles, Buttons, Emergency Power) ---- */}
          <div className="col-mid">
            {/* LED Status Indicator Bank */}
            <div className="led-row" role="status" aria-label="Indicadores de Estado">
              <div className="led-unit">
                <div className="led-bezel">
                  <div className={`led green ${power ? 'on' : ''}`} id="ledPwr" />
                </div>
                <span className="engraved">PWR</span>
              </div>

              <div className="led-unit">
                <div className="led-bezel">
                  <div className={`led amber pulse ${power ? 'on' : ''}`} id="ledSys" />
                </div>
                <span className="engraved">SYS</span>
              </div>

              <div className="led-unit">
                <div className="led-bezel">
                  <div className={`led blue ${comLedOn ? 'on' : ''}`} id="ledNet" />
                </div>
                <span className="engraved">COM</span>
              </div>

              <div className="led-unit">
                <div className="led-bezel">
                  <div className={`led red ${isAlarm ? 'on' : ''}`} id="ledAlm" />
                </div>
                <span className="engraved">ALM</span>
              </div>
            </div>

            {/* Industrial Hardware Toggles */}
            <div className="toggle-row">
              <label className="hw-toggle" id="labelToggleSweep" title="Ativar Varredura Automática [S]">
                <input
                  type="checkbox"
                  id="toggleSweep"
                  checked={sweep}
                  disabled={!power}
                  onChange={e => {
                    if (!power) return;
                    onChange(prev => ({ ...prev, sweep: e.target.checked }));
                  }}
                  role="switch"
                  aria-checked={sweep}
                  aria-label="Varredura Automática"
                />
                <div className="toggle-track">
                  <div className="toggle-thumb" />
                </div>
                <span className="engraved">Varredura</span>
              </label>

              <label className="hw-toggle" id="labelToggleLight" title="Alternar Iluminação do Painel [L]">
                <input
                  type="checkbox"
                  id="toggleLight"
                  checked={backlight}
                  onChange={e => {
                    onChange(prev => ({ ...prev, backlight: e.target.checked }));
                  }}
                  role="switch"
                  aria-checked={backlight}
                  aria-label="Iluminação de Fundo"
                />
                <div className="toggle-track">
                  <div className="toggle-thumb" />
                </div>
                <span className="engraved">Iluminação</span>
              </label>
            </div>

            {/* Tactile Hardware Buttons */}
            <div className="btn-row">
              <button
                type="button"
                className="hw-btn"
                id="btnTest"
                onClick={() => {
                  nextWord();
                  triggerSnapFlip();
                }}
                aria-label="Executar Teste de Split-Flap [T]"
                title="Avançar Mensagem [T]"
              >
                TESTE
              </button>

              <button
                type="button"
                className="hw-btn"
                id="btnReset"
                onClick={() => {
                  onChange(prev => ({
                    ...prev,
                    sweep: false,
                    knobAngle: -135,
                    value: 0,
                  }));
                  triggerSnapKnob();
                }}
                aria-label="Resetar Instrumento [R]"
                title="Resetar Ganho e Pressão [R]"
              >
                RESET
              </button>
            </div>

            {/* Emergency Power Button Cluster */}
            <div className="power-cluster">
              <button
                type="button"
                className={`power-btn ${power ? 'on' : ''}`}
                id="powerBtn"
                onClick={togglePower}
                aria-label={power ? 'Desligar Barramento Principal' : 'Ligar Barramento Principal'}
                aria-pressed={power}
                title="Chave Geral de Energia [P]"
              >
                <span className="pico" />
              </button>
              <span className="engraved">Energia</span>
            </div>
          </div>

          {/* ---- Column 3: Rotary Knob & Mechanical Split-Flap Board ---- */}
          <div className="flex flex-col items-center">
            {/* Knurled Rotary Knob */}
            <div className="knob-block">
              <div
                className={`bezel knob-bezel ${snapKnob ? 'snap' : ''}`}
                id="knobBezel"
              >
                <div
                  ref={knobRef}
                  className="knob"
                  id="knob"
                  role="slider"
                  aria-label="Controle de Ganho Analógico"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(value)}
                  tabIndex={0}
                  style={{ transform: `rotate(${knobAngle}deg)` }}
                  onPointerDown={handleKnobPointerDown}
                  onPointerMove={handleKnobDrag}
                  onPointerUp={handleKnobPointerUp}
                  onPointerCancel={handleKnobPointerUp}
                  onKeyDown={handleKnobKeyDown}
                  title="Arraste ou use teclas direcionais (Setas / Home / End)"
                >
                  <div className="knob-cap" />
                </div>
              </div>
              <span className="engraved">GANHO</span>
              <span className="hint">arraste para girar</span>
            </div>

            {/* Mechanical Split-Flap Sub-Panel (4 screws) */}
            <div
              className={`panel flip-panel cursor-pointer select-none ${snapFlip ? 'snap' : ''}`}
              onClick={nextWord}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  nextWord();
                  triggerSnapFlip();
                }
              }}
              aria-label="Painel Mecânico Split-Flap (Pressione para avançar)"
              title="Clique para ciclar palavras no Split-Flap"
            >
              <span className="screw" style={{ top: '7px', left: '7px', ['--screw-angle' as any]: '52deg' }} />
              <span className="screw" style={{ top: '7px', right: '7px', ['--screw-angle' as any]: '-30deg' }} />
              <span className="screw" style={{ bottom: '7px', left: '7px', ['--screw-angle' as any]: '8deg' }} />
              <span className="screw" style={{ bottom: '7px', right: '7px', ['--screw-angle' as any]: '-63deg' }} />

              <div className={`flip-board ${!power ? 'off' : ''}`} id="flipBoard">
                {cells.map((cell, idx) => (
                  <div key={idx} className="flip-cell">
                    <div className={`flip-inner ${cell.flipping ? 'flipping' : ''}`}>
                      <div className="flip-face flip-front">{cell.char}</div>
                      <div className="flip-face flip-back">{cell.char}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lower Cooling Vent Strip (2 screws) */}
        <div className="panel vent-strip" id="ventStrip" aria-hidden="true">
          <span className="screw" style={{ left: '16px', top: '50%', marginTop: '-5px', ['--screw-angle' as any]: '33deg' }} />
          <span className="screw" style={{ right: '16px', top: '50%', marginTop: '-5px', ['--screw-angle' as any]: '-57deg' }} />
          {Array.from({ length: 6 }).map((_, vi) => (
            <div key={vi} className="vent-slat" />
          ))}
        </div>
      </section>
    </div>
  );
};
