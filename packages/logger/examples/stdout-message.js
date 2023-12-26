const Logger = require("@emooa/logger");

const logger = new Logger({
  category: "My Project",
  appenders: [
    {
      type: "stdout", // "console" | "stderr" | "stdout" | "file"
      colour: false,
      layout: {
        type: "message", // message, basic, pattern,
      },
    },
  ],
});

logger.log("The color is default!");
logger.info("The color is default!");
logger.warn("The color is default!");
logger.error("The color is default!");
logger.debug("The color is default!");
