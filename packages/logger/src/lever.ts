export type COLOUR =
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
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | "MARK"
  | "OFF";

export type LevalItem = {
  value: number;
  level?: LEVEL_TYPE;
  colour: COLOUR;
};

class Level {
  value;
  level;
  colour;
  static levels: LevalItem[] = [];
  static [key: string]: any;
  constructor(value, level, colour) {
    this.value = value;
    this.level = level;
    this.colour = colour;
  }

  toString() {
    return this.level;
  }

  static getLevel(sArg, defaultLevel?: LEVEL_TYPE) {
    if (!sArg) {
      return defaultLevel;
    }

    if (sArg instanceof Level) {
      return sArg;
    }

    if (sArg instanceof Object && sArg.level) {
      sArg = sArg.level;
    }

    return Level[sArg.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels: Record<LEVEL_TYPE, LevalItem>) {
    if (customLevels) {
      const levels = Object.keys(customLevels);
      levels.forEach((l) => {
        const level = l.toUpperCase();
        Level[level] = new Level(
          customLevels[l].value,
          level,
          customLevels[l].colour
        );
        const existingLevelIndex = Level.levels.findIndex(
          (lvl) => lvl.level === level
        );
        if (existingLevelIndex > -1) {
          Level.levels[existingLevelIndex] = Level[level];
        } else {
          Level.levels.push(Level[level]);
        }
      });
      Level.levels.sort((a, b) => a.value - b.value);
    }
  }
}

Level.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: "grey" },
  TRACE: { value: 5000, colour: "blue" },
  DEBUG: { value: 10000, colour: "cyan" },
  INFO: { value: 20000, colour: "green" },
  WARN: { value: 30000, colour: "yellow" },
  ERROR: { value: 40000, colour: "red" },
  FATAL: { value: 50000, colour: "magenta" },
  MARK: { value: 9007199254740992, colour: "grey" }, // 2^53
  OFF: { value: Number.MAX_VALUE, colour: "grey" },
});

export default Level;
