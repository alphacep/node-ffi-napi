'use strict';
const { Worker } = require('worker_threads');

describe('Worker', function () {
  it('should not throw and error when required inside Worker', function (done) {
    const worker = new Worker(`require('./');`, { eval: true });
    worker.on('exit', (code) => {
      if (code !== 0) {
        throw new Error(`Worker stopped with exit code ${code}`);
      }
      done();
    });
  });

  it('should not trigger a segfault when required outside and inside a Worker', function (done) {
    require('../');
    const worker = new Worker(`require('./');`, { eval: true });
    worker.on('exit', (code) => {
      if (code !== 0) {
        throw new Error(`Worker stopped with exit code ${code}`);
      }
      done();
    });
  });
});
