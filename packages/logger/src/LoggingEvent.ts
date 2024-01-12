import { IAppender } from './interface/appenders';
import { LevalItem } from './interface/lerver';

// https://www.w3schools.com/jsref/jsref_tolocalestring.asp
export function timefmt() {
  return new Date().toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

class LoggingEvent {
  time: string;
  category: string;
  level: LevalItem;
  appender: IAppender;
  pid: number;
  filename: string;
  data: string | string[];

  constructor(category: string, level: LevalItem, appender, ...args) {
    this.time = timefmt();
    this.category = category;
    this.level = level;
    this.appender = appender;
    this.data = args;
    this.pid = process.pid;
  }
}

export default LoggingEvent;
