import Logger from "@emooa/logger";

const logger = new Logger("TEST");

logger.log("hello world!");
logger.log("hello world!", "#123456");
logger.info("Text color is green!");
logger.warn("Text color is yellow!");
logger.error("Text color is red!");
logger.debug("Text color is cyan!");
