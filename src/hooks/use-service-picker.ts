/**
 * use-service-picker.ts
 *
 * Shared multi-select state + validation for the icon-button "which service
 * do you need" picker used on every lead form. Centralizing this means every
 * form validates and formats the selection identically before it reaches
 * `submitLeadFromForm` — no per-form copy/paste drift.
 */

import { useState, useCallback } from "react";
import { OTHER_SERVICE_VALUE } from "@/data/service-options";

export function useServicePicker() {
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState<string | undefined>();

  const toggle = useCallback((value: string) => {
    setError(undefined);
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }, []);

  const reset = useCallback(() => {
    setSelected([]);
    setOtherText("");
    setError(undefined);
  }, []);

  /**
   * Validates the current selection and, if valid, returns the final list of
   * service strings ready to email (the "Other" sentinel is replaced with
   * "Other: <what they typed>"). Returns null and sets `error` when nothing
   * usable was selected — callers should bail out of submit in that case.
   *
   * Pass `{ required: false }` for forms where the picker is a nice-to-have,
   * not a blocker (e.g. ad landing pages tuned for minimum submit friction):
   * an empty selection then resolves to `[]` instead of failing.
   */
  const resolve = useCallback(
    (opts?: { required?: boolean }): string[] | null => {
      const required = opts?.required ?? true;
      const hasOther = selected.includes(OTHER_SERVICE_VALUE);
      if (hasOther && !otherText.trim()) {
        setError("Please tell us what other service you need.");
        return null;
      }
      const values = selected.filter((v) => v !== OTHER_SERVICE_VALUE);
      if (hasOther) values.push(`Other: ${otherText.trim()}`);
      if (required && values.length === 0) {
        setError("Please select at least one service.");
        return null;
      }
      return values;
    },
    [selected, otherText],
  );

  return { selected, toggle, otherText, setOtherText, error, reset, resolve };
}
