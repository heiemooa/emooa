import Level from './lever';
import LoggingEvent from './LoggingEvent';
import { IAppender } from './interface/appenders';
import { LEVEL_TYPE, LevalItem } from './interface/lerver';
import layouts from './layouts';
import isEmpty from 'lodash.isempty';
import * as appenders from './appenders';
import * as util from 'util';
/**
 * 仅暴露几个常用 LOG API，更多功能待补充
 */
class LoggerBasic {
  // 打印
  log: (...args: any[]) => void;
  // 当成日志
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export default class Logger extends LoggerBasic {
  category: string;
  appenders: IAppender[];

  constructor(options: { category: string; appenders: IAppender[] }) {
    super();
    this.category = options?.category;
    this.appenders = options?.appenders;
  }

  level(level: LEVEL_TYPE, ...args) {
    const logLevel: LevalItem = Level.getLevel(level);
    if (!logLevel) {
      this.level(Level.LOG, `[${level}]`, ...args);
    } else {
      if (isEmpty(this.appenders)) {
        this.appenders = [
          {
            type: 'stdout',
            colour: true,
            layout: {
              type: 'basic',
            },
          },
        ];
      }

      this.appenders.forEach((ad: IAppender) => {
        const appender = appenders[ad.type]; // type: "console" | "stderr" | "stdout"
        if (appender) {
          const loggingEvent = new LoggingEvent(
            this.category,
            logLevel,
            ad,
            ...args,
          );
          appender(layouts(ad), loggingEvent);
        } else {
          throw new Error(
            `Problem with @emooa/logger configuration: (${util.inspect(ad, {
              depth: 5,
            })}) - appender type must be 'console' | 'stderr' | 'stdout'`,
          );
        }
      });
    }
  }
}

function addLevelMethods(target) {
  const level = Level.getLevel(target);

  const levelStrLower = level.toString().toLowerCase();
  const levelMethod = levelStrLower.replace(/_([a-z])/g, g =>
    g[1].toUpperCase(),
  );
  Logger.prototype[levelMethod] = function (...args) {
    this.level(level, ...args);
  };
}

Level.levels.forEach(addLevelMethods);

module.exports = Logger;
