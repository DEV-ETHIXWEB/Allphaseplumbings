/* ─── Accredited & Award Winning badges ─────────────────────────────────────
   SVG recreations that mirror the real BBB, Angi & PHCC badge artwork.        */

/* ── BBB Accredited Business ─────────────────────────────────────────────── */
function BBBBadge() {
  return (
    <svg
      viewBox="0 0 220 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Main rounded-rect background */}
      <rect x="1" y="1" width="218" height="98" rx="8" fill="#006BA6" />
      <rect x="1" y="1" width="218" height="98" rx="8" stroke="#004F7C" strokeWidth="2" />

      {/* Left torch panel */}
      <rect x="1" y="1" width="62" height="98" rx="8" fill="#005A8E" />
      <rect x="63" y="1" width="2" height="98" fill="#00497A" />

      {/* Torch handle */}
      <rect x="27" y="54" width="8" height="26" rx="4" fill="white" opacity="0.9" />
      {/* Torch cup */}
      <path d="M23 54 Q31 50 39 54 L37 60 Q31 57 25 60 Z" fill="white" opacity="0.9" />
      {/* Flame - outer */}
      <path d="M31 52 Q27 42 28 32 Q31 38 32 28 Q34 38 37 34 Q36 44 31 52 Z" fill="#F97316" />
      {/* Flame - inner highlight */}
      <path d="M31 50 Q29 43 30 36 Q32 41 31 50 Z" fill="#FEF08A" opacity="0.8" />

      {/* BBB large text */}
      <text
        x="130"
        y="42"
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill="white"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="-1"
      >
        BBB
      </text>
      {/* ACCREDITED */}
      <text
        x="130"
        y="60"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="white"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
      >
        ACCREDITED
      </text>
      {/* BUSINESS */}
      <text
        x="130"
        y="73"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="white"
        fontFamily="Arial, sans-serif"
        letterSpacing="2"
      >
        BUSINESS
      </text>
      {/* A+ Rating pill */}
      <rect x="90" y="78" width="80" height="14" rx="7" fill="#FCD34D" />
      <text
        x="130"
        y="88.5"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="900"
        fill="#003F6B"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.5"
      >
        A+ RATING
      </text>
      {/* ® symbol */}
      <text x="207" y="16" fontSize="8" fill="white" opacity="0.8" fontFamily="Arial, sans-serif">
        ®
      </text>
    </svg>
  );
}

/* ── Angi Super Service Award 2024 ─────────────────────────────────────────── */
function AngiBadge() {
  return (
    <svg
      viewBox="0 0 130 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* House / pentagon shape */}
      <path
        d="M65 6 L122 45 L122 148 Q122 156 114 156 L16 156 Q8 156 8 148 L8 45 Z"
        fill="#C8102E"
      />
      {/* Roof highlight */}
      <path d="M65 6 L122 45 L8 45 Z" fill="#A50E27" />
      {/* Roof outline peak */}
      <path d="M65 10 L118 47" stroke="#8B0C20" strokeWidth="1.5" />
      <path d="M65 10 L12 47" stroke="#8B0C20" strokeWidth="1.5" />

      {/* Angi text */}
      <text
        x="65"
        y="75"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fontStyle="italic"
        fill="white"
        fontFamily="Georgia, serif"
        letterSpacing="-0.5"
      >
        Angi
      </text>

      {/* Dark maroon center banner */}
      <rect x="8" y="88" width="114" height="38" fill="#7B0719" />
      <text
        x="65"
        y="104"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="900"
        fill="white"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.8"
      >
        SUPER SERVICE
      </text>
      <text
        x="65"
        y="118"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="900"
        fill="white"
        fontFamily="Arial, sans-serif"
        letterSpacing="3"
      >
        AWARD
      </text>

      {/* 2024 in gold */}
      <text
        x="65"
        y="148"
        textAnchor="middle"
        fontSize="24"
        fontWeight="900"
        fill="#FCD34D"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="1"
      >
        2024
      </text>
    </svg>
  );
}

/* ── PHCC Member badge — horizontal layout: circle LEFT, text RIGHT ────────── */
function PHCCBadge() {
  return (
    <svg
      viewBox="0 0 440 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* ── Left: circular emblem ── */}
      {/* Outer blue ring */}
      <circle cx="78" cy="80" r="72" stroke="#003087" strokeWidth="5" fill="white" />
      {/* Inner thin ring */}
      <circle cx="78" cy="80" r="65" stroke="#003087" strokeWidth="1.5" fill="white" />

      {/* Red banner background across middle */}
      <path
        d="M13 62 Q13 58 17 58 L139 58 Q143 58 143 62 L143 98 Q143 102 139 102 L17 102 Q13 102 13 98 Z"
        fill="#C8102E"
      />

      {/* PHCC large text on red banner */}
      <text
        x="78"
        y="90"
        textAnchor="middle"
        fontSize="28"
        fontWeight="900"
        fill="white"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="1"
      >
        PHCC
      </text>

      {/* Three small icons below PHCC on white */}
      {/* Water drop */}
      <path
        d="M55 108 Q51 115 51 120 C51 126 54.5 130 58 130 C61.5 130 65 126 65 120 C65 115 61 108 55 108 Z"
        fill="#0078C8"
      />
      {/* Flame */}
      <path d="M78 106 Q74 113 75 120 Q78 116 81 120 Q82 113 78 106 Z" fill="#E63027" />
      <path
        d="M78 109 Q76 114 77 119 Q78 116 79 119 Q80 114 78 109 Z"
        fill="#FF8C42"
        opacity="0.8"
      />
      {/* Snowflake */}
      <line
        x1="101"
        y1="108"
        x2="101"
        y2="130"
        stroke="#0078C8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="91"
        y1="119"
        x2="111"
        y2="119"
        stroke="#0078C8"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="94"
        y1="112"
        x2="108"
        y2="126"
        stroke="#0078C8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="94"
        y1="126"
        x2="108"
        y2="112"
        stroke="#0078C8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Arc text — PLUMBING-HEATING-COOLING (top) */}
      <path id="phccTop" d="M 16 80 A 62 62 0 0 1 140 80" fill="none" />
      <text
        fontSize="7.5"
        fontWeight="700"
        fill="#003087"
        fontFamily="Arial, sans-serif"
        letterSpacing="1.2"
      >
        <textPath href="#phccTop" startOffset="8%">
          PLUMBING · HEATING · COOLING
        </textPath>
      </text>

      {/* Arc text — CONTRACTORS ASSOCIATION (bottom) */}
      <path id="phccBot" d="M 18 84 A 60 60 0 0 0 138 84" fill="none" />
      <text
        fontSize="7"
        fontWeight="700"
        fill="#003087"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.8"
      >
        <textPath href="#phccBot" startOffset="10%">
          CONTRACTORS ASSOCIATION
        </textPath>
      </text>

      {/* ── Right: text block ── */}
      {/* PLUMBING-HEATING-COOLING bold line 1 */}
      <text
        x="172"
        y="56"
        fontSize="17"
        fontWeight="900"
        fill="#003087"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="0.2"
      >
        PLUMBING-HEATING-COOLING
      </text>
      {/* CONTRACTORS ASSOCIATION® line 2 */}
      <text
        x="172"
        y="78"
        fontSize="17"
        fontWeight="900"
        fill="#003087"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="0.2"
      >
        CONTRACTORS ASSOCIATION
        <tspan fontSize="10" baselineShift="super">
          ®
        </tspan>
      </text>
      {/* Divider line */}
      <line x1="172" y1="90" x2="432" y2="90" stroke="#003087" strokeWidth="1.5" />
      {/* Best People. Best Practices. italic */}
      <text
        x="172"
        y="112"
        fontSize="16"
        fontStyle="italic"
        fontWeight="600"
        fill="#003087"
        fontFamily="Georgia, serif"
        letterSpacing="0.3"
      >
        Best People. Best Practices.
      </text>
    </svg>
  );
}

export function Badges() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        {/* "Badges" heading — bold dark, centered */}
        <h2
          className="text-center text-4xl font-black text-[#1E3A6E] mb-12"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Badges
        </h2>

        {/* Three logos — no cards, no borders, just the logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 max-w-4xl mx-auto">
          {/* BBB */}
          <div className="flex items-center justify-center" style={{ width: 180, height: 80 }}>
            <BBBBadge />
          </div>

          {/* Angi */}
          <div className="flex items-center justify-center" style={{ width: 130, height: 160 }}>
            <AngiBadge />
          </div>

          {/* PHCC */}
          <div className="flex items-center justify-center" style={{ width: 220, height: 100 }}>
            <PHCCBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
