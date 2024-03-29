const Logger = require('@emooa/logger');
const path = require('path');

const logger = new Logger({
  category: 'My Project',
  appenders: [
    {
      type: 'stdout', // "console" | "stderr" | "stdout" | "file"
      colour: true,
      layout: {
        type: 'pattern', // message, basic, pattern,
        pattern: '%[[%d] [%p]%] %m',
      },
    },
    {
      type: 'file',
      colour: false,
      file: {
        filename: path.join(__dirname, '../examples/logs/emooa-logger.log'),
        options: {
          keepFileExt: true,
        },
      },
      layout: {
        type: 'basic',
      },
    },
    // {
    //   type: "console",
    //   layout: "basic",
    // },
    // {
    //   type: "stderr",
    //   layout: "basic",
    // },
  ],
});

logger.log('The color is grey!');
logger.info('The color is green!');
logger.warn('The color is yellow!');
logger.error('The color is red!');
logger.debug('The color is cyan!');
