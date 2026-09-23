import type { DeepPartial } from "@/config/presets/types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepMerge<T extends object>(base: T, overrides: DeepPartial<T>): T {
  const result: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  };

  for (const key of Object.keys(overrides as Record<string, unknown>)) {
    const overrideValue = (overrides as Record<string, unknown>)[key];

    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = result[key];

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
      continue;
    }

    // Los arrays se reemplazan por completo para no desfasar listas o menús
    result[key] = overrideValue;
  }

  return result as T;
}