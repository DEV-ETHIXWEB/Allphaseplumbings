/**
 * ServicePicker.tsx
 *
 * The icon-button "which service(s) do you need" control shared by every
 * lead form on the site. Replaces the old plain <select>/dropdown: each
 * service is its own tappable icon+label chip, multiple can be active at
 * once (MCQ-style, not single-choice), and a built-in "Other" chip reveals a
 * free-text field so an out-of-list request is actually captured instead of
 * just being emailed as the literal word "Other".
 *
 * Pair with `useServicePicker()` for the selection state + validation.
 */

import { HelpCircle, Check } from "lucide-react";
import { OTHER_SERVICE_VALUE, type ServiceOption } from "@/data/service-options";
import { cn } from "@/lib/utils";

export function ServicePicker({
  options,
  selected,
  onToggle,
  otherText,
  onOtherTextChange,
  theme = "dark",
  ariaLabel = "Select the service(s) you need",
  error,
  columns = "grid-cols-2 sm:grid-cols-3",
}: {
  options: ServiceOption[];
  selected: string[];
  onToggle: (value: string) => void;
  otherText: string;
  onOtherTextChange: (value: string) => void;
  theme?: "dark" | "light";
  ariaLabel?: string;
  error?: string;
  columns?: string;
}) {
  const dark = theme === "dark";
  const isOtherSelected = selected.includes(OTHER_SERVICE_VALUE);

  const chipInactive = dark
    ? "border-white/25 bg-white/5 text-white/85 hover:border-white/45 hover:bg-white/10"
    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50";

  const otherInputCls = dark
    ? "w-full rounded-lg border-2 border-[#F5C842] bg-white/10 backdrop-blur-sm px-3.5 py-2.5 text-[14px] font-semibold text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15 transition-shadow"
    : "w-full rounded-lg border-2 border-[#1E3A6E] bg-white px-3.5 py-2.5 text-[14px] font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A6E] transition-shadow";

  return (
    <div role="group" aria-label={ariaLabel}>
      <div className={`grid ${columns} gap-2 sm:gap-2.5`}>
        {options.map((opt) => {
          const active = selected.includes(opt.value);
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(opt.value)}
              className={cn(
                "group relative flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-3 text-center transition-all duration-150 active:scale-[0.97]",
                active
                  ? "border-[#F5C842] bg-[#F5C842] text-[#1E3A6E] shadow-[0_4px_14px_rgba(245,200,66,0.45)]"
                  : chipInactive,
              )}
            >
              {active && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex size-[18px] items-center justify-center rounded-full bg-[#1E3A6E] text-white">
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
              )}
              <Icon
                className={cn(
                  "size-5 sm:size-6",
                  active ? "text-[#1E3A6E]" : dark ? "text-[#F5C842]" : "text-[#1E3A6E]",
                )}
                strokeWidth={2.2}
              />
              <span className="text-[11px] sm:text-[12px] font-bold leading-tight">
                {opt.label}
              </span>
            </button>
          );
        })}

        {/* Built-in "Other" chip, present on every picker */}
        <button
          type="button"
          aria-pressed={isOtherSelected}
          onClick={() => onToggle(OTHER_SERVICE_VALUE)}
          className={cn(
            "group relative flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-3 text-center transition-all duration-150 active:scale-[0.97]",
            isOtherSelected
              ? "border-[#F5C842] bg-[#F5C842] text-[#1E3A6E] shadow-[0_4px_14px_rgba(245,200,66,0.45)]"
              : chipInactive,
          )}
        >
          {isOtherSelected && (
            <span className="absolute -right-1.5 -top-1.5 inline-flex size-[18px] items-center justify-center rounded-full bg-[#1E3A6E] text-white">
              <Check className="size-3" strokeWidth={3.5} />
            </span>
          )}
          <HelpCircle
            className={cn(
              "size-5 sm:size-6",
              isOtherSelected ? "text-[#1E3A6E]" : dark ? "text-[#F5C842]" : "text-[#1E3A6E]",
            )}
            strokeWidth={2.2}
          />
          <span className="text-[11px] sm:text-[12px] font-bold leading-tight">Other</span>
        </button>
      </div>

      {isOtherSelected && (
        <input
          type="text"
          value={otherText}
          onChange={(e) => onOtherTextChange(e.target.value)}
          placeholder="Tell us what you need*"
          aria-label="Describe the other service you need"
          maxLength={120}
          className={cn(otherInputCls, "mt-2.5")}
        />
      )}

      {error && (
        <p className={cn("mt-2 text-[13px] font-semibold", dark ? "text-red-300" : "text-red-600")}>
          {error}
        </p>
      )}
    </div>
  );
}
