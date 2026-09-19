# SKEUOMORPHIC & NEUMORPHIC DESIGN SYSTEM SPECIFICATION
## Reference Architecture for Industrial Hardware (Dark) & Soft UI (Light) Dashboard Interfaces
**Document ID:** `DESIGN-SYS-MOD-02-REV-C`  
**Classification:** Production UI/UX & Agent Code Generation Standard  
**Compatibility:** Modern CSS3, Tailwind CSS v4, Motion / React 19, WCAG 2.1 AA/AAA  

---

## 1. Executive Summary & Aesthetic Architecture

This design system establishes a comprehensive dual-aesthetic specification derived from physical instrumentation hardware and soft-surface physics:

1. **Dark Mode Aesthetic — Industrial Skeuomorphic Forge (`MOD-02`):**  
   Inspired by heavy aerospace consoles, precision test benches, and machined alloy enclosures. Characterized by brushed metal plates, directional mechanical fastener physics (slotted screws with rotational degrees, domed rivets, dual-bracket hinges), recessed ventilation slats, tactile knurled knobs, analog meter dials, glass-bezel LED indicators with phosphor glow, and physical 3D split-flap mechanical boards.

2. **Light Mode Aesthetic — Neumorphic Soft UI (`MOD-02 Soft UI`):**  
   Inspired by continuous extruded substrate engineering. Characterized by soft tactile depth derived entirely from dual-directional opposing light vectors on a calibrated neutral medium (`#e0e0e0`). Components emerge smoothly from the background without harsh borders, utilizing mathematically balanced convex elevations, concave wells, recessed slide tracks, and tactile pill toggles.

---

## 2. Color Palettes & Semantic Design Tokens

### 2.1 Dark Mode — Industrial Forge Palette

| Token Name | Hex / Gradient Value | Purpose / Usage | Contrast vs Surface | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| `surface-stage-base` | `#0c0d0f` | Outermost stage background foundation | N/A (Canvas) | Base Canvas |
| `surface-stage-radial` | `radial-gradient(1100px 700px at 50% -10%, #26282f 0%, #141518 55%, #0c0d0f 100%)` | Main viewport backdrop | N/A | Base Canvas |
| `panel-gradient` | `linear-gradient(165deg, #3b3f46 0%, #2b2e33 45%, #222428 100%)` | Machined metal chassis panels | N/A | Core Surface |
| `plate-tag-bg` | `rgba(0, 0, 0, 0.2)` | Header badge recessed plate | Inset against panel | Decorative |
| `dial-radial` | `radial-gradient(circle at 50% 30%, #262a31 0%, #181b20 60%, #101216 100%)` | Analog gauge well | N/A | Sub-Surface |
| `lcd-bg` | `#101510` | High-contrast LCD readout cavity | N/A | Sub-Surface |
| `lcd-text-amber` | `#ffb84d` | Vintage phosphor LCD segment readout | **11.4 : 1** vs `#101510` | **AAA Pass** |
| `lcd-text-backlight`| `#ffd28a` | Backlit phosphor LCD segment state | **13.8 : 1** vs `#101510` | **AAA Pass** |
| `engraved-text` | `#8b9097` | Machined chassis stamps with bevel shadow | **4.9 : 1** vs `#2b2e33` | **AA Pass** |
| `engraved-text-lit`| `#a8aeb7` | Backlit illuminated engraving | **6.8 : 1** vs `#2b2e33` | **AAA Pass** |
| `needle-red-from` | `#ff6a57` | Analog dial indicator tip | **5.3 : 1** vs dial well | **AA Pass** |
| `needle-red-to` | `#c0271a` | Analog dial indicator base | **3.8 : 1** (Large needle) | **AA Large** |
| `power-crimson-from`| `#ff7a6c` | Emergency power button crown | High visual salience | Critical Control |
| `power-crimson-core`| `#c01d10` | Emergency power button mid-tone | High visual salience | Critical Control |
| `power-glyph-lit` | `#ffd9d3` | Illuminated power icon glyph | **6.8 : 1** vs `#c01d10` | **AAA Pass** |
| `flip-face-bg` | `linear-gradient(180deg, #25282e 0%, #191b20 54%, #101216 56%, #1d2025 100%)` | Split-flap card halves | Deep alloy contrast | Mechanical Tile |
| `flip-char-active` | `#ecd9a0` | Mechanical character phosphor cream | **12.5 : 1** vs `#191b20` | **AAA Pass** |
| `flip-char-off` | `#3c3f45` | Unpowered split-flap character | **2.2 : 1** (Deactivated) | Intentionally dim |

#### Indicator LED Color Metrics:
* **PWR (Green):** Hotspot `#b6ffc4`, Core `#22c55e`, Shadow `#0a6b2e`. Glow: `0 0 10px 2px rgba(60, 220, 110, 0.5)`. Contrast: **6.9:1** (AAA Large).
* **SYS (Amber):** Hotspot `#ffe9ad`, Core `#f5a623`, Shadow `#8a5405`. Glow: `0 0 10px 2px rgba(245, 170, 40, 0.5)`. Contrast: **8.1:1** (AAA Pass).
* **COM (Blue):** Hotspot `#c4e0ff`, Core `#3b82f6`, Shadow `#123a7a`. Glow: `0 0 10px 2px rgba(80, 150, 255, 0.5)`. Contrast: **4.8:1** (AA Pass).
* **ALM (Red):** Hotspot `#ffb3a8`, Core `#ff3b2f`, Shadow `#8f0d04`. Glow: `0 0 10px 2px rgba(255, 70, 50, 0.55)`. Contrast: **5.1:1** (AA Pass).

---

### 2.2 Light Mode — Neumorphic Soft UI Palette

| Token Name | Hex / Gradient Value | Purpose / Usage | Contrast vs `#e0e0e0` | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| `neu-surface-base` | `#e0e0e0` | Universal malleable substrate canvas | 1.0 : 1 | Base Medium |
| `neu-light-highlight`| `#ffffff` | Directional specular cast shadow (top-left) | Photometric Vector | Lighting Source |
| `neu-dark-shadow` | `#bebebe` | Directional ambient occlusion shadow (btm-right)| Photometric Vector | Ambient Shadow |
| `neu-text-headline` | `#6a6a6a` | Section titles with `#ffffff` light bevel | **3.8 : 1** (Large text >18pt) | **AA Large Pass** |
| `neu-text-body` | `#5c5c5c` | Primary operational body copy | **4.8 : 1** | **AA Pass** |
| `neu-text-emphasized`| `#666666` | Strong tags & operational states | **4.2 : 1** | **AA Large Pass** |
| `neu-text-note` | `#7d7d7d` | Secondary guidance copy (min 15px bold) | **3.1 : 1** | Guidance Note |
| `neu-text-disabled`| `#8a8a8a` | Monospace status & inactive labels | **2.6 : 1** | Informational |
| `neu-track-gradient`| `linear-gradient(90deg, #b9cfe4 0%, #8fb3d6 100%)` | Recessed telemetry level fill bar | Soft Ice Blue Contrast | Active Progress |
| `neu-button-symbol` | `#707070` | Numeric & operator glyphs (`+`, `-`) | **3.5 : 1** (Bold 22px glyphs) | **AA Large Pass** |

---

## 3. Typography Architecture

### 3.1 Font Families & Roles
1. **Primary Structural & Display:**  
   `font-family: 'Rajdhani', system-ui, -apple-system, sans-serif;`  
   * Characteristics: Condensed geometric sans-serif with industrial tech styling, high vertical rhythm, optimized for uppercase labels, panel engravings, and hardware buttons.
   * Standard Weights: `500` (Medium), `600` (Semi-bold), `700` (Bold).

2. **Telemetry, Digital Readout & Monospace:**  
   `font-family: 'Share Tech Mono', ui-monospace, SFMono-Regular, monospace;`  
   * Characteristics: Precision electronic ledger font, fixed-width glyphs preventing layout jitter during numeric fluctuations, slotted center lines.
   * Standard Weight: `400` (Regular).

### 3.2 Typographic Hierarchy Table

| Level / Role | Font Family | Size | Weight | Tracking (Letter-Spacing) | Text Transform | Depth / Shadow Effect |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Panel Header 1** | Rajdhani | 26px (1.625rem) | 700 | `0.22em` | UPPERCASE | `0 1px 0 rgba(255,255,255,.08), 0 -2px 2px rgba(0,0,0,.7)` |
| **Section Title** | Rajdhani | 22px (1.375rem) | 700 | `0.14em` | UPPERCASE | Light: `1px 1px 1px #ffffff` |
| **Hardware Subtitle**| Rajdhani | 12px (0.75rem) | 500 | `0.14em` | UPPERCASE | None / Subtle dark drop |
| **Hardware Engraving**| Rajdhani | 10px (0.625rem) | 700 | `0.18em` | UPPERCASE | `0 1px 0 rgba(255,255,255,.07), 0 -1px 1px rgba(0,0,0,.6)` |
| **Neumorphic Engraving**| Rajdhani | 10px (0.625rem) | 700 | `0.18em` | UPPERCASE | `1px 1px 1px #ffffff` |
| **Telemetry LCD** | Share Tech Mono| 22px (1.375rem) | 400 | `0.20em` | None | `0 0 8px rgba(255,184,77,.55)` |
| **Split-Flap Tile** | Share Tech Mono| 30px (1.875rem) | 400 | `0.05em` | UPPERCASE | Sub-millimeter card split seam |
| **Neumorphic Value** | Share Tech Mono| 34px (2.125rem) | 400 | `0.02em` | None | None (Recessed Well) |
| **Chassis Tag / Spec**| Share Tech Mono| 11px (0.6875rem)| 400 | `0.15em` | UPPERCASE | Inset container |

---

## 4. Hardware Primitives & Material Physics (Dark Mode)

### 4.1 Directional Fastener Physics (`.screw`)
Fasteners are precision-ground cylindrical slotted machine screws with optical rotational angles to eliminate repetitive synthetic artifacts:
```css
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
```
* **Placement Rule:**
  * Narrow Plate Strip (Header/Vent): 2 screws placed symmetrically at lateral edges.
  * Medium Sub-panel (Flip-Board): 4 perimeter corner screws.
  * Main Chassis Panel: 6 screws (4 corners + 2 edge midpoints).

### 4.2 Domed Spherical Rivets (`.rivet`)
Used for structural plate anchoring:
```css
.rivet {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  z-index: 6;
  background: radial-gradient(circle at 35% 30%, #666 0%, #333 80%);
  box-shadow: inset 0 -1px 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.05);
}
```

### 4.3 Heavy Mechanical Chassis Hinges (`.hinge`)
Top-anchored load-bearing barrel hinges with recessed dual bolt cutouts:
```css
.hinge {
  position: absolute;
  width: 48px;
  height: 13px;
  border-radius: 6.5px;
  z-index: 7;
  background: linear-gradient(180deg, #4a4a4a 0%, #6e6e6e 30%, #565656 50%, #2c2c2c 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 2px 4px rgba(0,0,0,.35);
}
.hinge::before, .hinge::after {
  content: "";
  position: absolute;
  top: 1px;
  bottom: 1px;
  width: 2px;
  border-radius: 2px;
  background: rgba(0,0,0,.35);
}
.hinge::before { left: 8px; }
.hinge::after  { right: 8px; }
```

### 4.4 Ventilation Slat Array (`.vent-slat`)
Machined airflow slits on lower chassis to simulate electronic thermal dissipation:
```css
.vent-slat {
  height: 3px;
  border-radius: 1px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%);
  box-shadow: 0 1px 0 rgba(255,255,255,.03), inset 0 1px 2px rgba(0,0,0,.8);
}
```

### 4.5 Anisotropic Brushed Micro-Texture
Overlayed across dark panels to break sterile digital flat color:
```css
.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: repeating-linear-gradient(
    115deg,
    rgba(255, 255, 255, 0.014) 0px 2px,
    rgba(0, 0, 0, 0.02) 2px 4px
  );
}
```

---

## 5. Neumorphic Elevation & Photometric Physics (Light Mode)

Neumorphism does not use discrete borders or solid background separation. Every surface elevation is formed by directional light scattering:
* **Light Source Angle:** 315° / Top-Left (equivalent to `-X, -Y`).
* **Base Plate Reflectance:** `#e0e0e0` (Neutral Grey 88% lightness).

### 5.1 Neumorphic Elevation Scale

| Elevation Tier | Surface Type | Box Shadow Recipe | Visual Effect |
| :--- | :--- | :--- | :--- |
| **Tier 0: Substrate** | Flat Canvas | `none` | Continuous reference plain |
| **Tier 1: High Convex**| Section Container | `14px 14px 30px rgba(0,0,0,.45), -1px -1px 4px rgba(255,255,255,.06)` | Heavy floating chassis |
| **Tier 2: Standard Convex** | Card / Panel | `8px 8px 16px #bebebe, -8px -8px 16px #ffffff` | Tactile extruded button/card |
| **Tier 3: Small Convex** | Mini Button (`44px`) | `6px 6px 12px #bebebe, -6px -6px 12px #ffffff` | Handheld round pill control |
| **Tier -1: Deep Concave** | Display Well / Note | `inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff` | Milled display cavity |
| **Tier -2: Slotted Track** | Toggle / Progress Bar | `inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff` | Recessed guide channel |
| **Tier -3: Pressed State** | Depressed Button | `inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff` + `transform: scale(0.98)` | Physically pressed down |

### 5.2 The "When NOT to Use Neumorphism" Rule Matrix
1. **Never on Pure White (`#fff`) or Pure Black (`#000`):** White leaves no room for specular highlights; black leaves no room for cast shadows.
2. **Never for High-Density Data Tables:** Low boundary contrast causes cognitive fatigue on dense numerical matrices.
3. **Never for Controls Under 24px:** Shadows bleed into the glyph boundary, degrading legibility.
4. **Always Provide Focus Rings for Accessibility:** Because neumorphic borders are soft, keyboard navigability requires an explicit high-contrast focus indicator (`outline: 2px solid #3b82f6`).

---

## 6. Interactive Component Specifications & Behaviors

### 6.1 Analog Dial Pressure Gauge (`.gauge-block`)
* **Bezel:** Circular 210px diameter with 3px concentric milled ring:
  ```css
  background: linear-gradient(135deg, #444 0%, #222 50%, #333 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.1), inset 0 -1px 0 rgba(0,0,0,.3), 0 2px 4px rgba(0,0,0,.4);
  ```
* **Dial Range & Math:**
  * Min Value: `0 kPa` (-100° angle).
  * Max Value: `100 kPa` (+100° angle).
  * Angular Arc: `200°` total sweep.
  * Formula: `needleRotationDegrees = -100 + (currentValue / 100) * 200`.
* **Ticks:** 21 total tick marks (step `10°` from `-100°` to `+100°`).
  * Minor Ticks: `width: 2px; height: 7px; background: #7c828c;`
  * Major Ticks (every 5th): `width: 2px; height: 11px; background: #dde1e7; box-shadow: 0 0 3px rgba(255,255,255,.25);`
* **Needle Dynamics:**
  * Pivot: `transform-origin: bottom center;`
  * Cap: Concentric 18px cylinder with specular highlight.
  * Needle Transition: `transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)`.
* **Telemetry LCD Screen:**
  * Background: `#101510`.
  * Format: Zero-padded 3 digits (`000` to `100`) or unpowered fallback (`---`).
  * Backlight Toggle: Switches glow to `#ffd28a` with `0 0 14px rgba(255,190,100,.9)`.

### 6.2 Knurled Rotary Knob (`.knob-block`)
* **Bezel:** 104px outer diameter.
* **Knurl Texture:** 60 teeth generated via alternating radial conic bands:
  ```css
  background:
    radial-gradient(circle at 35% 28%, rgba(255,255,255,.16), transparent 55%),
    repeating-conic-gradient(#3d4147 0deg 6deg, #292c30 6deg 12deg);
  ```
* **Cap Indicator:** Red index groove (`#ff6a57`) with radiant glow.
* **Angular Arc:** `-135°` (0% gain) to `+135°` (100% gain) = `270°` total rotation.
* **Math:** `knobAngle = -135 + (gainPercent / 100) * 270`.
* **Interaction:**
  * Pointer drag computes polar angle via `Math.atan2(dx, -dy) * 180 / Math.PI`, clamped to `[-135°, 135°]`.
  * Cursor switches to `cursor: grabbing` on pointerdown with pointer capture.
  * Keyboard support: `ArrowLeft`/`ArrowDown` decrements 1% (5% with `Shift`), `ArrowRight`/`ArrowUp` increments 1% (5% with `Shift`), `Home` sets to 0%, `End` sets to 100%.

### 6.3 Mechanical Split-Flap Display ("Flip Board")
* **Cell Matrix:** 6 independent split-flap letter cells (`40px x 54px`).
* **Perspective & Geometry:**
  * Container: `perspective: 260px;`
  * Center Split: 2px horizontal shadow seam dividing upper and lower card halves.
  * Backface: `backface-visibility: hidden;`
* **Flip State Machine:**
  1. Card receives target character `targetChar`.
  2. Next card half primes on `.flip-back`.
  3. Element triggers `.flipping` with `transform: rotateX(180deg)` over `330ms ease-in-out`.
  4. Cascading delay formula across cell array: `cellDelay = cellIndex * 70ms`.
  5. On completion, `transform` is instantly reset (`.instant`), updating `.flip-front` with target character via double `requestAnimationFrame`.
* **Cycling Word Dictionary:** `[' FORGE', 'PRONTO', 'FORJAR', 'ATIVO!']`.
* **Power-Off State:** Cards transition to `color: #3c3f45;` with blank characters.

### 6.4 Industrial Hardware Toggle Switches (`.hw-toggle`)
* **Track:** 54px width x 26px height. Recessed cavity `rgba(0,0,0,.85)`.
* **Thumb:** 20px brushed metallic cylinder, sliding 28px (`translateX(28px)`).
* **Spring Curve:** `transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);`
* **Thumb Bounce Physics:**
  ```css
  @keyframes toggle-bounce {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.92); }
    70%  { transform: scale(1.04); }
    100% { transform: scale(1); }
  }
  ```
* **Integrated Micro-LED:**
  * Off: Dark carbon dot `#333639`.
  * On: Neon emerald beacon `#6fe08a` with `box-shadow: 0 0 6px rgba(110,224,138,.8)`.

### 6.5 Tactile Heavy Push Buttons & Emergency Stop
* **Standard Machine Button (`.hw-btn`):**
  * Surface: Brushed alloy gradient with 3D bottom bevel (`0 3px 0 #17181b, 0 5px 8px rgba(0,0,0,.5)`).
  * Active Depressed State: Drops 2px (`transform: translateY(2px)`), collapsing bottom bevel to `0 1px 0 #17181b`.
* **Emergency Mushroom Power Switch (`.power-btn`):**
  * Geometry: 66px diameter spherical dome.
  * Palette: Crimson radial gradient `#ff7a6c` to `#8a120a`.
  * Active Depressed State: Drops 3px (`transform: translateY(3px)`).
  * Latched "ON" State: Emits intense red halo `box-shadow: 0 7px 16px rgba(255,80,50,.35)`.
* **Haptic Chassis Snap Shudder (`.snap`):**
  * Lateral vibration triggered on heavy mechanical toggle/reset:
    `0% { -0px } -> 30% { -3px } -> 60% { +2px } -> 80% { -1px } -> 100% { 0px }` over 400ms.

---

## 7. Master Motion, Easing & Transition Timing Matrix

All component animations must strictly observe the following calibrated timing specs:

| Motion Element | Duration | Easing Function / Curve | Mathematical Purpose |
| :--- | :--- | :--- | :--- |
| **Button Click / Push** | `80ms` (0.08s) | `ease-out` | Immediate tactile response under finger/click |
| **Neumorphic Pressed** | `120ms` (0.12s) | `ease-out` | Gentle deformation into malleable substrate |
| **Knob Rotation Drag** | `150ms` (0.15s) | `ease-out` | Dampened mechanical inertia |
| **LED State Ignition** | `150ms` (0.15s) | `ease-in-out` | Thermal filament/diode illumination curve |
| **Neumorphic Progress** | `200ms` (0.20s) | `ease-out` | Viscous fluid level adjustment |
| **Toggle Track Slide** | `250ms` (0.25s) | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Mechanical toggle snap with slight overshoot |
| **Toggle Thumb Bounce** | `300ms` (0.30s) | `ease` | Elastic decompression oscillation |
| **Backlight Luminescence**| `300ms` (0.30s) | `ease-in-out` | Phosphor glow rise and decay |
| **Split-Flap Half-Flip** | `330ms` (0.33s) | `ease-in-out` | Rotational card flap gravity drop |
| **Split-Flap Cascade** | `70ms` per cell | Sequential linear delay | Auditory/visual domino stagger |
| **Chassis Snap Shudder** | `400ms` (0.40s) | `ease-out` | Heavy mechanical chassis dampening |
| **Gauge Needle Sweep** | `800ms` (0.80s) | `cubic-bezier(0.4, 0, 0.2, 1)` | Heavy damped spring-mass needle settling |
| **Auto-Sweep Oscillation**| `950ms` (0.95s) | `sin(t)` mathematical loop | Continuous sinusoidal testing wave |
| **Heartbeat System Pulse**| `2000ms` (2.0s) | `ease-in-out infinite` | Rhythmic biological/telemetry system status |

---

## 8. Accessibility (a11y), Contrast & Keyboard Navigation

### 8.1 Accessibility & WCAG 2.1 Conformance Standards
1. **Color Perception Independence:**
   * LEDs are not only color-differentiated (Green, Amber, Blue, Red); each unit has a distinct engraved label stamp (`PWR`, `SYS`, `COM`, `ALM`) and unique temporal frequency (SYS pulses at 0.5Hz, COM flickers randomly, ALM activates only on overpressure > 85 kPa).
2. **Accessible Contrast Ratios:**
   * Amber LCD on dark well: **11.4:1** (Exceeds WCAG AAA).
   * Split-flap active characters: **12.5:1** (Exceeds WCAG AAA).
   * Primary Dark UI text on panel: **4.9:1** (Exceeds WCAG AA).
   * Neumorphic body text: **4.8:1** (Exceeds WCAG AA).
3. **High-Contrast Focus Rings:**
   * When navigated via keyboard (`:focus-visible`), elements must show distinct, non-blur focus rings:
     * Dark Mode: `outline: 2px solid #ffb84d; outline-offset: 3px; border-radius: 6px;`
     * Light Mode: `outline: 2px solid #3b82f6; outline-offset: 3px; border-radius: 6px;`

### 8.2 Keyboard Navigation Keymap

| Target Component | Key Binding | Action / State Change |
| :--- | :--- | :--- |
| **Any Interactive Control** | `Tab` / `Shift + Tab` | Sequentially move focus through all controls |
| **Emergency Power Button** | `Space` or `Enter` (or `[P]`) | Toggle master electrical bus on/off |
| **Sweep Mode Toggle** | `Space` (or `[S]`) | Toggle automated sine wave needle sweep |
| **Illumination Toggle** | `Space` (or `[L]`) | Toggle chassis backlight & phosphor overdrive |
| **Test Button** | `Space` or `Enter` (or `[T]`)| Trigger split-flap phrase rotation |
| **Reset Button** | `Space` or `Enter` (or `[R]`)| Reset gain and pressure to zero |
| **Rotary Gain Knob** | `ArrowLeft` / `ArrowDown` | Decrease gain by 1% |
| **Rotary Gain Knob** | `ArrowRight` / `ArrowUp` | Increase gain by 1% |
| **Rotary Gain Knob** | `Shift + ArrowKeys` | Step gain by 5% increments |
| **Rotary Gain Knob** | `Home` / `End` | Set to Minimum (0%) or Maximum (100%) |
| **Split-Flap Display** | `Space` or `Enter` | Advance to next mechanical word |
| **Neumorphic Counter** | `Space` or `Enter` | Increment tactile click counter |
| **Neumorphic Steppers** | `Space` or `Enter` | Increment (+) or Decrement (-) level by 5% |
| **Neumorphic Auto-Loop** | `Space` | Toggle automatic telemetry incrementer |

### 8.3 Screen Reader & ARIA Contract
* Gauge Element: `role="meter"` with `aria-valuenow="{val}"`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Manômetro de Pressão da Linha"`.
* Knobs: `role="slider"` with `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-valuenow="{val}"`, `aria-label="Controle de Ganho da Linha"`.
* Toggles: `role="switch"` with `aria-checked="{boolean}"`.
* LEDs: `role="status"` with `aria-live="polite"`.

---

## 9. Responsive Breakpoints & Adaptive Layout Architecture

The system transitions seamlessly across mobile, tablet, desktop, and ultra-wide displays:

```css
/* Responsive Breakpoint Schema */
--breakpoint-sm: 640px;  /* Mobile devices */
--breakpoint-md: 768px;  /* Small tablets */
--breakpoint-lg: 980px;  /* Desktop & large tablets */
--breakpoint-xl: 1280px; /* High-density workstations */
```

### 9.1 Breakpoint Behavior Matrix

| Layout Zone | Mobile (`< 640px`) | Tablet (`640px - 980px`) | Desktop (`> 980px`) |
| :--- | :--- | :--- | :--- |
| **Stage Container** | `width: 96vw; padding: 16px 0 40px;` | `width: 94vw; padding: 24px 0 50px;` | `width: min(1120px, 94vw); padding: 36px 0 70px;` |
| **Header Plate** | Stacked vertical column, text centered | Compact row, simplified badges | Full horizontal strip, lateral rivets, badge |
| **Main Panel Grid** | Single column stack (`1fr`), centered items | 2-column adaptive layout | 3-column command console (`250px 1fr 320px`) |
| **Dial Gauge** | Scaled to 175px diameter | Scaled to 190px diameter | Full 210px diameter with tick ring |
| **Touch Targets** | Strict minimum 44px x 44px | Standard hardware pads | Hardware pads + hover depth states |
| **Split-Flap Cells**| 32px x 44px cells (fits 320px width) | 36px x 48px cells | Full 40px x 54px cells |
| **Fastener Screws** | Conceal edge midpoints; retain 4 corners | Standard 6 perimeter screws | Full 8 perimeter screws + lateral rivets |
| **Neumorphic Grid** | Single column stack (`grid-cols-1`) | 2-column card layout | 3-column card matrix (`grid-cols-3`) |

---

## 10. Agent Implementation Guide & CSS / Tailwind Recipes

When generating dashboard interfaces conforming to this design system, use the following verified classes and recipes:

### 10.1 Dark Hardware Panel Recipe (Tailwind + CSS)
```html
<div class="relative rounded-[14px] bg-gradient-to-br from-[#3b3f46] via-[#2b2e33] to-[#222428]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_-1px_0_rgba(0,0,0,0.5),0_12px_32px_rgba(0,0,0,0.55),0_2px_6px_rgba(0,0,0,0.4)]
            p-6 md:p-9 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none
            before:bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.014)_0px_2px,rgba(0,0,0,0.02)_2px_4px)]">
  <!-- Fastener Screw Top-Left -->
  <span class="screw" style="top: 12px; left: 12px; --screw-angle: 24deg;"></span>
  <!-- Panel Content Goes Here -->
</div>
```

### 10.2 Light Neumorphic Card Recipe (Tailwind + CSS)
```html
<div class="rounded-[20px] bg-[#e0e0e0] p-7
            shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]
            flex flex-col items-center gap-4 text-[#5c5c5c]">
  <!-- Card Content Goes Here -->
</div>
```

### 10.3 Neumorphic Recessed Well Recipe
```html
<div class="w-full rounded-[14px] bg-[#e0e0e0] p-4
            shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]
            flex flex-col items-center gap-3">
  <!-- Recessed Content / Progress / Value -->
</div>
```

---
*End of Design System Specification Document.*  
*Maintained for AI Coding Agents & Front-End Engineering.*
