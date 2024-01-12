import LoggingEvent from '../LoggingEvent';

export default (
  layout: (loggingEvent: LoggingEvent) => string,
  loggingEvent: LoggingEvent,
) => {
  process.stdout.write(`${layout(loggingEvent)}\n`);
};
