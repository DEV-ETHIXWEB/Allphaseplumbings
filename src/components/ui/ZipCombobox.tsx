import { useMemo, useRef, useState } from "react";
import { servedZipList, isServedZip } from "@/lib/chatbot/service-area";

const ALL_ZIPS = servedZipList();
const MAX_SUGGESTIONS = 8;

type Props = {
  value: string;
  onChange: (zip: string) => void;
  className?: string;
  /** Extra classes for the wrapper, e.g. "relative" layout tweaks. */
  wrapperClassName?: string;
  children?: React.ReactNode;
};

/**
 * ZIP input with a dropdown of served ZIPs. Typing "841" lists the 841xx ZIPs
 * we serve; picking one fills the field. A 5-digit ZIP that is not on the list
 * is still accepted. The form then tells the visitor a team member will call
 * to confirm service, so nothing is lost.
 */
export function ZipCombobox({ value, onChange, className, wrapperClassName, children }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (!value) return [] as string[];
    return ALL_ZIPS.filter((z) => z.startsWith(value)).slice(0, MAX_SUGGESTIONS);
  }, [value]);

  // Hide the list once the ZIP is complete and already matches a served ZIP.
  const showList = open && suggestions.length > 0 && !(value.length === 5 && isServedZip(value));
  const notServed = value.length === 5 && !isServedZip(value);

  const pick = (zip: string) => {
    onChange(zip);
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className={wrapperClassName}>
      <div className="relative">
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        pattern="\d{5}"
        placeholder="ZIP CODE*"
        required
        value={value}
        role="combobox"
        aria-expanded={showList}
        aria-autocomplete="list"
        onChange={(e) => {
          onChange(e.target.value.replace(/\D/g, "").slice(0, 5));
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (!showList) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, suggestions.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(suggestions[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={className}
      />
      {children}
      {showList && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-y-auto rounded-xl border border-white/20 bg-[#1E3A6E] shadow-2xl"
        >
          {suggestions.map((zip, i) => (
            <li
              key={zip}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                // Keep focus on the input until the pick is applied.
                e.preventDefault();
                pick(zip);
              }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-4 py-2.5 text-[15px] font-semibold text-white ${
                i === active ? "bg-white/15" : ""
              }`}
            >
              {zip}
            </li>
          ))}
        </ul>
      )}
      </div>
      {notServed && (
        <p className="mt-2 text-[12px] sm:text-[13px] text-amber-200 font-semibold">
          This ZIP isn't on our list. Submit anyway and our team will call you to confirm service.
        </p>
      )}
    </div>
  );
}
