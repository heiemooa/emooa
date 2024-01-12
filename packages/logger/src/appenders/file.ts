import LoggingEvent from '../LoggingEvent';
import * as path from 'path';
import * as os from 'os';
import streams from 'streamroller';
import { IAppenderFile } from '../interface/appenders';

const eol = os.EOL;
let mainSighupListenerStarted = false;
const sighupListeners = new Set();

function mainSighupHandler() {
  sighupListeners.forEach(
    (app: {
      (): void;
      reopen(): void;
      sighupHandler(): void;
      shutdown(complete: any): void;
    }) => {
      app.sighupHandler();
    },
  );
}

function fileAppender(appender: IAppenderFile, message: string) {
  const maxSize = appender.file?.maxSize;
  const numBackups = appender.file?.numBackups;
  const options = appender.file?.options;
  let filename = path.normalize(
    appender.file?.filename || 'logs/emooa-logger.log',
  );

  if (filename.endsWith(path.sep)) {
    throw new Error(`Filename is a directory: ${filename}`);
  }
  if (filename.indexOf(`~${path.sep}`) === 0) {
    filename = filename.replace('~', os.homedir());
  }

  function openTheStream(filePath, fileSize, numFiles, opt) {
    const stream = new streams.RollingFileStream(
      filePath,
      fileSize,
      numFiles,
      opt,
    );
    stream.on('error', err => {
      console.error(
        '@emooa/logger appenders - Writing to file %s, error happened ',
        filePath,
        err,
      );
    });

    stream.on('drain', () => {
      // TODO
      // process.emit('@emooa/logger:pause', false);
    });

    return stream;
  }

  let writer = openTheStream(filename, maxSize, numBackups, options);

  const app = function () {
    if (!writer.writable) {
      return;
    }
    if (!writer.write(message + eol, 'utf8')) {
      // TODO
      // process.emit('@emooa/logger:pause', true);
    }
  };

  app.reopen = function () {
    writer.end(() => {
      writer = openTheStream(filename, maxSize, numBackups, options);
    });
  };

  app.sighupHandler = function () {
    app.reopen();
  };

  app.shutdown = function (complete) {
    sighupListeners.delete(app);
    if (sighupListeners.size === 0 && mainSighupListenerStarted) {
      process.removeListener('SIGHUP', mainSighupHandler);
      mainSighupListenerStarted = false;
    }
    writer.end('', 'utf-8', complete);
  };

  sighupListeners.add(app);
  if (!mainSighupListenerStarted) {
    process.on('SIGHUP', mainSighupHandler);
    mainSighupListenerStarted = true;
  }

  return app;
}

export default (
  layout: (loggingEvent: LoggingEvent) => string,
  loggingEvent: LoggingEvent,
) => {
  const message = layout(loggingEvent);
  const appender = loggingEvent.appender as IAppenderFile;

  fileAppender(appender, message)();
};
