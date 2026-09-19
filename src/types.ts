/**
 * Types and interfaces for the Skeuomorphic & Neumorphic Design System
 */

export type ViewMode = 'all' | 'hardware-dark' | 'neumorphic-light' | 'docs' | 'tokens' | 'motion';

export interface HardwareState {
  power: boolean;
  sweep: boolean;
  backlight: boolean;
  value: number; // 0 to 100 kPa
  knobAngle: number; // -135 to +135 deg
  wordIdx: number;
}

export interface NeumorphicState {
  count: number;
  level: number; // 0 to 100
  autoIncrement: boolean;
}

export interface ColorToken {
  id: string;
  name: string;
  category: 'dark-surface' | 'dark-indicator' | 'dark-hardware' | 'light-surface' | 'light-accent' | 'light-text';
  hex: string;
  rgb: string;
  description: string;
  contrastBgHex?: string;
  contrastRatio?: number;
  wcagRating?: 'AAA' | 'AA' | 'AA-Large' | 'Fail' | 'N/A';
}

export interface TypographyToken {
  role: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  tracking: string;
  lineHeight: string;
  textTransform: string;
  shadowEffect: string;
  sampleText: string;
}

export interface AnimationSpec {
  name: string;
  category: 'Tactile' | 'Mechanical' | 'Continuous' | 'Physics';
  duration: string;
  durationMs: number;
  curveName: string;
  cubicBezier: string;
  description: string;
  targetComponent: string;
}

export interface BreakpointSpec {
  name: string;
  width: string;
  query: string;
  description: string;
  features: string[];
}
