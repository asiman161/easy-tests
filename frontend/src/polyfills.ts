import 'core-js/es6';
import 'core-js/es7/reflect';
import 'reflect-metadata';
require('zone.js/dist/zone');

import 'ts-helpers';

if (process.env.ENV === 'production') {
  // prod
} else {
  // dev
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
