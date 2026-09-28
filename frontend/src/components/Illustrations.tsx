import React from 'react';

/**
 * Technical line illustrations adapted to forest green palette
 * Stroke color: #1B4332 (--ink), accent details: #2D6A4F
 */

// 1. Tomato Plate (Solanum lycopersicum)
export const TomatoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="16" cy="18" rx="11" ry="9.5" stroke="#1B4332" strokeWidth="1.25" />
    <path d="M12 23C14 24.5 18 24.5 20 23M10 21C13 23 19 23 22 21M9 19C11 20.5 21 20.5 23 19" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 2" />
    <path d="M16 8.5V5.5M16 8.5C14 7 11 8 9 9M16 8.5C18 7 21 8 23 9M16 8.5C15 10.5 13 11 11 11.5M16 8.5C17 10.5 19 11 21 11.5" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 2. Button Mushroom (Agaricus bisporus)
export const MushroomIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Cap */}
    <path d="M6 18C6 11 10.5 6 16 6C21.5 6 26 11 26 18C26 19.5 24 20 23 19C20 18 12 18 9 19C8 20 6 19.5 6 18Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    {/* Gill margin */}
    <path d="M8 18.5C11 17.5 21 17.5 24 18.5" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 1.5" />
    {/* Stalk */}
    <path d="M13 19V26C13 27 19 27 19 26V19" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 22V25" stroke="#1B4332" strokeWidth="0.75" />
  </svg>
);

// 3. Leafy Greens Plate (Spinacia oleracea)
export const SpinachIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16 27V8M16 8C9 8 7 18 16 26C25 18 23 8 16 8Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M11 16C13.5 17 16 17 16 17M21 16C18.5 17 16 17 16 17M12 21C14 21.5 16 21.5 16 21.5M20 21C18 21.5 16 21.5 16 21.5" stroke="#1B4332" strokeWidth="0.75" strokeLinecap="round" />
  </svg>
);

// 4. Mango Plate (Mangifera indica)
export const MangoIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M17 6C11 6 7 12 9 20C10.5 25 15 27 20 25C25 23 26 15 23 10C21 7.5 19 6 17 6Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M17 6C17 4 16 3 15 2.5" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M11 20C13 23 17 24 19 23M12 17C14 20 18 21 20 20" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 2" />
  </svg>
);

// 5. Biscuit Plate (Triticum aestivum)
export const BiscuitIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="5" y="8" width="22" height="16" rx="2" stroke="#1B4332" strokeWidth="1.25" />
    <rect x="7.5" y="10.5" width="17" height="11" rx="1" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
    <circle cx="11" cy="14" r="0.8" fill="#1B4332" />
    <circle cx="16" cy="14" r="0.8" fill="#1B4332" />
    <circle cx="21" cy="14" r="0.8" fill="#1B4332" />
    <circle cx="11" cy="18" r="0.8" fill="#1B4332" />
    <circle cx="16" cy="18" r="0.8" fill="#1B4332" />
    <circle cx="21" cy="18" r="0.8" fill="#1B4332" />
  </svg>
);

// 6. Chips Pouch (Solanum tuberosum)
export const ChipsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M8 5L24 5L22 27L10 27L8 5Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    <line x1="8" y1="7.5" x2="24" y2="7.5" stroke="#1B4332" strokeWidth="0.75" />
    <line x1="10" y1="24.5" x2="22" y2="24.5" stroke="#1B4332" strokeWidth="0.75" />
    <path d="M11 12C13 14 19 14 21 12M11 16C13 18 19 18 21 16" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
  </svg>
);

// 7. Peanut Pod (Arachis hypogaea)
export const PeanutIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M16 6C13 6 11 8.5 11 11.5C11 13.5 12 15 13.5 16C12 17 11 18.5 11 20.5C11 23.5 13 26 16 26C19 26 21 23.5 21 20.5C21 18.5 20 17 18.5 16C20 15 21 13.5 21 11.5C21 8.5 19 6 16 6Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M14 11C15 12 17 12 18 11M14 21C15 22 17 22 18 21" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 1.5" />
  </svg>
);

// 8. Coffee Beans (Coffea arabica)
export const CoffeeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="16" cy="16" rx="9" ry="6.5" transform="rotate(-30 16 16)" stroke="#1B4332" strokeWidth="1.25" />
    <path d="M11 13C13 14 15 14 16 16C17 18 19 18 21 19" stroke="#1B4332" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 9. Whole Red Chili (Capsicum annuum)
export const ChiliIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M22 6C20 8 18 13 15 18C12 23 8 26 6 26C8 26 14 24 18 18C22 12 24 8 22 6Z" stroke="#1B4332" strokeWidth="1.25" strokeLinejoin="round" />
    <path d="M22 6C24 4.5 25 3 24 2" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

// 10. Generic Produce Fruit / Apple
export const GenericProduceIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="16" cy="18" r="9" stroke="#1B4332" strokeWidth="1.25" />
    <path d="M16 9V5C16 5 18 4 19 5" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
    <path d="M16 7C14 7 12 8 11 9" stroke="#1B4332" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 11. Generic Dry Food / Grain Pouch
export const GenericDryIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="7" y="6" width="18" height="20" rx="3" stroke="#1B4332" strokeWidth="1.25" />
    <line x1="7" y1="10" x2="25" y2="10" stroke="#1B4332" strokeWidth="0.75" />
    <circle cx="16" cy="17" r="3.5" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 1.5" />
  </svg>
);

export const CommodityPlate: React.FC<{
  commodityId?: string;
  isRespiring: boolean;
  className?: string;
}> = ({ commodityId, isRespiring, className = 'w-6 h-6' }) => {
  switch (commodityId) {
    case 'CMD-001': return <TomatoIcon className={className} />;
    case 'CMD-002': return <MushroomIcon className={className} />;
    case 'CMD-003': return <SpinachIcon className={className} />;
    case 'CMD-004': return <MangoIcon className={className} />;
    case 'CMD-005': return <BiscuitIcon className={className} />;
    case 'CMD-006': return <ChipsIcon className={className} />;
    case 'CMD-007': return <PeanutIcon className={className} />;
    case 'CMD-008': return <CoffeeIcon className={className} />;
    case 'CMD-009': return <ChiliIcon className={className} />;
    default:
      return isRespiring ? <GenericProduceIcon className={className} /> : <GenericDryIcon className={className} />;
  }
};

export const getBotanicalName = (commodityId?: string, fallback = ''): string => {
  switch (commodityId) {
    case 'CMD-001': return 'Solanum lycopersicum';
    case 'CMD-002': return 'Agaricus bisporus';
    case 'CMD-003': return 'Spinacia oleracea';
    case 'CMD-004': return 'Mangifera indica';
    case 'CMD-005': return 'Triticum aestivum (Baked)';
    case 'CMD-006': return 'Solanum tuberosum (Fried)';
    case 'CMD-007': return 'Arachis hypogaea';
    case 'CMD-008': return 'Coffea arabica';
    case 'CMD-009': return 'Capsicum annuum (Dried)';
    case 'CMD-010': return 'Vitis vinifera (Dried)';
    default: return fallback || 'Specimen';
  }
};

/**
 * Specimen Graphic Renderer for Inside Packaging Diagrams
 * Renders the accurate botanical vector drawing at scale with fine technical shading
 */
export const SpecimenGraphic: React.FC<{
  commodityId?: string;
  isProduce?: boolean;
}> = ({ commodityId, isProduce = true }) => {
  switch (commodityId) {
    case 'CMD-001': // Tomato
      return (
        <g id="specimen-tomato">
          <ellipse cx="0" cy="0" rx="46" ry="36" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          {/* Internal botanical curve & shading */}
          <path d="M-22 15C-12 22 12 22 22 15M-28 8C-14 18 14 18 28 8M-30 0C-16 10 16 10 30 0" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
          {/* Calyx & Stem */}
          <path d="M0 -36V-45M0 -36C-6 -42 -18 -40 -24 -36M0 -36C6 -42 18 -40 24 -36M0 -36C-4 -30 -14 -26 -20 -24M0 -36C4 -30 14 -26 20 -24" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 'CMD-002': // Mushroom
      return (
        <g id="specimen-mushroom">
          {/* Cap */}
          <path d="M-42 6C-42 -22 -20 -36 0 -36C20 -36 42 -22 42 6C42 10 36 12 32 10C24 6 12 4 0 4C-12 4 -24 6 -32 10C-36 12 -42 10 -42 6Z" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
          {/* Gill lines */}
          <path d="M-36 8C-20 4 20 4 36 8M-28 6C-15 2 15 2 28 6" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2" />
          {/* Stalk */}
          <path d="M-14 8V28C-14 34 14 34 14 28V8" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#FFFFFF" />
          <line x1="-5" y1="14" x2="-5" y2="24" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2" />
        </g>
      );
    case 'CMD-003': // Spinach
      return (
        <g id="specimen-spinach">
          <path d="M0 32V-34M0 -34C-30 -34 -38 0 0 28C38 0 30 -34 0 -34Z" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
          <path d="M-18 -12C-9 -8 0 -8 0 -8M18 -12C9 -8 0 -8 0 -8M-22 4C-11 6 0 6 0 6M22 4C11 6 0 6 0 6M-16 18C-8 19 0 19 0 19M16 18C8 19 0 19 0 19" stroke="#1B4332" strokeWidth="1" strokeLinecap="round" />
        </g>
      );
    case 'CMD-004': // Mango
      return (
        <g id="specimen-mango">
          <path d="M6 -36C-18 -36 -38 -12 -30 16C-24 30 -10 36 8 32C26 26 36 4 26 -16C20 -28 14 -36 6 -36Z" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
          <path d="M6 -36C6 -44 4 -48 0 -50" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M-18 8C-12 18 2 22 10 20M-12 -2C-4 8 10 12 16 10" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2" />
        </g>
      );
    case 'CMD-005': // Biscuits
      return (
        <g id="specimen-biscuit">
          {/* Stacked biscuits */}
          <rect x="-42" y="-20" width="84" height="42" rx="5" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <rect x="-35" y="-14" width="70" height="30" rx="3" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="2 2" />
          {/* Docking pinholes */}
          {[-22, 0, 22].map((x) => (
            <React.Fragment key={x}>
              <circle cx={x} cy="-6" r="1.5" fill="#1B4332" />
              <circle cx={x} cy="8" r="1.5" fill="#1B4332" />
            </React.Fragment>
          ))}
        </g>
      );
    case 'CMD-006': // Chips
      return (
        <g id="specimen-chips">
          {/* Multiple overlapping chips */}
          <ellipse cx="-15" cy="-8" rx="26" ry="18" transform="rotate(-15 -15 -8)" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <path d="M-30 -12C-20 -4 -8 -6 0 -12M-24 -4C-16 2 -4 0 4 -4" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 2" />
          <ellipse cx="14" cy="8" rx="28" ry="19" transform="rotate(20 14 8)" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <path d="M-2 4C8 12 20 10 28 4M2 12C12 18 22 16 30 12" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1 2" />
        </g>
      );
    case 'CMD-007': // Peanut
      return (
        <g id="specimen-peanut">
          <path d="M0 -34C-14 -34 -22 -22 -22 -10C-22 -2 -16 4 -10 8C-16 12 -22 18 -22 26C-22 36 -12 44 0 44C12 44 22 36 22 26C22 18 16 12 10 8C16 4 22 -2 22 -10C22 -22 14 -34 0 -34Z" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" strokeLinejoin="round" />
          <path d="M-10 -14C-4 -10 4 -10 10 -14M-10 24C-4 28 4 28 10 24" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2" />
        </g>
      );
    case 'CMD-008': // Coffee
      return (
        <g id="specimen-coffee">
          <ellipse cx="-12" cy="0" rx="20" ry="14" transform="rotate(-25 -12 0)" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <path d="M-22 -6C-16 -2 -12 2 -8 4C-4 6 0 4 4 2" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
          <ellipse cx="14" cy="4" rx="18" ry="13" transform="rotate(35 14 4)" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <path d="M6 10C10 6 14 4 18 2C22 0 24 2 26 4" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
        </g>
      );
    default:
      if (isProduce) {
        return (
          <g id="specimen-generic-produce">
            <circle cx="0" cy="2" r="34" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
            <path d="M0 -32V-44C0 -44 4 -48 10 -46" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 -38C-8 -38 -16 -34 -20 -30" stroke="#1B4332" strokeWidth="1.25" strokeLinecap="round" />
            <path d="M-16 10C-6 20 6 20 16 10" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="1.5 2" />
          </g>
        );
      }
      return (
        <g id="specimen-generic-dry">
          <rect x="-35" y="-22" width="70" height="44" rx="6" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />
          <line x1="-35" y1="-12" x2="35" y2="-12" stroke="#1B4332" strokeWidth="0.75" />
          <circle cx="0" cy="8" r="8" stroke="#1B4332" strokeWidth="0.75" strokeDasharray="2 2" />
        </g>
      );
  }
};

/**
 * Hero Gas Exchange Schematic (Fig. 1) — Fully Non-Overlapping & Dynamic
 */
export const BreathingPackDiagram: React.FC<{
  commodityId?: string;
  commodityName?: string;
  targetOtr?: number;
  rO2?: number;
  tempC?: number;
  minCo2Perm?: number;
  packArea?: number;
}> = ({
  commodityId = 'CMD-001',
  commodityName = 'Fresh Tomato',
  targetOtr = 1411,
  rO2 = 8.6,
  tempC = 12,
  minCo2Perm,
  packArea = 0.045,
}) => {
  const botanical = getBotanicalName(commodityId);
  const co2Target = minCo2Perm || Math.round(targetOtr * 0.8);

  return (
    <figure className="card card--framed p-6 space-y-4">
      {/* Figure header */}
      <div className="card-header flex items-center justify-between pb-3 border-b border-rule">
        <div>
          <span className="label">Gas Exchange Equilibrium</span>
          <h4 className="font-serif text-lg text-ink">
            Modified Atmosphere Packaging (MAP) Schematic
          </h4>
        </div>
        <span className="caption font-mono text-[11px]">Fig. 1 · Respiration Solver</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Technical SVG drawing with generous spacing — ZERO TEXT OVERLAP */}
        <div className="lg:col-span-8">
          <svg
            viewBox="0 0 620 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-label="Gas exchange schematic through breathable film package"
          >
            {/* ========================================================
                LEFT ZONE: O2 INFLOW (Strictly from x=15 to x=140)
               ======================================================== */}
            <g className="inflow-group">
              {/* Category label */}
              <text x="20" y="52" fill="#2D6A4F" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" letterSpacing="0.05em">
                O₂ INFLOW
              </text>
              <text x="20" y="66" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="500">
                21% Atmospheric O₂
              </text>

              {/* Inflow Arrow anchored cleanly to left pack wall at x=150 */}
              <line x1="20" y1="80" x2="148" y2="80" stroke="#1B4332" strokeWidth="1.5" />
              <polygon points="148,80 138,75 138,85" fill="#1B4332" />

              {/* Target OTR numerical block */}
              <text x="20" y="105" fill="#7A7A6C" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="600">
                TARGET OTR
              </text>
              <text x="20" y="123" fill="#1B4332" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">
                {targetOtr.toLocaleString()}
              </text>
              <text x="20" y="137" fill="#7A7A6C" fontSize="8" fontFamily="JetBrains Mono">
                mL / m²·day·atm
              </text>
            </g>

            {/* ========================================================
                PACKAGE OUTER WALL (x=150 to x=470, y=34 to y=204)
               ======================================================== */}
            {/* Outer perimeter */}
            <rect x="150" y="34" width="320" height="170" rx="8" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />

            {/* Film thickness double hairline */}
            <line x1="154" y1="34" x2="154" y2="204" stroke="#D4CFC3" strokeWidth="1" />
            <line x1="466" y1="34" x2="466" y2="204" stroke="#D4CFC3" strokeWidth="1" />

            {/* Micro-perforation ticks on breathable film */}
            {[55, 80, 105, 130, 155, 180].map((y) => (
              <line key={y} x1="146" y1={y} x2="154" y2={y} stroke="#1B4332" strokeWidth="1.5" />
            ))}

            {/* Top Headspace label (Cleanly centered above box) */}
            <text x="310" y="24" textAnchor="middle" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="0.05em">
              INTERNAL HEADSPACE (3–5% O₂ · &lt;5% CO₂)
            </text>
            <line x1="310" y1="28" x2="310" y2="34" stroke="#D4CFC3" strokeWidth="1" strokeDasharray="2 2" />

            {/* Dynamic Commodity Specimen Vector Drawing */}
            <g transform="translate(310, 85)">
              <SpecimenGraphic commodityId={commodityId} isProduce={true} />
            </g>

            {/* Centered Specimen Info Card Inside Box — NO cross lines or collisions */}
            <rect x="180" y="135" width="260" height="48" rx="6" fill="#F5F0E8" stroke="#D4CFC3" strokeWidth="0.75" />
            <text x="310" y="152" textAnchor="middle" fill="#1B4332" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700">
              {commodityName} <tspan fontStyle="italic" fontWeight="400" fill="#7A7A6C">({botanical})</tspan>
            </text>
            <text x="310" y="169" textAnchor="middle" fill="#2D6A4F" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600">
              Metabolic Rate: <tspan fontFamily="JetBrains Mono" fill="#1B4332">{rO2} mL/kg·h</tspan> <tspan fill="#7A7A6C">@ {tempC}°C</tspan>
            </text>

            {/* ========================================================
                RIGHT ZONE: CO2 OUTFLOW (Strictly from x=480 to x=615)
               ======================================================== */}
            <g className="outflow-group">
              {/* Category label */}
              <text x="485" y="52" fill="#2D6A4F" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" letterSpacing="0.05em">
                CO₂ OUTFLOW
              </text>
              <text x="485" y="66" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="500">
                Respiration Byproduct
              </text>

              {/* Outflow Arrow anchored cleanly from right pack wall at x=470 */}
              <line x1="470" y1="80" x2="598" y2="80" stroke="#1B4332" strokeWidth="1.5" />
              <polygon points="598,80 588,75 588,85" fill="#1B4332" />

              {/* Target Permeability numerical block */}
              <text x="485" y="105" fill="#7A7A6C" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="600">
                MIN CO₂ PERMEABILITY
              </text>
              <text x="485" y="123" fill="#1B4332" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">
                &gt; {co2Target.toLocaleString()}
              </text>
              <text x="485" y="137" fill="#7A7A6C" fontSize="8" fontFamily="JetBrains Mono">
                mL / m²·day
              </text>
            </g>

            {/* ========================================================
                BOTTOM DIMENSION LINE (x=150 to x=470)
               ======================================================== */}
            <line x1="150" y1="216" x2="470" y2="216" stroke="#D4CFC3" strokeWidth="1" />
            <line x1="150" y1="211" x2="150" y2="221" stroke="#D4CFC3" strokeWidth="1" />
            <line x1="470" y1="211" x2="470" y2="221" stroke="#D4CFC3" strokeWidth="1" />
            <text x="310" y="230" textAnchor="middle" fill="#7A7A6C" fontSize="8.5" fontFamily="JetBrains Mono">
              Equilibrium Area: {packArea} m² · Film Gauge: 25–35 µm
            </text>
          </svg>
        </div>

        {/* Text summary beside hero */}
        <div className="lg:col-span-4 space-y-3 text-xs border-t lg:border-t-0 lg:border-l border-rule pt-4 lg:pt-0 lg:pl-6">
          <div>
            <span className="label block mb-1">State Equation</span>
            <p className="font-serif text-base text-ink leading-snug">
              Active Steady-State Respiration
            </p>
          </div>
          <p className="text-ink-2 leading-relaxed font-normal text-xs">
            At <span className="font-mono font-medium text-ink">{tempC}°C</span>, metabolic activity of <span className="font-medium text-ink">{commodityName}</span> continuously consumes O₂ and evolves CO₂. The engine solves for a steady-state film transmission rate of <span className="font-mono font-medium text-ink">{targetOtr.toLocaleString()} mL/m²·day·atm</span> to maintain internal O₂ at 3–5% without triggering anaerobic fermentation.
          </p>

          <div className="border border-rule rounded-lg p-3 bg-paper space-y-2 text-[11px]">
            <div className="flex justify-between items-baseline">
              <span className="text-mute font-medium">Equilibrium OTR</span>
              <span className="font-mono font-semibold text-ink">{targetOtr.toLocaleString()} mL/m²·d·atm</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-rule/60 pt-2">
              <span className="text-mute font-medium">Metabolic Consumption</span>
              <span className="font-mono font-semibold text-ink">{rO2} mL O₂ / kg·h</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-rule/60 pt-2">
              <span className="text-mute font-medium">CO₂ Evacuation Req.</span>
              <span className="font-mono font-semibold text-ink">&gt; {co2Target.toLocaleString()} mL/m²·d</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

/**
 * Hero Moisture & Oxygen Barrier Schematic (Fig. 1 for Dry Goods)
 */
export const HermeticBarrierDiagram: React.FC<{
  commodityId?: string;
  commodityName?: string;
  maxWvtr?: number;
  maxOtr?: number;
  allowableWaterGainG?: number;
  packArea?: number;
  shelfLifeDays?: number;
  critMoisture?: number;
}> = ({
  commodityId = 'CMD-005',
  commodityName = 'Biscuits / Cookies',
  maxWvtr = 1.2,
  maxOtr = 15,
  allowableWaterGainG = 1.4,
  packArea = 0.08,
  shelfLifeDays = 90,
  critMoisture = 6.0,
}) => {
  const botanical = getBotanicalName(commodityId);

  return (
    <figure className="card card--framed p-6 space-y-4">
      {/* Figure header */}
      <div className="card-header flex items-center justify-between pb-3 border-b border-rule">
        <div>
          <span className="label">Hermetic Barrier Protection</span>
          <h4 className="font-serif text-lg text-ink">
            Moisture Sorption &amp; Oxidation Ingress Barrier
          </h4>
        </div>
        <span className="caption font-mono text-[11px]">Fig. 1 · Fickian Ingress Model</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Technical SVG drawing */}
        <div className="lg:col-span-8">
          <svg
            viewBox="0 0 620 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-label="Hermetic barrier protection schematic"
          >
            {/* Left Zone: Moisture Ingress Blocked */}
            <g className="wvtr-shield-group">
              <text x="20" y="52" fill="#B87333" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" letterSpacing="0.05em">
                H₂O VAPOR SHIELD
              </text>
              <text x="20" y="66" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="500">
                Prevents Moisture Pickup
              </text>

              {/* Blocked arrow */}
              <line x1="20" y1="80" x2="136" y2="80" stroke="#B87333" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="140" y1="72" x2="140" y2="88" stroke="#B87333" strokeWidth="3" />

              <text x="20" y="105" fill="#7A7A6C" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="600">
                MAX PERMISSIBLE WVTR
              </text>
              <text x="20" y="123" fill="#1B4332" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">
                &lt; {maxWvtr ? maxWvtr.toFixed(2) : '1.20'}
              </text>
              <text x="20" y="137" fill="#7A7A6C" fontSize="8" fontFamily="JetBrains Mono">
                g / m²·day
              </text>
            </g>

            {/* Packaging Envelope */}
            <rect x="150" y="34" width="320" height="170" rx="8" stroke="#1B4332" strokeWidth="1.5" fill="#FFFFFF" />

            {/* Barrier laminate multi-layer lines */}
            <line x1="154" y1="34" x2="154" y2="204" stroke="#B87333" strokeWidth="1.5" />
            <line x1="466" y1="34" x2="466" y2="204" stroke="#B87333" strokeWidth="1.5" />

            {/* Top Label */}
            <text x="310" y="24" textAnchor="middle" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600" letterSpacing="0.05em">
              HERMETIC SEALED ENVIRONMENT (aw &lt; 0.30 · 0% RH)
            </text>

            {/* Specimen vector graphic */}
            <g transform="translate(310, 85)">
              <SpecimenGraphic commodityId={commodityId} isProduce={false} />
            </g>

            {/* Specimen Info Card */}
            <rect x="180" y="135" width="260" height="48" rx="6" fill="#F5F0E8" stroke="#D4CFC3" strokeWidth="0.75" />
            <text x="310" y="152" textAnchor="middle" fill="#1B4332" fontSize="10" fontFamily="Plus Jakarta Sans" fontWeight="700">
              {commodityName} <tspan fontStyle="italic" fontWeight="400" fill="#7A7A6C">({botanical})</tspan>
            </text>
            <text x="310" y="169" textAnchor="middle" fill="#B87333" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="600">
              Crit. Moisture Limit: <tspan fontFamily="JetBrains Mono" fill="#1B4332">{critMoisture}%</tspan> · Shelf Life: <tspan fontFamily="JetBrains Mono" fill="#1B4332">{shelfLifeDays}d</tspan>
            </text>

            {/* Right Zone: Oxygen Ingress Shield */}
            <g className="otr-shield-group">
              <text x="485" y="52" fill="#2D6A4F" fontSize="11" fontFamily="Plus Jakarta Sans" fontWeight="700" letterSpacing="0.05em">
                O₂ OXIDATION SHIELD
              </text>
              <text x="485" y="66" fill="#7A7A6C" fontSize="9" fontFamily="Plus Jakarta Sans" fontWeight="500">
                Inhibits Lipid Rancidity
              </text>

              {/* Blocked arrow from right */}
              <line x1="600" y1="80" x2="484" y2="80" stroke="#1B4332" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="480" y1="72" x2="480" y2="88" stroke="#1B4332" strokeWidth="3" />

              <text x="485" y="105" fill="#7A7A6C" fontSize="8.5" fontFamily="Plus Jakarta Sans" fontWeight="600">
                MAX PERMISSIBLE OTR
              </text>
              <text x="485" y="123" fill="#1B4332" fontSize="13" fontFamily="JetBrains Mono" fontWeight="700">
                &lt; {maxOtr ? maxOtr.toFixed(1) : '15.0'}
              </text>
              <text x="485" y="137" fill="#7A7A6C" fontSize="8" fontFamily="JetBrains Mono">
                mL / m²·day·atm
              </text>
            </g>

            {/* Bottom Dimension Line */}
            <line x1="150" y1="216" x2="470" y2="216" stroke="#D4CFC3" strokeWidth="1" />
            <line x1="150" y1="211" x2="150" y2="221" stroke="#D4CFC3" strokeWidth="1" />
            <line x1="470" y1="211" x2="470" y2="221" stroke="#D4CFC3" strokeWidth="1" />
            <text x="310" y="230" textAnchor="middle" fill="#7A7A6C" fontSize="8.5" fontFamily="JetBrains Mono">
              Pack Surface: {packArea} m² · Allowable H₂O Gain: &lt; {allowableWaterGainG}g
            </text>
          </svg>
        </div>

        {/* Text summary beside hero */}
        <div className="lg:col-span-4 space-y-3 text-xs border-t lg:border-t-0 lg:border-l border-rule pt-4 lg:pt-0 lg:pl-6">
          <div>
            <span className="label block mb-1">State Equation</span>
            <p className="font-serif text-base text-ink leading-snug">
              Hermetic Moisture Barrier
            </p>
          </div>
          <p className="text-ink-2 leading-relaxed font-normal text-xs">
            For low-moisture processed products like <span className="font-medium text-ink">{commodityName}</span>, shelf-life is strictly governed by water vapor sorption and lipid oxidation. The engine computes barrier limits to keep moisture gain under <span className="font-mono font-medium text-ink">{allowableWaterGainG}g</span> across {shelfLifeDays} days.
          </p>

          <div className="border border-rule rounded-lg p-3 bg-paper space-y-2 text-[11px]">
            <div className="flex justify-between items-baseline">
              <span className="text-mute font-medium">Critical WVTR</span>
              <span className="font-mono font-semibold text-ink">&lt; {maxWvtr ? maxWvtr.toFixed(2) : '1.20'} g/m²·d</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-rule/60 pt-2">
              <span className="text-mute font-medium">Critical OTR</span>
              <span className="font-mono font-semibold text-ink">&lt; {maxOtr ? maxOtr.toFixed(1) : '15.0'} mL/m²·d·atm</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-rule/60 pt-2">
              <span className="text-mute font-medium">Max Moisture Gain</span>
              <span className="font-mono font-semibold text-ink">&lt; {allowableWaterGainG} g</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};

/**
 * Technical Film Cross-Section
 */
export const FilmLayerStack: React.FC<{ structure: string }> = ({ structure }) => {
  const s = structure.toLowerCase();
  const isFoil  = s.includes('alu') || s.includes('foil');
  const isMet   = s.includes('met-') || s.includes('metallised');
  const isMicro = s.includes('micro-perforat') || s.includes('perforat');
  const isBio   = s.includes('pla') || s.includes('pbat') || s.includes('compostable');

  type Layer = { label: string; thickness: string; role: string; hatch: string };

  const layers: Layer[] = [];

  if (isFoil) {
    layers.push({ label: 'PET (Print Carrier)', thickness: '12 µm', role: 'Mechanical & Print', hatch: 'solid' });
    layers.push({ label: 'Adhesive Primer', thickness: '3 µm', role: 'Tie Layer', hatch: 'dots' });
    layers.push({ label: 'Aluminium Foil', thickness: '7–9 µm', role: 'Total Gas/Moisture Barrier', hatch: 'metal' });
    layers.push({ label: 'Adhesive Primer', thickness: '3 µm', role: 'Tie Layer', hatch: 'dots' });
    layers.push({ label: 'Polyethylene (LLDPE)', thickness: '35–50 µm', role: 'Hermetic Heat Seal', hatch: 'lines' });
  } else if (isMet) {
    layers.push({ label: 'BOPP / PET (Print Face)', thickness: '15–20 µm', role: 'Mechanical & Gloss', hatch: 'solid' });
    layers.push({ label: 'Vacuum Metallised Al Layer', thickness: '0.04 µm', role: 'Light & Gas Barrier', hatch: 'metal' });
    layers.push({ label: 'Extrusion Lamination', thickness: '10 µm', role: 'Bonding Matrix', hatch: 'dots' });
    layers.push({ label: 'Cast PP / LLDPE', thickness: '25–40 µm', role: 'Sealant & Puncture Resistance', hatch: 'lines' });
  } else if (isMicro) {
    layers.push({ label: 'Biaxially Oriented PP (BOPP)', thickness: '25–30 µm', role: 'Anti-Fog Clarity Carrier', hatch: 'solid' });
    layers.push({ label: 'Laser Micro-Perforations', thickness: '50–100 µm ⌀', role: 'Targeted O₂/CO₂ Flux Orifice', hatch: 'dots' });
    layers.push({ label: 'Corona-Treated Seal Margin', thickness: 'Full Film', role: 'Thermal Crimp Seal', hatch: 'lines' });
  } else if (isBio) {
    layers.push({ label: 'PLA (Bio-derived Polyester)', thickness: '20 µm', role: 'Rigid Compostable Face', hatch: 'solid' });
    layers.push({ label: 'Bio-PBS / PBAT Blend', thickness: '25–35 µm', role: 'Flexible Biodegradable Sealant', hatch: 'lines' });
  } else {
    layers.push({ label: 'Outer Structural Substrate', thickness: '15–25 µm', role: 'Abrasion & Print Web', hatch: 'solid' });
    layers.push({ label: 'Core Polymer Barrier', thickness: '15–30 µm', role: 'Permeation Regulator', hatch: 'lines' });
    layers.push({ label: 'Food-Contact Seal Layer', thickness: '25–40 µm', role: 'Low-Temp Heat Seal', hatch: 'dots' });
  }

  return (
    <div className="space-y-1.5 font-mono text-xs">
      <div className="flex justify-between text-[10px] text-mute uppercase tracking-widest pb-1 border-b border-rule">
        <span>Layer Assembly (Exterior → Interior)</span>
        <span>Gauge</span>
      </div>
      {layers.map((layer, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between py-1 px-2 rounded bg-paper border border-rule/50 text-[11px]"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-sans font-medium text-ink">{layer.label}</span>
            <span className="text-mute text-[10px]">({layer.role})</span>
          </div>
          <span className="font-mono text-mute">{layer.thickness}</span>
        </div>
      ))}
    </div>
  );
};

export const SpecimenTrayIllustration: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="6" y="14" width="36" height="24" rx="3" stroke="#1B4332" strokeWidth="1.5" />
    <path d="M12 22C16 26 22 26 26 22M22 28C26 32 32 32 36 28" stroke="#2D6A4F" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="24" cy="24" r="5" stroke="#1B4332" strokeWidth="1.25" />
    <line x1="24" y1="10" x2="24" y2="14" stroke="#1B4332" strokeWidth="1.5" />
  </svg>
);
