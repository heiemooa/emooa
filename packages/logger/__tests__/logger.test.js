'use strict';

const logger = require('..');
const assert = require('assert').strict;

assert.strictEqual(logger(), 'Hello from logger');
console.info('logger tests passed');
