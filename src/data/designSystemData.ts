import { ColorToken, TypographyToken, AnimationSpec, BreakpointSpec } from '../types';

export const COLOR_TOKENS: ColorToken[] = [
  // Dark Hardware Palette
  {
    id: 'stage-base',
    name: 'Stage Base Canvas',
    category: 'dark-surface',
    hex: '#0c0d0f',
    rgb: '12, 13, 15',
    description: 'Deepest atmospheric backing foundation for the control room viewport.',
  },
  {
    id: 'panel-slate',
    name: 'Panel Mid Slate',
    category: 'dark-surface',
    hex: '#2b2e33',
    rgb: '43, 46, 51',
    description: 'Machined metal panel core body tone under anisotropic ambient light.',
  },
  {
    id: 'panel-highlight',
    name: 'Panel Top Bevel Highlight',
    category: 'dark-surface',
    hex: '#3b3f46',
    rgb: '59, 63, 70',
    description: 'Brushed top lip gradient providing the upper specular reflection.',
  },
  {
    id: 'lcd-well',
    name: 'LCD Cavity Base',
    category: 'dark-surface',
    hex: '#101510',
    rgb: '16, 21, 16',
    description: 'Deep recessed cavity for phosphor digital readout screens.',
  },
  {
    id: 'lcd-amber',
    name: 'Phosphor LCD Amber',
    category: 'dark-indicator',
    hex: '#ffb84d',
    rgb: '255, 184, 77',
    description: 'Electroluminescent telemetry segment active glow.',
    contrastBgHex: '#101510',
    contrastRatio: 11.4,
    wcagRating: 'AAA',
  },
  {
    id: 'lcd-backlight',
    name: 'Backlit LCD Overdrive',
    category: 'dark-indicator',
    hex: '#ffd28a',
    rgb: '255, 210, 138',
    description: 'Illuminated night-vision panel overdrive state.',
    contrastBgHex: '#101510',
    contrastRatio: 13.8,
    wcagRating: 'AAA',
  },
  {
    id: 'led-green',
    name: 'LED Power (PWR)',
    category: 'dark-indicator',
    hex: '#22c55e',
    rgb: '34, 197, 94',
    description: 'Active bus power indicator LED with radial core.',
    contrastBgHex: '#1e2023',
    contrastRatio: 6.9,
    wcagRating: 'AAA',
  },
  {
    id: 'led-amber',
    name: 'LED System (SYS)',
    category: 'dark-indicator',
    hex: '#f5a623',
    rgb: '245, 166, 35',
    description: 'Heartbeat telemetry pulse indicator LED.',
    contrastBgHex: '#1e2023',
    contrastRatio: 8.1,
    wcagRating: 'AAA',
  },
  {
    id: 'led-blue',
    name: 'LED Network (COM)',
    category: 'dark-indicator',
    hex: '#3b82f6',
    rgb: '59, 130, 246',
    description: 'Asynchronous serial data packet flash.',
    contrastBgHex: '#1e2023',
    contrastRatio: 4.8,
    wcagRating: 'AA',
  },
  {
    id: 'led-red',
    name: 'LED Alarm (ALM)',
    category: 'dark-indicator',
    hex: '#ff3b2f',
    rgb: '255, 59, 47',
    description: 'Overpressure / critical threshold alarm beacon (>85 kPa).',
    contrastBgHex: '#1e2023',
    contrastRatio: 5.1,
    wcagRating: 'AA',
  },
  {
    id: 'needle-red',
    name: 'Needle Dial Indicator',
    category: 'dark-hardware',
    hex: '#ff6a57',
    rgb: '255, 106, 87',
    description: 'Dynamic analog indicator needle tip.',
    contrastBgHex: '#181b20',
    contrastRatio: 5.3,
    wcagRating: 'AA',
  },
  {
    id: 'flip-char-active',
    name: 'Split-Flap Cream Tile',
    category: 'dark-hardware',
    hex: '#ecd9a0',
    rgb: '236, 217, 160',
    description: 'Mechanical split-flap letter stamp with cream lacquer.',
    contrastBgHex: '#191b20',
    contrastRatio: 12.5,
    wcagRating: 'AAA',
  },
  {
    id: 'engraved-text',
    name: 'Engraved Metal Text',
    category: 'dark-hardware',
    hex: '#8b9097',
    rgb: '139, 144, 151',
    description: 'Milled chassis stamp with dual bevel shadow.',
    contrastBgHex: '#2b2e33',
    contrastRatio: 4.9,
    wcagRating: 'AA',
  },

  // Light Neumorphic Palette
  {
    id: 'neu-base',
    name: 'Neumorphic Canvas Medium',
    category: 'light-surface',
    hex: '#e0e0e0',
    rgb: '224, 224, 224',
    description: 'Continuous malleable medium for soft UI dual shadows.',
  },
  {
    id: 'neu-light',
    name: 'Neumorphic Specular Highlight',
    category: 'light-surface',
    hex: '#ffffff',
    rgb: '255, 255, 255',
    description: 'Top-left directional light source reflection.',
  },
  {
    id: 'neu-shadow',
    name: 'Neumorphic Dark Shadow',
    category: 'light-surface',
    hex: '#bebebe',
    rgb: '190, 190, 190',
    description: 'Bottom-right ambient occlusion directional cast.',
  },
  {
    id: 'neu-body',
    name: 'Neumorphic Body Typography',
    category: 'light-text',
    hex: '#5c5c5c',
    rgb: '92, 92, 92',
    description: 'Primary text color for high legibility on #e0e0e0.',
    contrastBgHex: '#e0e0e0',
    contrastRatio: 4.8,
    wcagRating: 'AA',
  },
  {
    id: 'neu-headline',
    name: 'Neumorphic Section Heading',
    category: 'light-text',
    hex: '#6a6a6a',
    rgb: '106, 106, 106',
    description: 'Heading with white drop shadow bevel.',
    contrastBgHex: '#e0e0e0',
    contrastRatio: 3.8,
    wcagRating: 'AA-Large',
  },
  {
    id: 'neu-note',
    name: 'Neumorphic Guidance Copy',
    category: 'light-text',
    hex: '#666666',
    rgb: '102, 102, 102',
    description: 'Documentation and warning callout font.',
    contrastBgHex: '#e0e0e0',
    contrastRatio: 4.2,
    wcagRating: 'AA-Large',
  },
  {
    id: 'neu-ice-blue',
    name: 'Neumorphic Progress Accent',
    category: 'light-accent',
    hex: '#8fb3d6',
    rgb: '143, 179, 214',
    description: 'Calibrated pastel blue for recessed progress bars.',
    contrastBgHex: '#e0e0e0',
    contrastRatio: 1.8,
    wcagRating: 'N/A',
  },
];

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    role: 'Panel Main Header',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '26px / 1.625rem',
    fontWeight: '700 (Bold)',
    tracking: '0.22em',
    lineHeight: '1.2',
    textTransform: 'UPPERCASE',
    shadowEffect: '0 1px 0 rgba(255,255,255,.08), 0 -2px 2px rgba(0,0,0,.7)',
    sampleText: 'SKEUOMORPHIC FORGE',
  },
  {
    role: 'Hardware Engraved Stamp',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '10px / 0.625rem',
    fontWeight: '700 (Bold)',
    tracking: '0.18em',
    lineHeight: '1.4',
    textTransform: 'UPPERCASE',
    shadowEffect: '0 1px 0 rgba(255,255,255,.07), 0 -1px 1px rgba(0,0,0,.6)',
    sampleText: 'PRESSÃO · kPa · MANÔMETRO DA LINHA',
  },
  {
    role: 'Hardware Push Button',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '13px / 0.8125rem',
    fontWeight: '700 (Bold)',
    tracking: '0.14em',
    lineHeight: '1.2',
    textTransform: 'UPPERCASE',
    shadowEffect: '0 -1px 0 rgba(0,0,0,.6)',
    sampleText: 'TESTE · RESET · OVERDRIVE',
  },
  {
    role: 'Digital LCD Readout',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '22px / 1.375rem',
    fontWeight: '400 (Regular)',
    tracking: '0.20em',
    lineHeight: '1.0',
    textTransform: 'NONE',
    shadowEffect: '0 0 8px rgba(255,184,77,.55)',
    sampleText: '048 kPa · 092.4 · 100',
  },
  {
    role: 'Split-Flap Mechanical Cell',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '30px / 1.875rem',
    fontWeight: '400 (Regular)',
    tracking: '0.05em',
    lineHeight: '1.0',
    textTransform: 'UPPERCASE',
    shadowEffect: 'Sub-millimeter center seam shadow',
    sampleText: 'FORGE · PRONTO · ATIVO!',
  },
  {
    role: 'Neumorphic Section Title',
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '22px / 1.375rem',
    fontWeight: '700 (Bold)',
    tracking: '0.14em',
    lineHeight: '1.3',
    textTransform: 'UPPERCASE',
    shadowEffect: '1px 1px 1px #ffffff',
    sampleText: 'NEUMORFISMO · SOFT UI',
  },
  {
    role: 'Neumorphic Telemetry Display',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '34px / 2.125rem',
    fontWeight: '400 (Regular)',
    tracking: '0.02em',
    lineHeight: '1.1',
    textTransform: 'NONE',
    shadowEffect: 'None (Recessed cavity shadow)',
    sampleText: '35% · 84.0 · 100',
  },
];

export const ANIMATION_SPECS: AnimationSpec[] = [
  {
    name: 'Tactile Button Depress',
    category: 'Tactile',
    duration: '80ms',
    durationMs: 80,
    curveName: 'ease-out',
    cubicBezier: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Instantaneous physical deflection when clicking push buttons or emergency stop.',
    targetComponent: '.hw-btn:active, .power-btn:active',
  },
  {
    name: 'Neumorphic Soft Compression',
    category: 'Tactile',
    duration: '120ms',
    durationMs: 120,
    curveName: 'ease-out',
    cubicBezier: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Viscous deformation of malleable medium under finger or cursor pressure.',
    targetComponent: '.neu-big.pressed, .neu-round:active',
  },
  {
    name: 'Knob Drag Damping',
    category: 'Mechanical',
    duration: '150ms',
    durationMs: 150,
    curveName: 'ease-out',
    cubicBezier: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Dampened mechanical resistance while dragging rotary gain knob.',
    targetComponent: '.knob',
  },
  {
    name: 'Toggle Switch Travel & Snap',
    category: 'Mechanical',
    duration: '250ms',
    durationMs: 250,
    curveName: 'Spring Overshoot',
    cubicBezier: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    description: 'High-speed spring release with dynamic overshoot past the final position.',
    targetComponent: '.toggle-thumb, .neu-tthumb',
  },
  {
    name: 'Toggle Thumb Micro-Bounce',
    category: 'Physics',
    duration: '300ms',
    durationMs: 300,
    curveName: 'ease',
    cubicBezier: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    description: 'Elastic post-impact rebound settling oscillation after flipping a hardware toggle.',
    targetComponent: '.toggle-thumb.bounce',
  },
  {
    name: 'Split-Flap Gravity Drop',
    category: 'Mechanical',
    duration: '330ms',
    durationMs: 330,
    curveName: 'ease-in-out',
    cubicBezier: 'cubic-bezier(0.42, 0, 0.58, 1)',
    description: 'Rotational 3D flip card drop from upper horizon to lower shelf.',
    targetComponent: '.flip-inner.flipping',
  },
  {
    name: 'Chassis Snap Vibration',
    category: 'Physics',
    duration: '400ms',
    durationMs: 400,
    curveName: 'ease-out',
    cubicBezier: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Lateral shudder oscillation simulating heavy metal chassis mechanical shock.',
    targetComponent: '.snap',
  },
  {
    name: 'Analog Gauge Needle Settling',
    category: 'Continuous',
    duration: '800ms',
    durationMs: 800,
    curveName: 'Damped Spring',
    cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
    description: 'Precision galvanometer needle movement with magnetic flux damping.',
    targetComponent: '.needle',
  },
  {
    name: 'Sine-Wave Sweep Cycle',
    category: 'Continuous',
    duration: '950ms',
    durationMs: 950,
    curveName: 'sin(t)',
    cubicBezier: 'Mathematical harmonic wave',
    description: 'Automated pressure verification loop driven by continuous sine waveform.',
    targetComponent: 'sweepTick() runtime loop',
  },
  {
    name: 'System Heartbeat Pulse',
    category: 'Continuous',
    duration: '2000ms',
    durationMs: 2000,
    curveName: 'ease-in-out infinite',
    cubicBezier: 'cubic-bezier(0.42, 0, 0.58, 1)',
    description: 'Telemetry beacon breathing pulse on the SYS amber LED indicator.',
    targetComponent: '.led.pulse.on',
  },
];

export const BREAKPOINTS: BreakpointSpec[] = [
  {
    name: 'Mobile Viewport',
    width: '< 640px',
    query: '@media (max-width: 639px)',
    description: 'Single-column vertical command stack optimized for handheld touch interaction.',
    features: [
      'Main chassis collapses to single column layout (grid-cols-1)',
      'Touch targets strictly enforced to minimum 44px x 44px',
      'Lateral decorative rivets hidden to maximize active screen real estate',
      'Gauge dial diameter scaled to 175px for small displays',
      'Split-flap character cards reduced to 32px x 44px',
    ],
  },
  {
    name: 'Tablet Viewport',
    width: '640px - 980px',
    query: '@media (min-width: 640px) and (max-width: 980px)',
    description: 'Balanced dual-column tactical view for tablet instrumentation and diagnostics.',
    features: [
      'Header plate transitions from stacked column to compact row',
      '2-column adaptive layout grouping gauge with core switches',
      'Knob and split-flap sub-panel wrap naturally below controls',
      'Neumorphic soft UI transitions to 2-column card matrix',
    ],
  },
  {
    name: 'Desktop Viewport',
    width: '> 980px',
    query: '@media (min-width: 981px)',
    description: 'Full 3-column command console layout matching high-density control desks.',
    features: [
      '3-column precision grid: 250px (Gauge) | 1fr (Controls) | 320px (Knob & Flip)',
      'Perimeter fastener screws visible in all 8 mechanical mounting locations',
      'Full lateral structural rivets and heavy barrel hinges rendered',
      'Full 6-cell split-flap mechanical matrix (40px x 54px each)',
      'Neumorphic soft UI 3-column card matrix (grid-cols-3)',
    ],
  },
  {
    name: 'Workstation / Ultra-wide',
    width: '> 1280px',
    query: '@media (min-width: 1281px)',
    description: 'High-density display mode with centered optical constraint.',
    features: [
      'Max width clamped to 1120px to maintain optical focal density without distortion',
      'Generous 70px vertical stage padding for elevated depth perception',
      'High-contrast focus rings and accessible key mappings enabled across all states',
    ],
  },
];

export const RAW_DESIGN_MD_CONTENT = `# SKEUOMORPHIC & NEUMORPHIC DESIGN SYSTEM SPECIFICATION
## Reference Architecture for Industrial Hardware (Dark) & Soft UI (Light) Dashboard Interfaces
**Document ID:** \`DESIGN-SYS-MOD-02-REV-C\`  
**Classification:** Production UI/UX & Agent Code Generation Standard  
**Compatibility:** Modern CSS3, Tailwind CSS v4, Motion / React 19, WCAG 2.1 AA/AAA  

---

## 1. Executive Summary & Aesthetic Architecture

This design system establishes a comprehensive dual-aesthetic specification derived from physical instrumentation hardware and soft-surface physics:

1. **Dark Mode Aesthetic — Industrial Skeuomorphic Forge (\`MOD-02\`):**  
   Inspired by heavy aerospace consoles, precision test benches, and machined alloy enclosures. Characterized by brushed metal plates, directional mechanical fastener physics (slotted screws with rotational degrees, domed rivets, dual-bracket hinges), recessed ventilation slats, tactile knurled knobs, analog meter dials, glass-bezel LED indicators with phosphor glow, and physical 3D split-flap mechanical boards.

2. **Light Mode Aesthetic — Neumorphic Soft UI (\`MOD-02 Soft UI\`):**  
   Inspired by continuous extruded substrate engineering. Characterized by soft tactile depth derived entirely from dual-directional opposing light vectors on a calibrated neutral medium (\`#e0e0e0\`). Components emerge smoothly from the background without harsh borders, utilizing mathematically balanced convex elevations, concave wells, recessed slide tracks, and tactile pill toggles.

---

## 2. Color Palettes & Semantic Design Tokens

### 2.1 Dark Mode — Industrial Forge Palette

| Token Name | Hex / Gradient Value | Purpose / Usage | Contrast vs Surface | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| \`surface-stage-base\` | \`#0c0d0f\` | Outermost stage background foundation | N/A (Canvas) | Base Canvas |
| \`surface-stage-radial\` | \`radial-gradient(1100px 700px at 50% -10%, #26282f 0%, #141518 55%, #0c0d0f 100%)\` | Main viewport backdrop | N/A | Base Canvas |
| \`panel-gradient\` | \`linear-gradient(165deg, #3b3f46 0%, #2b2e33 45%, #222428 100%)\` | Machined metal chassis panels | N/A | Core Surface |
| \`dial-radial\` | \`radial-gradient(circle at 50% 30%, #262a31 0%, #181b20 60%, #101216 100%)\` | Analog gauge well | N/A | Sub-Surface |
| \`lcd-bg\` | \`#101510\` | High-contrast LCD readout cavity | N/A | Sub-Surface |
| \`lcd-text-amber\` | \`#ffb84d\` | Vintage phosphor LCD segment readout | **11.4 : 1** vs \`#101510\` | **AAA Pass** |
| \`lcd-text-backlight\`| \`#ffd28a\` | Backlit phosphor LCD segment state | **13.8 : 1** vs \`#101510\` | **AAA Pass** |
| \`engraved-text\` | \`#8b9097\` | Machined chassis stamps with bevel shadow | **4.9 : 1** vs \`#2b2e33\` | **AA Pass** |
| \`engraved-text-lit\`| \`#a8aeb7\` | Backlit illuminated engraving | **6.8 : 1** vs \`#2b2e33\` | **AAA Pass** |
| \`needle-red-from\` | \`#ff6a57\` | Analog dial indicator tip | **5.3 : 1** vs dial well | **AA Pass** |
| \`power-glyph-lit\` | \`#ffd9d3\` | Illuminated power icon glyph | **6.8 : 1** vs \`#c01d10\` | **AAA Pass** |
| \`flip-char-active\` | \`#ecd9a0\` | Mechanical character phosphor cream | **12.5 : 1** vs \`#191b20\` | **AAA Pass** |

#### Indicator LED Color Metrics:
* **PWR (Green):** Hotspot \`#b6ffc4\`, Core \`#22c55e\`, Shadow \`#0a6b2e\`. Glow: \`0 0 10px 2px rgba(60, 220, 110, 0.5)\`. Contrast: **6.9:1** (AAA Large).
* **SYS (Amber):** Hotspot \`#ffe9ad\`, Core \`#f5a623\`, Shadow \`#8a5405\`. Glow: \`0 0 10px 2px rgba(245, 170, 40, 0.5)\`. Contrast: **8.1:1** (AAA Pass).
* **COM (Blue):** Hotspot \`#c4e0ff\`, Core \`#3b82f6\`, Shadow \`#123a7a\`. Glow: \`0 0 10px 2px rgba(80, 150, 255, 0.5)\`. Contrast: **4.8:1** (AA Pass).
* **ALM (Red):** Hotspot \`#ffb3a8\`, Core \`#ff3b2f\`, Shadow \`#8f0d04\`. Glow: \`0 0 10px 2px rgba(255, 70, 50, 0.55)\`. Contrast: **5.1:1** (AA Pass).

---

### 2.2 Light Mode — Neumorphic Soft UI Palette

| Token Name | Hex / Gradient Value | Purpose / Usage | Contrast vs \`#e0e0e0\` | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| \`neu-surface-base\` | \`#e0e0e0\` | Universal malleable substrate canvas | 1.0 : 1 | Base Medium |
| \`neu-light-highlight\`| \`#ffffff\` | Directional specular cast shadow (top-left) | Photometric Vector | Lighting Source |
| \`neu-dark-shadow\` | \`#bebebe\` | Directional ambient occlusion shadow (btm-right)| Photometric Vector | Ambient Shadow |
| \`neu-text-headline\` | \`#6a6a6a\` | Section titles with \`#ffffff\` light bevel | **3.8 : 1** (Large text >18pt) | **AA Large Pass** |
| \`neu-text-body\` | \`#5c5c5c\` | Primary operational body copy | **4.8 : 1** | **AA Pass** |
| \`neu-text-emphasized\`| \`#666666\` | Strong tags & operational states | **4.2 : 1** | **AA Large Pass** |
| \`neu-text-note\` | \`#7d7d7d\` | Secondary guidance copy (min 15px bold) | **3.1 : 1** | Guidance Note |
| \`neu-track-gradient\`| \`linear-gradient(90deg, #b9cfe4 0%, #8fb3d6 100%)\` | Recessed telemetry level fill bar | Soft Ice Blue Contrast | Active Progress |
| \`neu-button-symbol\` | \`#707070\` | Numeric & operator glyphs (\`+\`, \`-\`) | **3.5 : 1** (Bold 22px glyphs) | **AA Large Pass** |

---

## 3. Typography Architecture

### 3.1 Font Families & Roles
1. **Primary Structural & Display:**  
   \`font-family: 'Rajdhani', system-ui, -apple-system, sans-serif;\`  
   * Characteristics: Condensed geometric sans-serif with industrial tech styling, high vertical rhythm, optimized for uppercase labels, panel engravings, and hardware buttons.
   * Standard Weights: \`500\` (Medium), \`600\` (Semi-bold), \`700\` (Bold).

2. **Telemetry, Digital Readout & Monospace:**  
   \`font-family: 'Share Tech Mono', ui-monospace, SFMono-Regular, monospace;\`  
   * Characteristics: Precision electronic ledger font, fixed-width glyphs preventing layout jitter during numeric fluctuations, slotted center lines.
   * Standard Weight: \`400\` (Regular).

---

## 4. Hardware Primitives & Material Physics (Dark Mode)

### 4.1 Directional Fastener Physics (\`.screw\`)
Fasteners are precision-ground cylindrical slotted machine screws with optical rotational angles to eliminate repetitive synthetic artifacts:
\`\`\`css
.screw {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 6;
  background: radial-gradient(circle at 40% 35%, #555 0%, #2a2a2a 100%);
  box-shadow: inset 0 1px 2px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.05);
}
.screw::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  height: 1px;
  background: #111;
  transform: translateY(-50%) rotate(var(--screw-angle, 30deg));
}
\`\`\`

### 4.2 Domed Spherical Rivets (\`.rivet\`)
\`\`\`css
.rivet {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  z-index: 6;
  background: radial-gradient(circle at 35% 30%, #666 0%, #333 80%);
  box-shadow: inset 0 -1px 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.05);
}
\`\`\`

### 4.3 Heavy Mechanical Chassis Hinges (\`.hinge\`)
\`\`\`css
.hinge {
  position: absolute;
  width: 48px;
  height: 13px;
  border-radius: 6.5px;
  z-index: 7;
  background: linear-gradient(180deg, #4a4a4a 0%, #6e6e6e 30%, #565656 50%, #2c2c2c 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 2px 4px rgba(0,0,0,.35);
}
\`\`\`

---

## 5. Neumorphic Elevation & Photometric Physics (Light Mode)

Neumorphism does not use discrete borders or solid background separation. Every surface elevation is formed by directional light scattering:
* **Light Source Angle:** 315° / Top-Left (equivalent to \`-X, -Y\`).
* **Base Plate Reflectance:** \`#e0e0e0\` (Neutral Grey 88% lightness).

### 5.1 Neumorphic Elevation Scale

| Elevation Tier | Surface Type | Box Shadow Recipe | Visual Effect |
| :--- | :--- | :--- | :--- |
| **Tier 1: High Convex**| Section Container | \`14px 14px 30px rgba(0,0,0,.45), -1px -1px 4px rgba(255,255,255,.06)\` | Heavy floating chassis |
| **Tier 2: Standard Convex** | Card / Panel | \`8px 8px 16px #bebebe, -8px -8px 16px #ffffff\` | Tactile extruded button/card |
| **Tier 3: Small Convex** | Mini Button (\`44px\`) | \`6px 6px 12px #bebebe, -6px -6px 12px #ffffff\` | Handheld round pill control |
| **Tier -1: Deep Concave** | Display Well / Note | \`inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff\` | Milled display cavity |
| **Tier -2: Slotted Track** | Toggle / Progress Bar | \`inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff\` | Recessed guide channel |
| **Tier -3: Pressed State** | Depressed Button | \`inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff\` + \`transform: scale(0.98)\` | Physically pressed down |

---

## 6. Interactive Component Specifications & Behaviors

### 6.1 Analog Dial Pressure Gauge (\`.gauge-block\`)
* **Bezel:** Circular 210px diameter with 3px concentric milled ring.
* **Dial Range & Math:**
  * Min Value: \`0 kPa\` (-100° angle).
  * Max Value: \`100 kPa\` (+100° angle).
  * Angular Arc: \`200°\` total sweep.
  * Formula: \`deg = -100 + (val / 100) * 200\`.
* **Needle Dynamics:** \`transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);\`.

### 6.2 Knurled Rotary Knob (\`.knob-block\`)
* **Angular Arc:** \`-135°\` (0% gain) to \`+135°\` (100% gain) = \`270°\` total rotation.
* **Math:** \`knobAngle = -135 + (gainPercent / 100) * 270\`.
* **Interaction:** Pointer drag with \`Math.atan2\`, keyboard Arrow keys, Home/End.

### 6.3 Mechanical Split-Flap Display ("Flip Board")
* **Timing:** \`330ms\` flip duration with \`70ms\` cascading delay per cell.
* **Perspective:** \`260px\` 3D perspective with \`rotateX(180deg)\` flip half-cycle.

---

## 7. Master Motion, Easing & Transition Timing Matrix

| Motion Element | Duration | Easing Curve | Purpose |
| :--- | :--- | :--- | :--- |
| **Button Click** | \`80ms\` | \`ease-out\` | Immediate tactile click response |
| **Neumorphic Pressed** | \`120ms\` | \`ease-out\` | Gentle deformation into medium |
| **Knob Rotation** | \`150ms\` | \`ease-out\` | Dampened mechanical inertia |
| **Toggle Track Slide** | \`250ms\` | \`cubic-bezier(0.34, 1.56, 0.64, 1)\` | Mechanical snap with overshoot |
| **Toggle Micro-Bounce** | \`300ms\` | \`ease\` | Post-impact elastic rebound |
| **Split-Flap Half-Flip**| \`330ms\` | \`ease-in-out\` | Rotational card flap gravity drop |
| **Chassis Snap Shudder**| \`400ms\` | \`ease-out\` | Heavy lateral chassis dampening |
| **Gauge Needle Sweep** | \`800ms\` | \`cubic-bezier(0.4, 0, 0.2, 1)\` | Galvanometer needle flux damping |
| **System Heartbeat Pulse**| \`2000ms\` | \`ease-in-out infinite\` | Rhythmic status beacon |

---

## 8. Accessibility & Keyboard Navigation
* High contrast focus rings:
  * Dark mode: \`outline: 2px solid #ffb84d; outline-offset: 3px;\`
  * Light mode: \`outline: 2px solid #3b82f6; outline-offset: 3px;\`
* Key bindings: \`[P]\` Power, \`[S]\` Sweep, \`[L]\` Light, \`[T]\` Test, \`[R]\` Reset, Arrow Keys for Knob/Level.
* ARIA roles: \`role="meter"\`, \`role="slider"\`, \`role="switch"\`, \`aria-live="polite"\`.
`;
