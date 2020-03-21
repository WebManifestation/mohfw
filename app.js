// Include the cluster module
const cluster = require('cluster');
const fs = require('fs');
const util = require('util');
const cron = require('node-cron');
const readFile = util.promisify(fs.readFile);
const updateTable = require('./update-table');

// Code to run if we're in the master process
if (cluster.isMaster) {

  cron.schedule('0 0 */1 * * *', () => {
    updateTable();
  });

  // Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', function (worker) {

    // Replace the terminated workers
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();

  });

  updateTable();

  // Code to run if we're in a worker process
} else {
  const express = require('express');

  const app = express();

  app.use(express.static('public'));

  app.get('/get-data', async (req, res) => {
    let loadData = await (await readFile('data.json')).toString();
    res.json(JSON.parse(loadData));
  });

  app.get('/update-data', async (req, res) => {
    updateTable();
    res.send('Update function triggered');
  });

  app.get('*', (req, res) => {
    res.redirect('/not-found')
  });

  const port = process.env.PORT || 3000;

  const server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
  });
}