import LoggingEvent from '../LoggingEvent';

export default (
  layout: (loggingEvent: LoggingEvent) => string,
  loggingEvent: LoggingEvent,
) => {
  console.log(layout(loggingEvent));
};
