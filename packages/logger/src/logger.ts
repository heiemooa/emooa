import chalk from "chalk";
import Level, { COLOUR, LEVEL_TYPE, LevalItem } from "./lever.js";

// https://www.w3schools.com/jsref/jsref_tolocalestring.asp
function timefmt() {
  return new Date().toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * 仅暴露几个常用 LOG API，更多功能待补充
 */
class LoggerBasic {
  // 打印
  log: (message: any, color?: string) => any;
  // 当成日志
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export default class Logger extends LoggerBasic {
  category: string;

  constructor(category: string = "[Emooa Logger]") {
    super();
    this.category = category;
  }

  level(level: LEVEL_TYPE, ...args) {
    const logLevel: LevalItem = Level.getLevel(level);
    if (!logLevel) {
      this.level(Level.LOG, `[${level}]`, ...args);
    } else {
      const newData = `${chalk.grey(`[${timefmt()}]`)} ${chalk[logLevel.colour](
        `[${logLevel.level}] ${this.category} - ${args}`
      )}`;
      process.stdout.write(`${newData}\n`);
    }
  }

  log = (data, colour: string = "#CCC", ...args: any[]) => {
    const newData = `${chalk.grey(`[${timefmt()}]`)} ${chalk.hex(colour)(
      `[LOG] ${this.category} - ${data} ${args}`
    )}`;
    process.stdout.write(`${newData}\n`);
  };
}

function addLevelMethods(target) {
  const level = Level.getLevel(target);

  const levelStrLower = level.toString().toLowerCase();
  const levelMethod = levelStrLower.replace(/_([a-z])/g, (g) =>
    g[1].toUpperCase()
  );
  Logger.prototype[levelMethod] = function (...args) {
    this.level(level, ...args);
  };
}

Level.levels.forEach(addLevelMethods);
