init();

async function init() {
  const mainElem = document.getElementById('main');
  const loadData = await fetch('/get-data');
  const data = await loadData.json();
  console.log(data);
  for (const prop in data) {
    const stateName = prop;
    const confirmedIndian = data[prop]['Total Confirmed cases (Indian National)'];
    const confirmedForeign = data[prop]['Total Confirmed cases ( Foreign National )'];
    const cured = data[prop]['Cured/Discharged'];
    const deaths = data[prop]['Death'];
    // console.log(`State = ${stateName}`);
    // console.log(`Total Confirmed cases (Indian National) = ${confirmedIndian}`);
    // console.log(`Total Confirmed cases ( Foreign National ) = ${confirmedForeign}`);
    // console.log(`Cured/Discharged = ${cured}`);
    // console.log(`_________________________`);

    const titleElm = document.createElement("H2");
    titleElm.appendChild(document.createTextNode(stateName));
    const confirmedIndianElm = document.createElement("div");
    confirmedIndianElm.appendChild(document.createTextNode(`Total Confirmed cases (Indian National): ${confirmedIndian}`));
    const confirmedForeignElm = document.createElement("div");
    confirmedForeignElm.appendChild(document.createTextNode(`Total Confirmed cases ( Foreign National ): ${confirmedForeign}`));
    const curedElm = document.createElement("div");
    curedElm.appendChild(document.createTextNode(`Cured/Discharged: ${cured}`));
    const deathsElm = document.createElement("div");
    deathsElm.appendChild(document.createTextNode(`Death: ${deaths}`));


    mainElem.appendChild(titleElm);
    mainElem.appendChild(confirmedIndianElm);
    mainElem.appendChild(confirmedForeignElm);
    mainElem.appendChild(curedElm);
    mainElem.appendChild(deathsElm);
  }
};