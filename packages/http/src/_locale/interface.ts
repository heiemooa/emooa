export interface Locale {
  locale: string;
  title: {
    '5x': string;
    500: string;
    502: string;
    503: string;
    504: string;
    hint: string;
  };
  message: {
    '4x': string;
    401: string;
    403: string;
    404: string;
    '5x': string;
    500: string;
    502: string;
    503: string;
    504: string;
  };
  copy: string;
  ok: string;
  detail: (code: number | string, color: string) => string;
}
