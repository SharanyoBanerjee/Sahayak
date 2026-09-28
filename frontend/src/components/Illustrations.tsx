import React from 'react';

/**
 * Technical engraving-style line illustrations
 * Single-weight 1.25px stroke, ink stroke (#241E18), hatched shading, no colored fills.
 */

// 1. Tomato Plate (Solanum lycopersicum)
export const TomatoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="16" cy="18" rx="11" ry="9.5" stroke="#241E18" strokeWidth="1.25" />
    {/* Hatch shading */}
    <path d="M12 23C14 24.5 18 24.5 20 23M10 21C13 23 19 23 22 21M9 19C11 20.5 21 20.5 23 19" stroke="#241E18" strokeWidth="0.75" strokeDasharray="1 2" />
    {/* Calyx & stem */}
    <path d="M16 8.5V5.5M16 8.5C14 7 11 8 9 9M16 8.5C18 7 21 8 23 9M16 8.5C15 10.5 13 11 11 11.5M16 8.5C17 10.5 19 11 21 11.5" stroke="#241E18" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 2. Biscuit Plate (Triticum aestivum)
export const BiscuitIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="5" y="8" width="22" height="16" rx="2" stroke="#241E18" strokeWidth="1.25" />
    {/* Inner decorative border */}
    <rect x="7.5" y="10.5" width="17" height="11" rx="1" stroke="#241E18" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
    {/* Pinhole docking points */}
    <circle cx="11" cy="14" r="0.8" fill="#241E18" />
    <circle cx="16" cy="14" r="0.8" fill="#241E18" />
    <circle cx="21" cy="14" r="0.8" fill="#241E18" />
    <circle cx="11" cy="18" r="0.8" fill="#241E18" />
    <circle cx="16" cy="18" r="0.8" fill="#241E18" />
    <circle cx="21" cy="18" r="0.8" fill="#241E18" />
  </svg>
);

// 3. Chips Pouch (Solanum tuberosum)
export const ChipsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M8 5L24 5L22 27L10 27L8 5Z" stroke="#241E18" strokeWidth="1.25" strokeLinejoin="round" />
    {/* Seal crimp lines */}
    <line x1="8" y1="7.5" x2="24" y2="7.5" stroke="#241E18" strokeWidth="0.75" />
    <line x1="10" y1="24.5" x2="22" y2="24.5" stroke="#241E18" strokeWidth="0.75" />
    {/* Hatch lines for pouch volume */}
    <path d="M11 12C13 14 19 14 21 12M11 16C13 18 19 18 21 16" stroke="#241E18" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
  </svg>
);

// 4. Mango Plate (Mangifera indica)
export const MangoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M17 6C11 6 7 12 9 20C10.5 25 15 27 20 25C25 23 26 15 23 10C21 7.5 19 6 17 6Z" stroke="#241E18" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M17 6C17 4 16 3 15 2.5" stroke="#241E18" strokeWidth="1.25" strokeLinecap="round" />
    {/* Shading */}
    <path d="M11 20C13 23 17 24 19 23M12 17C14 20 18 21 20 20" stroke="#241E18" strokeWidth="0.75" strokeDasharray="1 2" />
  </svg>
);

// 5. Leafy Greens Plate (Spinacia oleracea)
export const SpinachIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16 27V9M16 9C10 9 8 18 16 26C24 18 22 9 16 9Z" stroke="#241E18" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M11 17C13.5 18 16 18 16 18M21 17C18.5 18 16 18 16 18M13 22C14.5 22.5 16 22.5 16 22.5M19 22C17.5 22.5 16 22.5 16 22.5" stroke="#241E18" strokeWidth="0.75" strokeLinecap="round" />
  </svg>
);

export const CommodityPlate: React.FC<{
  commodityId?: string;
  isRespiring: boolean;
  className?: string;
}> = ({ commodityId, isRespiring, className = 'w-6 h-6' }) => {
  if (commodityId === 'CMD-001') return <TomatoIcon className={className} />;
  if (commodityId === 'CMD-005') return <BiscuitIcon className={className} />;
  if (commodityId === 'CMD-006') return <ChipsIcon className={className} />;
  if (commodityId === 'CMD-004') return <MangoIcon className={className} />;
  if (commodityId === 'CMD-003' || commodityId === 'CMD-002') return <SpinachIcon className={className} />;
  return isRespiring ? <TomatoIcon className={className} /> : <BiscuitIcon className={className} />;
};

export const getBotanicalName = (commodityId?: string, fallback = ''): string => {
  switch (commodityId) {
    case 'CMD-001': return 'Solanum lycopersicum';
    case 'CMD-002': return 'Capsicum annuum';
    case 'CMD-003': return 'Spinacia oleracea';
    case 'CMD-004': return 'Mangifera indica';
    case 'CMD-005': return 'Triticum aestivum (Baked)';
    case 'CMD-006': return 'Solanum tuberosum (Fried)';
    case 'CMD-007': return 'Arachis hypogaea';
    case 'CMD-008': return 'Roasted Coffee';
    default: return fallback || 'Specimen';
  }
};

/**
 * Hero Gas Exchange Schematic (Fig. 1)
 * Technical cross-section with leader lines outside the artwork, anchored arrows, hatched shading.
 */
export const BreathingPackDiagram: React.FC<{
  targetOtr?: number;
  rO2?: number;
  tempC?: number;
}> = ({ targetOtr = 1411, rO2 = 8.6, tempC = 12 }) => {
  return (
    <figure className="card card--framed p-6 space-y-4">
      {/* Figure header */}
      <div className="card-header">
        <span className="label">Gas Exchange Equilibrium</span>
        <span className="caption">Fig. 1 · MAP Schematic</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Technical SVG drawing */}
        <div className="md:col-span-7">
          <svg
            viewBox="0 0 420 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-label="Cross-section diagram of gas exchange through breathable film package"
          >
            <defs>
              {/* Hatching pattern for film cross-section */}
              <pattern id="hatch-film" width="4" height="4" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="4" stroke="#241E18" strokeWidth="0.75" />
              </pattern>
              <pattern id="hatch-tomato" width="3" height="3" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="3" stroke="#241E18" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>

            {/* Inflow Arrow (O2) anchored precisely to Left Pack Wall at x=80 */}
            <g className="inflow-group">
              <line x1="16" y1="75" x2="80" y2="75" stroke="#241E18" strokeWidth="1.25" />
              <polygon points="80,75 72,71 72,79" fill="#241E18" />
              {/* Text label outside drawing */}
              <text x="16" y="65" fill="#4A4036" fontSize="9.5" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="0.04em">
                O₂ INFLOW (21% atm)
              </text>
              <text x="16" y="90" fill="#857A6A" fontSize="8.5" fontFamily="IBM Plex Mono">
                OTR: {targetOtr.toLocaleString()} mL/m²·d·atm
              </text>
            </g>

            {/* Pack Outer Wall (x: 80 to 340, y: 30 to 190) */}
            <rect x="80" y="30" width="260" height="160" rx="3" stroke="#241E18" strokeWidth="1.25" fill="#FAF7F0" />
            
            {/* Film thickness double hairline on left wall */}
            <line x1="83" y1="30" x2="83" y2="190" stroke="#CFC5B3" strokeWidth="1" />
            <line x1="337" y1="30" x2="337" y2="190" stroke="#CFC5B3" strokeWidth="1" />

            {/* Micro-perforation tick indicators on film wall */}
            {[50, 75, 100, 125, 150, 170].map((y) => (
              <line key={y} x1="77" y1={y} x2="83" y2={y} stroke="#241E18" strokeWidth="1.25" />
            ))}

            {/* Headspace indicator label line */}
            <line x1="210" y1="30" x2="210" y2="52" stroke="#CFC5B3" strokeWidth="0.75" strokeDasharray="2 2" />
            <text x="210" y="24" textAnchor="middle" fill="#857A6A" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="500" fontVariant="small-caps">
              Internal Headspace (3–5% O₂ · &lt;5% CO₂)
            </text>

            {/* Produce inside: line plate with botanical hatching */}
            <ellipse cx="210" cy="120" rx="55" ry="42" stroke="#241E18" strokeWidth="1.25" fill="url(#hatch-tomato)" />
            {/* Calyx & Stem */}
            <path d="M210 78V72M210 78C206 75 200 76 195 78M210 78C214 75 220 76 225 78M210 78C208 81 204 83 200 84M210 78C212 81 216 83 220 84" stroke="#241E18" strokeWidth="1.25" strokeLinecap="round" />
            
            {/* Produce Annotation Label on leader line */}
            <circle cx="210" cy="120" r="1.5" fill="#241E18" />
            <polyline points="210,120 245,150 295,150" stroke="#4A4036" strokeWidth="0.75" fill="none" />
            <text x="298" y="148" fill="#241E18" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="600">
              Respiring Tissue
            </text>
            <text x="298" y="159" fill="#857A6A" fontSize="8" fontFamily="IBM Plex Mono">
              r_O₂: {rO2} mL/kg·h @ {tempC}°C
            </text>

            {/* Outflow Arrow (CO2) anchored precisely to Right Pack Wall at x=340 */}
            <g className="outflow-group">
              <line x1="340" y1="75" x2="404" y2="75" stroke="#241E18" strokeWidth="1.25" />
              <polygon points="404,75 396,71 396,79" fill="#241E18" />
              {/* Text label outside drawing */}
              <text x="404" y="65" textAnchor="end" fill="#4A4036" fontSize="9.5" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="0.04em">
                CO₂ OUTFLOW
              </text>
              <text x="404" y="90" textAnchor="end" fill="#857A6A" fontSize="8.5" fontFamily="IBM Plex Mono">
                Permeability: &gt; {Math.round(targetOtr * 0.8).toLocaleString()}
              </text>
            </g>

            {/* Dimension line at bottom */}
            <line x1="80" y1="205" x2="340" y2="205" stroke="#CFC5B3" strokeWidth="0.75" />
            <line x1="80" y1="201" x2="80" y2="209" stroke="#CFC5B3" strokeWidth="0.75" />
            <line x1="340" y1="201" x2="340" y2="209" stroke="#CFC5B3" strokeWidth="0.75" />
            <text x="210" y="215" textAnchor="middle" fill="#857A6A" fontSize="8" fontFamily="IBM Plex Mono">
              Equilibrium Area: 0.045 m² · Thickness: 25–35 µm
            </text>
          </svg>
        </div>

        {/* Text summary beside hero */}
        <div className="md:col-span-5 space-y-3 text-xs border-t md:border-t-0 md:border-l border-rule pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="label text-mute block mb-1">State Equation</span>
            <p className="font-serif text-base text-ink font-medium leading-snug">
              Active Steady-State Respiration
            </p>
          </div>
          <p className="text-ink-2 leading-relaxed font-normal text-xs">
            At <span className="font-mono font-medium text-ink">{tempC}°C</span>, commodity metabolic activity continuously consumes O₂ and evolves CO₂. The engine solves for a steady-state film transmission rate of <span className="font-mono font-medium text-ink">{targetOtr.toLocaleString()} mL/m²·day·atm</span> to maintain internal O₂ at 3–5% without triggering anaerobic fermentation.
          </p>

          <div className="border border-rule rounded p-2.5 bg-paper/60 space-y-1 text-[11px]">
            <div className="flex justify-between items-baseline">
              <span className="text-mute font-medium">Equilibrium OTR</span>
              <span className="font-mono font-medium text-ink">{targetOtr.toLocaleString()} mL/m²·d·atm</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-rule/60 pt-1">
              <span className="text-mute font-medium">Metabolic Consumption</span>
              <span className="font-mono font-medium text-ink">{rO2} mL O₂ / kg·h</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

/**
 * Technical Film Cross-Section
 * Multi-layer structure drawn to scale with hatched fills and leader annotations
 */
export const FilmLayerStack: React.FC<{ structure: string }> = ({ structure }) => {
  const s = structure.toLowerCase();
  const isFoil  = s.includes('alu') || s.includes('foil');
  const isMet   = s.includes('met-') || s.includes('metallised');
  const isMicro = s.includes('micro-perforat') || s.includes('perforat');
  const isBio   = s.includes('pla') || s.includes('pbat') || s.includes('compostable');

  type Layer = { label: string; thickness: string; role: string; hatch: string };

  const layers: Layer[] = isFoil
    ? [
        { label: 'PET', thickness: '12 µm', role: 'Print & tensile carrier', hatch: 'diagonal' },
        { label: 'Aluminium Foil', thickness: '9 µm', role: 'Gas & light barrier core', hatch: 'solid' },
        { label: 'LDPE', thickness: '50 µm', role: 'Hermetic heat seal layer', hatch: 'dots' },
      ]
    : isMet
    ? [
        { label: 'Met-PET', thickness: '12 µm', role: 'Vacuum-deposited Al barrier', hatch: 'diagonal' },
        { label: 'LDPE', thickness: '40 µm', role: 'Puncture & seal layer', hatch: 'dots' },
      ]
    : isMicro
    ? [
        { label: 'BOPP (Micro-perf)', thickness: '25 µm', role: 'Laser micro-perforated MAP membrane', hatch: 'grid' },
      ]
    : isBio
    ? [
        { label: 'PLA / PBAT', thickness: '30 µm', role: 'Compostable bio-polymer matrix', hatch: 'dots' },
      ]
    : [
        { label: 'Polyolefin Co-ex', thickness: '35 µm', role: 'Multi-layer co-extruded barrier', hatch: 'diagonal' },
      ];

  return (
    <div className="border border-rule rounded p-3 bg-paper/50 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="caption">Cross-Sectional Structure</span>
        <span className="font-mono text-mute text-[10px] truncate max-w-[55%]">{structure}</span>
      </div>

      <div className="space-y-1">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-2.5 py-1.5 border border-rule rounded-sm bg-card text-xs"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono font-medium text-ink text-[11px]">{layer.label}</span>
              <span className="font-mono text-[10px] text-mute">({layer.thickness})</span>
            </div>
            <span className="text-[11px] text-ink-2 font-normal text-right">{layer.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Empty & Error State Illustration
 * Technical line drawing of balance / specimen tray
 */
export const SpecimenTrayIllustration: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Open carton / sample plate */}
    <rect x="8" y="18" width="32" height="22" rx="2" stroke="#241E18" strokeWidth="1.25" />
    <line x1="8" y1="26" x2="40" y2="26" stroke="#CFC5B3" strokeWidth="1" />
    {/* Open flap lines */}
    <path d="M8 18L14 8L34 8L40 18" stroke="#241E18" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M14 8L20 18M34 8L28 18" stroke="#CFC5B3" strokeWidth="0.75" />
    {/* Center specimen target */}
    <circle cx="24" cy="34" r="3" stroke="#241E18" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <circle cx="24" cy="34" r="0.8" fill="#241E18" />
  </svg>
);
