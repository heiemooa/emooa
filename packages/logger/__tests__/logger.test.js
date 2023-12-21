import Logger from "@emooa/logger";

const logger = new Logger({
  category: "My Project",
  appenders: [
    {
      type: "stdout", // "console" | "stderr" | "stdout"
      layout: "message", // message, basic, colour, pattern,
    },
    // {
    //   type: "stdout",
    //   layout: "pattern",
    //   pattern: "%[[%d] [%p]%] [%f{2}:%l] %m",
    // },
    // {
    //   type: "console",
    //   layout: "colour",
    // },
    // {
    //   type: "stderr",
    //   layout: "colour",
    // },
    // {
    //   type: "file",
    //   layout: "colour",
    // },
  ],
});

logger.log("The color is grey!");
logger.info("The color is green!");
logger.warn("The color is yellow!");
logger.error("The color is red!");
logger.debug("The color is cyan!");
