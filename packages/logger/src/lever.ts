import { LEVEL_TYPE, LevalItem } from './interface/lerver';

class Level {
  value;
  type;
  colour;
  static levels: LevalItem[] = [];
  static [key: string]: any;
  constructor(value, type, colour) {
    this.value = value;
    this.type = type;
    this.colour = colour;
  }

  toString() {
    return this.type;
  }

  static getLevel(sArg, defaultLevel?: LEVEL_TYPE) {
    if (!sArg) {
      return defaultLevel;
    }

    if (sArg instanceof Level) {
      return sArg;
    }

    if (sArg instanceof Object && sArg.type) {
      sArg = sArg.type;
    }

    return Level[sArg.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels: Record<LEVEL_TYPE, LevalItem>) {
    if (customLevels) {
      const levels = Object.keys(customLevels);
      levels.forEach(l => {
        const type = l.toUpperCase();
        Level[type] = new Level(
          customLevels[l].value,
          type,
          customLevels[l].colour,
        );
        const existingLevelIndex = Level.levels.findIndex(
          lvl => lvl.type === type,
        );
        if (existingLevelIndex > -1) {
          Level.levels[existingLevelIndex] = Level[type];
        } else {
          Level.levels.push(Level[type]);
        }
      });
      Level.levels.sort((a, b) => a.value - b.value);
    }
  }
}

Level.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: 'grey' },
  LOG: { value: 0, colour: 'grey' },
  TRACE: { value: 5000, colour: 'blue' },
  DEBUG: { value: 10000, colour: 'cyan' },
  INFO: { value: 20000, colour: 'green' },
  WARN: { value: 30000, colour: 'yellow' },
  ERROR: { value: 40000, colour: 'red' },
  FATAL: { value: 50000, colour: 'magenta' },
  MARK: { value: 9007199254740992, colour: 'grey' }, // 2^53
  OFF: { value: Number.MAX_VALUE, colour: 'grey' },
});

export default Level;
