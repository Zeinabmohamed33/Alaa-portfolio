import type { CSSProperties } from "react";

/** Inline CSS custom properties, e.g. vars({ "--d": "120ms" }). */
export const vars = (values: Record<`--${string}`, string | number>) => values as CSSProperties;
