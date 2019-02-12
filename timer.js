const EventEmitter = require('events');

class Tick extends EventEmitter {
  constructor (time, interim) {
    super();
    this.time = time;
    this.interim = interim;
  }

  start () {
    return new Promise((resolve) => {
      let interval = setInterval(() => {
        let curTime = new Date();
        console.log(curTime);
      }, this.interim);
      setTimeout(() => {
        clearInterval(interval);
        resolve((new Date()).toUTCString());
      }, this.time);
    });
  }
}

module.exports = Tick;
