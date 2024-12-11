export const serializeCSSVar = <T extends Record<string, any>>(
  cssVars: T,
  hashId: string,
  options?: {
    scope?: string;
  },
) => {
  if (!Object.keys(cssVars).length) {
    return '';
  }
  return `.${hashId}${options?.scope ? `.${options.scope}` : ''}{${Object.entries(cssVars)
    .map(([key, value]) => `${key}:${value};`)
    .join('')}}`;
};

export type TokenWithCSSVar<V, T extends Record<string, V> = Record<string, V>> = {
  [key in keyof T]?: string | V;
};
