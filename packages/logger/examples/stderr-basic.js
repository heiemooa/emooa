const Logger = require("@emooa/logger");

const logger = new Logger({
  category: "My Project",
  appenders: [
    {
      type: "stderr", // "console" | "stderr" | "stdout" | "file"
      colour: true,
      layout: {
        type: "basic", // message, basic, pattern,
      },
    },
  ],
});

logger.log("The color is grey!");
logger.info("The color is green!");
logger.warn("The color is yellow!");
logger.error("The color is red!");
logger.debug("The color is cyan!");
