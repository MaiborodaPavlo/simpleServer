const http = require('http');
const app = require('commander');
const Timer = require('./timer');

app
  .version('1.0.0')
  .option('-i, --interval [type]', 'Time for response [output]', 1000)
  .option('-t, --timeout [type]', 'Time for stop [output]', 10000)
  .parse(process.argv);

const hostname = '127.0.0.1';
const port = 3000;
const interim = app.interval;
const time = app.timeout;

const timer = new Timer(time, interim);

http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json', 'utf-8');
    response.write(`Start at: ${(new Date()).toUTCString()} \n`);

    timer.start()
      .then((date) => {
        response.end(`Finish at: ${date}`);
      });
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
