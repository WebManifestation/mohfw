'use strict';
const fs = require('fs');
const util = require('util');
const path = require('path');
const tabletojson = require('tabletojson').Tabletojson;
const diff = require('deep-diff').diff;
const readFile = util.promisify(fs.readFile);
const renameFile = util.promisify(fs.rename);
const writeFile = util.promisify(fs.writeFile);

async function updateTable() {
  const onlineTable = cleanupTable(await getTableData());
  const loadUsedTable = await (await readFile('data.json')).toString();
  const usedTable = JSON.parse(loadUsedTable);

  const check = diff(usedTable, onlineTable);

  if (!check) {
    console.log('No changes.');
  } else {
    const newFileName = path.join('./', 'backups/', `data-backup-${Date.now()}.json`);
    await renameFile('data.json', newFileName);

    await writeFile(`data.json`, JSON.stringify(onlineTable));
    console.log('New data has been saved.');
  }
}

function cleanupTable(rawData) {
  const cleanObj = {};
  const tableIndex = 1;
  for (let i = 0; i < rawData[tableIndex].length - 1; i++) {
    cleanObj[rawData[tableIndex][i]['Name of State / UT']] = {
      "S. No.": rawData[tableIndex][i]['S. No.'],
      "Total Confirmed cases (Indian National)": rawData[tableIndex][i]['Total Confirmed cases (Indian National)'],
      "Total Confirmed cases ( Foreign National )": rawData[tableIndex][i]['Total Confirmed cases ( Foreign National )'],
      "Cured/Discharged/Migrated": rawData[tableIndex][i]['Cured/Discharged/Migrated'],
      "Death": rawData[tableIndex][i]['Death']
    }
  }
  return cleanObj;
}

function getTableData() {
  return new Promise((resolve) => {
    tabletojson.convertUrl(
      'https://www.mohfw.gov.in',
      function (tablesAsJson) {
        resolve(tablesAsJson);
      }
    );
  });
}


module.exports = updateTable;