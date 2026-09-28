import React from 'react';

export const MascotBox: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} mascot-bounce`}
    aria-hidden="true"
  >
    {/* Box Body */}
    <rect x="6" y="10" width="36" height="32" rx="6" fill="#FFD23F" stroke="#111111" strokeWidth="3" />
    {/* Box Flap Top */}
    <path d="M6 16L24 22L42 16" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Smiling Eyes */}
    <circle cx="18" cy="28" r="2.5" fill="#111111" />
    <circle cx="30" cy="28" r="2.5" fill="#111111" />
    {/* Cheerful Smile */}
    <path d="M20 34C22 36 26 36 28 34" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const TomatoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <ellipse cx="20" cy="23" rx="15" ry="13" fill="#FF5A4E" stroke="#111111" strokeWidth="3" />
    {/* Stem & Leaves */}
    <path d="M20 10V6M16 8C18 9 22 9 24 8M13 12C16 11 20 11 22 13M27 12C24 11 20 11 18 13" stroke="#3DDC84" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="15" cy="18" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const BiscuitIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="6" y="8" width="28" height="24" rx="5" fill="#FFD23F" stroke="#111111" strokeWidth="3" />
    <circle cx="12" cy="15" r="1.5" fill="#111111" />
    <circle cx="20" cy="15" r="1.5" fill="#111111" />
    <circle cx="28" cy="15" r="1.5" fill="#111111" />
    <circle cx="12" cy="25" r="1.5" fill="#111111" />
    <circle cx="20" cy="25" r="1.5" fill="#111111" />
    <circle cx="28" cy="25" r="1.5" fill="#111111" />
  </svg>
);

export const ChipsIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M10 6L30 6L28 34L12 34L10 6Z" fill="#FF5A4E" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
    <path d="M10 12L30 12" stroke="#111111" strokeWidth="2.5" />
    <path d="M12 28L28 28" stroke="#111111" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="5" fill="#FFD23F" stroke="#111111" strokeWidth="2" />
  </svg>
);

export const MangoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M22 8C14 8 8 16 11 26C13 32 20 34 26 31C32 28 33 18 29 12C26 9 24 8 22 8Z" fill="#FFD23F" stroke="#111111" strokeWidth="3" />
    <path d="M22 8C22 5 20 4 19 3M21 6C24 5 28 6 30 7" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const SpinachIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M20 34V12M20 12C12 12 10 24 20 32C30 24 28 12 20 12Z" fill="#3DDC84" stroke="#111111" strokeWidth="3" strokeLinejoin="round" />
    <path d="M12 22C16 23 20 23 20 23M28 22C24 23 20 23 20 23" stroke="#111111" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CommoditySticker: React.FC<{ commodityId?: string; isRespiring: boolean; className?: string }> = ({
  commodityId,
  isRespiring,
  className = 'w-12 h-12',
}) => {
  if (commodityId === 'CMD-001') return <TomatoIcon className={className} />;
  if (commodityId === 'CMD-005') return <BiscuitIcon className={className} />;
  if (commodityId === 'CMD-006') return <ChipsIcon className={className} />;
  if (commodityId === 'CMD-004') return <MangoIcon className={className} />;
  if (commodityId === 'CMD-003' || commodityId === 'CMD-002') return <SpinachIcon className={className} />;
  return isRespiring ? <TomatoIcon className={className} /> : <BiscuitIcon className={className} />;
};

/**
 * Breathing Pack Hero Visual Diagram
 * Shows O2 arrows entering and CO2 arrows venting out through the film
 */
export const BreathingPackDiagram: React.FC<{
  targetOtr?: number;
  rO2?: number;
  tempC?: number;
}> = ({ targetOtr = 1411, rO2 = 8.6, tempC = 12 }) => {
  return (
    <div className="brutal-card p-4 sm:p-5 bg-card border-3 border-ink rounded-brutal shadow-brutal relative overflow-hidden my-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Animated SVG Diagram */}
        <div className="relative w-full max-w-[280px] h-[160px] flex items-center justify-center">
          <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
            {/* Ambient Air Inflow Side (Left) */}
            <g className="gas-drift-in">
              <path d="M15 50H45M45 50L35 44M45 50L35 56" stroke="#6EC5FF" strokeWidth="3" strokeLinecap="round" />
              <text x="15" y="40" fill="#111111" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">O₂ (21%)</text>

              <path d="M15 105H45M45 105L35 99M45 105L35 111" stroke="#6EC5FF" strokeWidth="3" strokeLinecap="round" />
              <text x="15" y="95" fill="#111111" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">O₂ Inflow</text>
            </g>

            {/* Package Film Membrane */}
            <rect x="55" y="20" width="165" height="120" rx="14" fill="#FFF8E7" stroke="#111111" strokeWidth="3.5" />
            
            {/* Micro-perforations / Breathable pores */}
            <line x1="55" y1="40" x2="55" y2="44" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="60" x2="55" y2="64" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="80" x2="55" y2="84" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="100" x2="55" y2="104" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="120" x2="55" y2="124" stroke="#111111" strokeWidth="4" strokeLinecap="round" />

            {/* Produce inside pack (Tomato) */}
            <ellipse cx="138" cy="84" rx="34" ry="28" fill="#FF5A4E" stroke="#111111" strokeWidth="3" />
            <path d="M138 56V50M132 53C135 55 141 55 144 53" stroke="#3DDC84" strokeWidth="3" strokeLinecap="round" />
            <text x="110" y="88" fill="#FFFFFF" fontSize="11" fontWeight="800">PRODUCE</text>
            <text x="115" y="100" fill="#FFFFFF" fontSize="9" fontFamily="JetBrains Mono">{rO2} mL/kg·h</text>

            {/* Equilibrium Gas State Label */}
            <rect x="100" y="26" width="76" height="18" rx="4" fill="#3DDC84" stroke="#111111" strokeWidth="2" />
            <text x="105" y="38" fill="#111111" fontSize="9" fontWeight="800">3–5% O₂ MAP</text>

            {/* CO2 Outflow Side (Right) */}
            <g className="gas-drift-out">
              <path d="M225 60H260M260 60L250 54M260 60L250 66" stroke="#FF5A4E" strokeWidth="3" strokeLinecap="round" />
              <text x="225" y="50" fill="#111111" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">CO₂ Out</text>

              <path d="M225 110H260M260 110L250 104M260 110L250 116" stroke="#FF5A4E" strokeWidth="3" strokeLinecap="round" />
              <text x="225" y="100" fill="#111111" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">&lt;4% CO₂</text>
            </g>
          </svg>
        </div>

        {/* Text Description Beside Hero Diagram */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="inline-flex items-center space-x-1.5 bg-sun text-ink font-bold px-2.5 py-1 rounded-md border-2 border-ink shadow-brutal-sm">
            <span>Hero Demo: Active Gas Equilibrium</span>
          </div>
          <h4 className="text-sm font-extrabold text-ink">
            Modified Atmosphere "Breathing Pack"
          </h4>
          <p className="text-ink leading-relaxed font-medium">
            At <strong>{tempC}°C</strong>, the food consumes oxygen and emits CO₂. 
            The system tuned an optimal target of <strong>{targetOtr.toLocaleString()} mL/m²·day</strong> OTR to balance oxygen intake without letting CO₂ accumulate past toxic limits.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Visual Film Layer Stack
 * Shows stacked colored strips illustrating the multi-layer material structure
 */
export const FilmLayerStack: React.FC<{ structure: string }> = ({ structure }) => {
  const isFoil = structure.toLowerCase().includes('alu') || structure.toLowerCase().includes('foil');
  const isMet = structure.toLowerCase().includes('met-') || structure.toLowerCase().includes('metallised');
  const isMicro = structure.toLowerCase().includes('micro-perforat') || structure.toLowerCase().includes('perforat');
  const isBio = structure.toLowerCase().includes('pla') || structure.toLowerCase().includes('pbat') || structure.toLowerCase().includes('compostable');

  return (
    <div className="my-2.5 p-2 bg-paper rounded-lg border-2 border-ink space-y-1">
      <div className="text-[10px] font-extrabold uppercase tracking-wider text-ink mb-1 flex items-center justify-between">
        <span>Film Cross-Section Layers:</span>
        <span className="font-mono text-[9px] bg-card px-1.5 py-0.5 rounded border border-ink">{structure}</span>
      </div>

      {isFoil ? (
        <div className="space-y-1">
          <div className="bg-sky px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>12µm PET Outer Layer (Print & High Tensile Strength)</span>
            <span className="font-mono">Layer 1</span>
          </div>
          <div className="bg-sun px-2 py-1 rounded border border-ink text-[10px] font-extrabold flex justify-between">
            <span>9µm Aluminium Foil (Zero Gas & Light Transmission Barrier)</span>
            <span className="font-mono">Layer 2 (Core)</span>
          </div>
          <div className="bg-green px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>50µm LDPE Inner Sealant Layer (Hermetic Food-Contact Seal)</span>
            <span className="font-mono">Layer 3</span>
          </div>
        </div>
      ) : isMet ? (
        <div className="space-y-1">
          <div className="bg-sky px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>12µm Met-PET Film (Aluminium Vapor Vacuum Deposition Barrier)</span>
            <span className="font-mono">Barrier Layer</span>
          </div>
          <div className="bg-green px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>40µm LDPE Sealant Layer (Tear & Puncture Resistance)</span>
            <span className="font-mono">Seal Layer</span>
          </div>
        </div>
      ) : isMicro ? (
        <div className="space-y-1">
          <div className="bg-lilac px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>25µm BOPP with 50–100µm Laser Micro-Perforations (Tailored MAP Pores)</span>
            <span className="font-mono">Breathable Film</span>
          </div>
        </div>
      ) : isBio ? (
        <div className="space-y-1">
          <div className="bg-green px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>30µm Certified Compostable PLA / PBAT Bio-Polymer Substrate</span>
            <span className="font-mono">Bio Mono-layer</span>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="bg-sun px-2 py-1 rounded border border-ink text-[10px] font-bold flex justify-between">
            <span>Polyolefin Co-extrusion Layer Structure</span>
            <span className="font-mono">Substrate</span>
          </div>
        </div>
      )}
    </div>
  );
};
