import React from 'react';

export type TestTubeType = 
  | 'molisch-pos' 
  | 'molisch-neg' 
  | 'iodine-pos' 
  | 'iodine-neg' 
  | 'barfoed-pos' 
  | 'barfoed-neg' 
  | 'seliwanoff-pos' 
  | 'seliwanoff-neg' 
  | 'benedict-neg' 
  | 'benedict-trace' 
  | 'benedict-low' 
  | 'benedict-mod' 
  | 'benedict-high' 
  | 'fehling-pos' 
  | 'fehling-neg';

interface BiochemistryTestTubeProps {
  type: TestTubeType;
  height?: number;
  width?: number;
  showArrowLabel?: boolean;
}

export const BiochemistryTestTube: React.FC<BiochemistryTestTubeProps> = ({
  type,
  height = 200,
  width = 64,
  showArrowLabel = true
}) => {
  // Color & feature configurations for each scientific test
  const getConfig = () => {
    switch (type) {
      case 'molisch-pos':
        return {
          topLayerColor: '#E2E8F0', // Translucent aqueous carbohydrate
          topLayerOpacity: 0.45,
          topLayerHeight: 45,
          bottomLayerColor: '#CBD5E1', // Dense concentrated H2SO4
          bottomLayerOpacity: 0.65,
          hasVioletRing: true,
          hasPrecipitate: false,
          arrowTextAr: 'حلقة بنفسجية عند السطح الفاصل',
          arrowTextEn: 'Violet ring at interface',
          arrowY: 55
        };
      case 'molisch-neg':
        return {
          topLayerColor: '#E2E8F0',
          topLayerOpacity: 0.4,
          topLayerHeight: 45,
          bottomLayerColor: '#CBD5E1',
          bottomLayerOpacity: 0.55,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'لا توجد حلقة بنفسجية',
          arrowTextEn: 'No violet ring',
          arrowY: 55
        };
      case 'iodine-pos':
        return {
          liquidColor: '#0F172A', // Very dark blue/blue-black
          liquidGradient: ['#1E1B4B', '#1E3A8A', '#090D16'],
          liquidOpacity: 0.95,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'أزرق / أزرق-أسود (نشاء)',
          arrowTextEn: 'Blue/Blue-black (Starch)',
          arrowY: 48
        };
      case 'iodine-neg':
        return {
          liquidColor: '#D97706', // Yellow-brown iodine color
          liquidGradient: ['#FDE68A', '#F59E0B', '#B45309'],
          liquidOpacity: 0.75,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'أصفر-بني (لا يوجد لون أزرق)',
          arrowTextEn: 'Yellow-brown (No blue)',
          arrowY: 48
        };
      case 'barfoed-pos':
        return {
          liquidColor: '#38BDF8', // Faint blue supernatant
          liquidGradient: ['#E0F2FE', '#BAE6FD', '#7DD3FC'],
          liquidOpacity: 0.6,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#B91C1C', // Brick-red Cu2O
          precipitateHeight: 22,
          arrowTextAr: 'راسب أحمر آجري (سكر أحادي)',
          arrowTextEn: 'Brick-red precipitate (Monosaccharide)',
          arrowY: 82
        };
      case 'barfoed-neg':
        return {
          liquidColor: '#38BDF8',
          liquidGradient: ['#E0F2FE', '#BAE6FD', '#7DD3FC'],
          liquidOpacity: 0.6,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'محلول رائق بدون راسب (سكر ثنائي)',
          arrowTextEn: 'Clear blue / No precipitate (Disaccharide)',
          arrowY: 82
        };
      case 'seliwanoff-pos':
        return {
          liquidColor: '#E11D48', // Cherry-red
          liquidGradient: ['#FB7185', '#E11D48', '#9F1239'],
          liquidOpacity: 0.92,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'لون أحمر كرزي (كيتوز)',
          arrowTextEn: 'Cherry-red color (Ketose)',
          arrowY: 48
        };
      case 'seliwanoff-neg':
        return {
          liquidColor: '#FEF08A', // Pale yellow / colorless aldose
          liquidGradient: ['#FEF9C3', '#FEF08A', '#FDE047'],
          liquidOpacity: 0.45,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'أصفر باهت / لا يوجد أحمر كرزي (ألدوز)',
          arrowTextEn: 'Pale yellow / No cherry-red (Aldose)',
          arrowY: 48
        };
      case 'benedict-neg':
        return {
          liquidColor: '#0284C7', // Royal sky blue
          liquidGradient: ['#7DD3FC', '#0284C7', '#0369A1'],
          liquidOpacity: 0.85,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'أزرق / لا تغيير (سلبي)',
          arrowTextEn: 'Blue / No change (Negative)',
          arrowY: 50
        };
      case 'benedict-trace':
        return {
          liquidColor: '#16A34A', // Green
          liquidGradient: ['#86EFAC', '#22C55E', '#15803D'],
          liquidOpacity: 0.88,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#15803D',
          precipitateHeight: 12,
          arrowTextAr: 'أخضر (أثر / Trace)',
          arrowTextEn: 'Green (Trace)',
          arrowY: 50
        };
      case 'benedict-low':
        return {
          liquidColor: '#CA8A04', // Yellow
          liquidGradient: ['#FEF08A', '#EAB308', '#A16207'],
          liquidOpacity: 0.9,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#A16207',
          precipitateHeight: 16,
          arrowTextAr: 'أصفر (+)',
          arrowTextEn: 'Yellow (+)',
          arrowY: 50
        };
      case 'benedict-mod':
        return {
          liquidColor: '#EA580C', // Orange
          liquidGradient: ['#FDBA74', '#F97316', '#C2410C'],
          liquidOpacity: 0.92,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#C2410C',
          precipitateHeight: 20,
          arrowTextAr: 'برتقالي (++)',
          arrowTextEn: 'Orange (++)',
          arrowY: 50
        };
      case 'benedict-high':
        return {
          liquidColor: '#B91C1C', // Brick-red
          liquidGradient: ['#FCA5A5', '#EF4444', '#991B1B'],
          liquidOpacity: 0.95,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#7F1D1D',
          precipitateHeight: 24,
          arrowTextAr: 'أحمر آجري (+++)',
          arrowTextEn: 'Brick-red (+++)',
          arrowY: 80
        };
      case 'fehling-pos':
        return {
          liquidColor: '#B91C1C', // Supernatant reddish
          liquidGradient: ['#FECACA', '#F87171', '#DC2626'],
          liquidOpacity: 0.75,
          hasVioletRing: false,
          hasPrecipitate: true,
          precipitateColor: '#991B1B', // Dense cuprous oxide precipitate
          precipitateHeight: 26,
          arrowTextAr: 'راسب أحمر آجري (سكر مختزل)',
          arrowTextEn: 'Brick-red precipitate (Reducing sugar)',
          arrowY: 82
        };
      case 'fehling-neg':
        return {
          liquidColor: '#2563EB', // Clear deep blue
          liquidGradient: ['#93C5FD', '#3B82F6', '#1D4ED8'],
          liquidOpacity: 0.85,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'محلول أزرق رائق / لا يوجد راسب',
          arrowTextEn: 'Blue solution / No precipitate',
          arrowY: 50
        };
      default:
        return {
          liquidColor: '#38BDF8',
          liquidGradient: ['#BAE6FD', '#38BDF8', '#0284C7'],
          liquidOpacity: 0.7,
          hasVioletRing: false,
          hasPrecipitate: false,
          arrowTextAr: 'نتيجة الاختبار',
          arrowTextEn: 'Test result',
          arrowY: 50
        };
    }
  };

  const config = getConfig();
  const uid = `tube-${type}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div className="flex flex-col items-center select-none" id={`tube-container-${type}`}>
      {/* SVG Realistic Glass Test Tube */}
      <div className="relative flex justify-center items-center">
        <svg
          width={width}
          height={height}
          viewBox="0 0 100 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Glass Cylinder Highlight / Shadow Gradient */}
            <linearGradient id={`${uid}-glass`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.04" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
            </linearGradient>

            {/* Liquid Linear Gradient */}
            {config.liquidGradient && (
              <linearGradient id={`${uid}-liquid`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={config.liquidGradient[0]} stopOpacity={config.liquidOpacity} />
                <stop offset="45%" stopColor={config.liquidGradient[1]} stopOpacity={config.liquidOpacity} />
                <stop offset="100%" stopColor={config.liquidGradient[2]} stopOpacity={config.liquidOpacity} />
              </linearGradient>
            )}

            {/* Violet Ring Gradient (Molisch) */}
            <linearGradient id={`${uid}-violet-ring`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#9333EA" stopOpacity="1" />
              <stop offset="60%" stopColor="#A855F7" stopOpacity="1" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.9" />
            </linearGradient>

            {/* Precipitate Gradient (Cu2O Cuprous Oxide) */}
            <radialGradient id={`${uid}-precipitate`} cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor={config.precipitateColor || '#B91C1C'} stopOpacity="1" />
              <stop offset="70%" stopColor={config.precipitateColor || '#991B1B'} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#450A0A" stopOpacity="1" />
            </radialGradient>

            {/* Meniscus Clip Path */}
            <clipPath id={`${uid}-tube-clip`}>
              <path d="M 22 25 L 78 25 L 78 200 A 28 28 0 0 1 22 200 Z" />
            </clipPath>
          </defs>

          {/* Test Tube Background Shadow in Dark Container */}
          <path
            d="M 22 25 L 78 25 L 78 200 A 28 28 0 0 1 22 200 Z"
            fill="#0F172A"
            fillOpacity="0.4"
          />

          {/* Liquid Contents Area (Clipped inside tube inner walls) */}
          <g clipPath={`url(#${uid}-tube-clip)`}>
            {/* Case A: Molisch Two-Layer Stratification */}
            {type.startsWith('molisch') ? (
              <>
                {/* Lower Acid Layer (Dense H2SO4) */}
                <rect
                  x="20"
                  y="120"
                  width="60"
                  height="100"
                  fill={config.bottomLayerColor}
                  fillOpacity={config.bottomLayerOpacity}
                />

                {/* Upper Carbohydrate Aqueous Layer */}
                <rect
                  x="20"
                  y="45"
                  width="60"
                  height="75"
                  fill={config.topLayerColor}
                  fillOpacity={config.topLayerOpacity}
                />

                {/* Top Meniscus */}
                <ellipse cx="50" cy="45" rx="28" ry="4" fill="#FFFFFF" fillOpacity="0.4" />

                {/* Interface Ring (If Positive) */}
                {config.hasVioletRing && (
                  <g>
                    {/* Glowing Aura */}
                    <rect
                      x="18"
                      y="114"
                      width="64"
                      height="12"
                      fill="#C084FC"
                      fillOpacity="0.35"
                    />
                    {/* Dense Violet Ring */}
                    <rect
                      x="20"
                      y="117"
                      width="60"
                      height="6"
                      fill={`url(#${uid}-violet-ring)`}
                    />
                    {/* Ring Highlight Line */}
                    <line
                      x1="24"
                      y1="119"
                      x2="76"
                      y2="119"
                      stroke="#E9D5FF"
                      strokeWidth="1.2"
                      strokeOpacity="0.9"
                    />
                  </g>
                )}
              </>
            ) : (
              /* Case B: Standard Solution Fill */
              <>
                <rect
                  x="20"
                  y="50"
                  width="60"
                  height="170"
                  fill={`url(#${uid}-liquid)`}
                />

                {/* Top Meniscus Curve */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="28"
                  ry="4.5"
                  fill="#FFFFFF"
                  fillOpacity="0.35"
                />

                {/* Bottom Precipitate Layer if Present */}
                {config.hasPrecipitate && (
                  <g>
                    {/* Precipitate Body */}
                    <path
                      d="M 22 185 Q 50 180 78 185 L 78 200 A 28 28 0 0 1 22 200 Z"
                      fill={`url(#${uid}-precipitate)`}
                    />
                    {/* Granular Texture / Grain specks */}
                    <circle cx="35" cy="192" r="1.5" fill="#FECACA" fillOpacity="0.7" />
                    <circle cx="48" cy="196" r="2" fill="#FECACA" fillOpacity="0.8" />
                    <circle cx="62" cy="190" r="1.8" fill="#FECACA" fillOpacity="0.65" />
                    <circle cx="55" cy="204" r="1.5" fill="#450A0A" fillOpacity="0.9" />
                    <circle cx="42" cy="208" r="2" fill="#450A0A" fillOpacity="0.9" />
                    <circle cx="30" cy="198" r="1.2" fill="#FECACA" fillOpacity="0.6" />
                    <circle cx="68" cy="198" r="1.4" fill="#FECACA" fillOpacity="0.7" />
                  </g>
                )}
              </>
            )}
          </g>

          {/* Glass Specular Highlights and Vertical Reflections */}
          <path
            d="M 25 30 L 30 30 L 30 190 A 20 20 0 0 1 25 185 Z"
            fill="#FFFFFF"
            fillOpacity="0.22"
          />
          <path
            d="M 72 30 L 75 30 L 75 190 A 20 20 0 0 0 72 185 Z"
            fill="#FFFFFF"
            fillOpacity="0.15"
          />

          {/* Glass Test Tube Outer Walls (Rim + Tube + Rounded Bowl) */}
          <path
            d="M 22 25 L 78 25 L 78 200 A 28 28 0 0 1 22 200 Z"
            fill={`url(#${uid}-glass)`}
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* Top Flared Lip / Rim */}
          <ellipse
            cx="50"
            cy="25"
            rx="32"
            ry="5"
            fill="#F1F5F9"
            fillOpacity="0.3"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <ellipse
            cx="50"
            cy="25"
            rx="28"
            ry="4"
            fill="none"
            stroke="#64748B"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Pointer Arrow and Callout Label directly next to the tube */}
        {showArrowLabel && (
          <div
            className="absolute left-full ml-2.5 z-10 pointer-events-none whitespace-nowrap flex items-center gap-1.5"
            style={{
              top: `${config.arrowY}%`,
              transform: 'translateY(-50%)'
            }}
          >
            {/* Scientific Arrow Marker */}
            <div className="flex items-center">
              <span className="w-4 h-[2px] bg-amber-400"></span>
              <span className="w-1.5 h-1.5 border-t-2 border-r-2 border-amber-400 rotate-45 -ml-1"></span>
            </div>
            <div className="flex flex-col text-right bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-md border border-slate-700/80 shadow-lg text-[11px]">
              <span className="font-bold text-amber-300 leading-tight">
                {config.arrowTextAr}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">
                {config.arrowTextEn}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
