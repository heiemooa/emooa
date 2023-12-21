export type LEVEL_COLOUR =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "grey";

export type LEVEL_TYPE =
  | "ALL"
  | "TRACE"
  | "DEBUG"
  | "LOG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | "MARK"
  | "OFF";

export type LevalItem = {
  value: number;
  level?: LEVEL_TYPE;
  colour: LEVEL_COLOUR;
};
