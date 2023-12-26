const Logger = require("@emooa/logger");

const logger = new Logger({
  category: "My Project",
  appenders: [
    {
      type: "file",
      colour: false,
      file: {
        filename: `${__dirname}/logs/log-file.log`,
        maxSize: 10,
        options: {
          keepFileExt: true,
        },
      },
      layout: {
        type: "basic",
      },
    },
  ],
});

logger.log("The color is grey!");
logger.info("The color is green!");
logger.warn("The color is yellow!");
logger.error("The color is red!");
logger.debug("The color is cyan!");
