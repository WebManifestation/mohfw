'use strict';
const fs = require('fs');
const util = require('util');
const path = require('path');
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

async function readPastData() {
  const totalData = [];
  let loadUsedTable = await (await readFile('data.json')).toString();
  loadUsedTable = JSON.parse(loadUsedTable);

  const currentTotals = setupObject(loadUsedTable);

  let fileList = await readDir(path.join('./', 'backups/'));
  fileList = fileList.filter(file => file.match('.json'));
  
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    let loadTable = await (await readFile(path.join('./', 'backups/', file))).toString();
    loadTable = JSON.parse(loadTable);
    totalData.push(setupObject(loadTable));
  }

  totalData.push(currentTotals);
  return totalData;
}

function setupObject(obj) {
  const currentTotals = {};
  const stateNameArr = [];
  const confirmedIndianArr = [];
  const confirmedForeignArr = [];
  const curedArr = [];
  const deathsArr = [];
  for (const prop in obj) {
    if (obj[prop]['Total Confirmed cases (Indian National)']) {
      const stateName = prop;
      const confirmedIndian = obj[prop]['Total Confirmed cases (Indian National)'];
      const confirmedForeign = obj[prop]['Total Confirmed cases ( Foreign National )'];
      const cured = obj[prop]['Cured/Discharged/Migrated'];
      const deaths = obj[prop]['Death'];


      stateNameArr.push(stateName);
      confirmedIndianArr.push(confirmedIndian);
      confirmedForeignArr.push(confirmedForeign);
      curedArr.push(cured);
      deathsArr.push(deaths);
    }
  }
  currentTotals.confirmedIndian = confirmedIndianArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  currentTotals.confirmedForeign = confirmedForeignArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  currentTotals.cured = curedArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  currentTotals.deaths = deathsArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  currentTotals.timestamp = obj.timestamp;

  return currentTotals;
}

module.exports = readPastData;