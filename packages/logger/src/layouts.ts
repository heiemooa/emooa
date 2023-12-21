import { IAppender, IAppenderLayout } from "./interface/appenders";
import * as os from "os";
import * as util from "util";
import * as path from "path";
import * as url from "url";
import LoggingEvent from "./LoggingEvent";
import { LEVEL_COLOUR } from "./interface/lerver";

const styles = {
  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [91, 39],
  yellow: [33, 39],
};

function colorizeStart(style: LEVEL_COLOUR) {
  return style ? `\x1B[${styles[style][0]}m` : "";
}

function colorizeEnd(style: LEVEL_COLOUR) {
  return style ? `\x1B[${styles[style][1]}m` : "";
}

function colorize(str, style) {
  return colorizeStart(style) + str + colorizeEnd(style);
}

function timestampLevelAndCategory(
  loggingEvent: LoggingEvent,
  colour?: LEVEL_COLOUR
) {
  let message;
  if (loggingEvent.category) {
    message = util.format(
      "[%s] [%s] %s - ",
      loggingEvent.time,
      loggingEvent.level.toString(),
      loggingEvent.category
    );
  } else {
    message = util.format(
      "[%s] [%s] - ",
      loggingEvent.time,
      loggingEvent.level.toString()
    );
  }
  return colorize(util.format(message), colour);
}

function colourLayout(loggingEvent: LoggingEvent) {
  return (
    timestampLevelAndCategory(loggingEvent, loggingEvent.level.colour) +
    util.format(...loggingEvent.data)
  );
}

function messageLayout(loggingEvent: LoggingEvent) {
  return util.format(...loggingEvent.data);
}

function basicLayout(loggingEvent: LoggingEvent) {
  return (
    timestampLevelAndCategory(loggingEvent) + util.format(...loggingEvent.data)
  );
}

function patternLayout(appender: IAppender) {
  const TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
  const regex =
    /%(-?[0-9]+)?(\.?-?[0-9]+)?([[\]cdhmnprzxXyflosCMAF%])(\{([^}]+)\})?|([^%]+)/;

  const pattern = appender.pattern || TTCC_CONVERSION_PATTERN;

  function categoryName(loggingEvent: LoggingEvent, specifier) {
    let loggerName = loggingEvent.category;
    if (specifier) {
      const precision = parseInt(specifier, 10);
      const loggerNameBits = loggerName.split(".");
      if (precision < loggerNameBits.length) {
        loggerName = loggerNameBits
          .slice(loggerNameBits.length - precision)
          .join(".");
      }
    }
    return loggerName;
  }

  // TODO
  function formatAsDate(loggingEvent: LoggingEvent, specifier) {
    return loggingEvent.time;
  }

  function hostname() {
    return os.hostname().toString();
  }

  function formatMessage(loggingEvent: LoggingEvent, specifier) {
    let dataSlice = loggingEvent.data;
    if (specifier) {
      const [lowerBound, upperBound] = specifier.split(",");
      dataSlice = dataSlice.slice(lowerBound, upperBound);
    }
    return util.format(...dataSlice);
  }

  function endOfLine() {
    return os.EOL;
  }

  function logLevel(loggingEvent: LoggingEvent) {
    return loggingEvent.level.toString();
  }

  function startTime(loggingEvent: LoggingEvent) {
    return loggingEvent.time;
  }

  // TODO
  function startColour(loggingEvent: LoggingEvent) {
    return colorizeStart(loggingEvent.level.colour);
  }

  // TODO
  function endColour(loggingEvent: LoggingEvent) {
    return colorizeEnd(loggingEvent.level.colour);
  }

  function percent() {
    return "%";
  }

  function pid(loggingEvent: LoggingEvent) {
    return loggingEvent.pid
      ? loggingEvent.pid.toString()
      : process.pid.toString();
  }

  function clusterInfo(loggingEvent: LoggingEvent) {
    // this used to try to return the master and worker pids,
    // but it would never have worked because master pid is not available to workers
    // leaving this here to maintain compatibility for patterns
    return pid(loggingEvent);
  }

  function fileName(loggingEvent: LoggingEvent, specifier) {
    let filename = loggingEvent.appender.filename || "";

    // support for ESM as it uses url instead of path for file
    /* istanbul ignore next: unsure how to simulate ESM for test coverage */
    const convertFileURLToPath = function (filepath) {
      const urlPrefix = "file://";
      if (filepath.startsWith(urlPrefix)) {
        // https://nodejs.org/api/url.html#urlfileurltopathurl
        if (typeof url.fileURLToPath === "function") {
          filepath = url.fileURLToPath(filepath);
        }
        // backward-compatible for nodejs pre-10.12.0 (without url.fileURLToPath method)
        else {
          // posix: file:///hello/world/foo.txt -> /hello/world/foo.txt -> /hello/world/foo.txt
          // win32: file:///C:/path/foo.txt     -> /C:/path/foo.txt     -> \C:\path\foo.txt     -> C:\path\foo.txt
          // win32: file://nas/foo.txt          -> //nas/foo.txt        -> nas\foo.txt          -> \\nas\foo.txt
          filepath = path.normalize(
            filepath.replace(new RegExp(`^${urlPrefix}`), "")
          );
          if (process.platform === "win32") {
            if (filepath.startsWith("\\")) {
              filepath = filepath.slice(1);
            } else {
              filepath = path.sep + path.sep + filepath;
            }
          }
        }
      }
      return filepath;
    };
    filename = convertFileURLToPath(filename);

    if (specifier) {
      const fileDepth = parseInt(specifier, 10);
      const fileList = filename.split(path.sep);
      if (fileList.length > fileDepth) {
        filename = fileList.slice(-fileDepth).join(path.sep);
      }
    }

    return filename;
  }

  function lineNumber(loggingEvent) {
    return loggingEvent.lineNumber ? `${loggingEvent.lineNumber}` : "";
  }

  function columnNumber(loggingEvent) {
    return loggingEvent.columnNumber ? `${loggingEvent.columnNumber}` : "";
  }

  function callStack(loggingEvent) {
    return loggingEvent.callStack || "";
  }

  function className(loggingEvent) {
    return loggingEvent.className || "";
  }

  function functionName(loggingEvent) {
    return loggingEvent.functionName || "";
  }

  function functionAlias(loggingEvent) {
    return loggingEvent.functionAlias || "";
  }

  function callerName(loggingEvent) {
    return loggingEvent.callerName || "";
  }

  const replacers = {
    c: categoryName,
    d: formatAsDate,
    h: hostname,
    m: formatMessage,
    n: endOfLine,
    p: logLevel,
    r: startTime,
    "[": startColour,
    "]": endColour,
    y: clusterInfo,
    z: pid,
    "%": percent,
    f: fileName,
    l: lineNumber,
    o: columnNumber,
    s: callStack,
    C: className,
    M: functionName,
    A: functionAlias,
    F: callerName,
  };

  function replaceToken(
    conversionCharacter,
    loggingEvent: LoggingEvent,
    specifier
  ) {
    return replacers[conversionCharacter](loggingEvent, specifier);
  }

  function truncate(truncation, toTruncate) {
    let len;
    if (truncation) {
      len = parseInt(truncation.slice(1), 10);
      // negative truncate length means truncate from end of string
      return len > 0 ? toTruncate.slice(0, len) : toTruncate.slice(len);
    }

    return toTruncate;
  }

  function pad(padding, toPad) {
    let len;
    if (padding) {
      if (padding.charAt(0) === "-") {
        len = parseInt(padding.slice(1), 10);
        // Right pad with spaces
        while (toPad.length < len) {
          toPad += " ";
        }
      } else {
        len = parseInt(padding, 10);
        // Left pad with spaces
        while (toPad.length < len) {
          toPad = ` ${toPad}`;
        }
      }
    }
    return toPad;
  }

  function truncateAndPad(toTruncAndPad, truncation, padding) {
    let replacement = toTruncAndPad;
    replacement = truncate(truncation, replacement);
    replacement = pad(padding, replacement);
    return replacement;
  }

  return function (loggingEvent) {
    let formattedString = "";
    let result;
    let searchString = pattern;

    while ((result = regex.exec(searchString)) !== null) {
      // const matchedString = result[0];
      const padding = result[1];
      const truncation = result[2];
      const conversionCharacter = result[3];
      const specifier = result[5];
      const text = result[6];

      // Check if the pattern matched was just normal text
      if (text) {
        formattedString += text.toString();
      } else {
        // Create a raw replacement string based on the conversion
        // character and specifier
        const replacement = replaceToken(
          conversionCharacter,
          loggingEvent,
          specifier
        );
        formattedString += truncateAndPad(replacement, truncation, padding);
      }
      searchString = searchString.slice(result.index + result[0].length);
    }
    return formattedString;
  };
}

const layoutMakers = {
  message() {
    return messageLayout;
  },
  basic() {
    return basicLayout;
  },
  colour() {
    return colourLayout;
  },
  pattern(appender: IAppender) {
    return patternLayout(appender);
  },
};

// layout: "message" | "basic" | "colour" | "pattern"
const layouts = (layout: IAppenderLayout, appender: IAppender) =>
  (layoutMakers[layout] || layoutMakers.colour)?.(appender);

export default layouts;
