import { Instagram, Facebook } from "lucide-react";

/** TikTok icon — lucide-react doesn't ship one, so inline a simple SVG */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52V6.69h-1.84z" />
    </svg>
  );
}

export function SocialIcons() {
  const items = [
    { label: "TikTok", Icon: TikTokIcon },
    { label: "Instagram", Icon: Instagram },
    { label: "Facebook", Icon: Facebook },
  ];

  return (
    <div className="flex items-center justify-center gap-6 h-full w-full bg-[#1E3A8A] px-6">
      {items.map(({ label, Icon }) => (
        <a
          key={label}
          href="#"
          aria-label={label}
          className="flex items-center justify-center size-9 text-white hover:text-[#F5C842] hover:scale-110 transition-all duration-200"
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
