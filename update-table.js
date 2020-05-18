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

  delete usedTable.timestamp;

  const check = diff(usedTable, onlineTable);

  const indiaTime = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  if (!check) {
    console.log(indiaTime + ': No changes.');
  } else {
    const newFileName = path.join('./', 'backups/', `data-backup-${Date.now()}.json`);
    await renameFile('data.json', newFileName);

    onlineTable.timestamp = Date.now();
    await writeFile(`data.json`, JSON.stringify(onlineTable));
    console.log(indiaTime + ': New data has been saved.');
  }
}

function cleanupTable(rawData) {
  // Find right table
  let tableIndex = 0;
  for (let i = 0; i < rawData.length; i++) {
    const table = rawData[i];
    if (table[0]['Name of State / UT']) {
      tableIndex = i;
      break;
    }
  }
  const cleanObj = {};
  for (let i = 0; i < rawData[tableIndex].length; i++) {
    if (parseInt(rawData[tableIndex][i]['S. No.'])) {

      cleanObj[rawData[tableIndex][i]['Name of State / UT']] = {
        "S. No.": rawData[tableIndex][i]['S. No.'],
        "Total Confirmed cases (Indian National)": parseInt(findRightKeyValue(rawData[tableIndex][i], 'Total Confirmed')),
        "Total Confirmed cases ( Foreign National )": 0,
        "Cured/Discharged/Migrated": parseInt(findRightKeyValue(rawData[tableIndex][i], 'Cured')),
        "Death": parseInt(findRightKeyValue(rawData[tableIndex][i], 'Death'))
      }
    }
  }
  return cleanObj;
}

function findRightKeyValue(obj, keyPart) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key.indexOf(keyPart) !== -1) {
        return obj[key];
      }
    }
  }
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