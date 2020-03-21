init();

async function init() {
  const mainElem = document.getElementById('main');
  const loadData = await fetch('/get-data');
  const data = await loadData.json();
  console.log(data);
  const stateNameArr = [];
  const confirmedIndianArr = [];
  const confirmedForeignArr = [];
  const curedArr = [];
  const deathsArr = [];
  for (const prop in data) {
    const stateName = prop;
    const confirmedIndian = data[prop]['Total Confirmed cases (Indian National)'];
    const confirmedForeign = data[prop]['Total Confirmed cases ( Foreign National )'];
    const cured = data[prop]['Cured/Discharged/Migrated'];
    const deaths = data[prop]['Death'];

    stateNameArr.push(stateName);
    confirmedIndianArr.push(confirmedIndian);
    confirmedForeignArr.push(confirmedForeign);
    curedArr.push(cured);
    deathsArr.push(deaths);
    // console.log(`State = ${stateName}`);
    // console.log(`Total Confirmed cases (Indian National) = ${confirmedIndian}`);
    // console.log(`Total Confirmed cases ( Foreign National ) = ${confirmedForeign}`);
    // console.log(`Cured/Discharged/Migrated = ${cured}`);
    // console.log(`_________________________`);

    const titleElm = document.createElement("H2");
    titleElm.appendChild(document.createTextNode(stateName));
    const confirmedIndianElm = document.createElement("div");
    confirmedIndianElm.appendChild(document.createTextNode(`Total Confirmed cases (Indian National): ${confirmedIndian}`));
    const confirmedForeignElm = document.createElement("div");
    confirmedForeignElm.appendChild(document.createTextNode(`Total Confirmed cases ( Foreign National ): ${confirmedForeign}`));
    const curedElm = document.createElement("div");
    curedElm.appendChild(document.createTextNode(`Cured/Discharged/Migrated: ${cured}`));
    const deathsElm = document.createElement("div");
    deathsElm.appendChild(document.createTextNode(`Death: ${deaths}`));


    mainElem.appendChild(titleElm);
    mainElem.appendChild(confirmedIndianElm);
    mainElem.appendChild(confirmedForeignElm);
    mainElem.appendChild(curedElm);
    mainElem.appendChild(deathsElm);
  }


  const stateShortNames = { "Andaman and Nicobar Islands": "AN", "Andhra Pradesh": "AP", "Arunachal Pradesh": "AR", "Assam": "AS", "Bihar": "BR", "Chandigarh": "CG", "Chhattisgarh": "CH", "Dadra and Nagar Haveli": "DN", "Daman and Diu": "DD", "Delhi": "DL", "Goa": "GA", "Gujarat": "GJ", "Haryana": "HR", "Himachal Pradesh": "HP", "Jammu and Kashmir": "JK", "Jharkhand": "JH", "Karnataka": "KA", "Kerala": "KL", "Ladakh": "LA", "Lakshadweep": "LD", "Madhya Pradesh": "MP", "Maharashtra": "MH", "Manipur": "MN", "Meghalaya": "ML", "Mizoram": "MZ", "Nagaland": "NL", "Odisha": "OR", "Puducherry": "PY", "Punjab": "PB", "Rajasthan": "RJ", "Sikkim": "SK", "Tamil Nadu": "TN", "Telangana": "TS", "Tripura": "TR", "Uttar Pradesh": "UP", "Uttarakhand": "UK", "West Bengal": "WB" };

  const wrapperElem = document.getElementById('wrapper');
  var ctx = document.getElementById('myChart').getContext('2d');
  // document.getElementById('myChart').parentNode.style.height = '1000px';
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
      labels: stateNameArr,
      datasets: [
        {
          label: 'Total Confirmed cases (Indian National)',
          backgroundColor: 'hsl(30, 90%, 60%)',
          // barThickness: 10,
          // barPercentage: 0.5,
          // categoryPercentage: 0.1,
          data: confirmedIndianArr
        },
        {
          label: 'Total Confirmed cases ( Foreign National )',
          backgroundColor: 'hsl(200, 70%, 40%)',
          data: confirmedForeignArr
        },
        {
          label: 'Cured/Discharged/Migrated',
          backgroundColor: 'hsl(120, 60%, 60%)',
          data: curedArr
        },
        {
          label: 'Death',
          backgroundColor: 'hsla(0, 90%, 60%)',
          data: deathsArr
        }
      ]
    },

    // Configuration options go here
    options: {
      layout: {
        padding: {
          right: 32 + 8
        }
      },
      scales: {
        pointLabels :{
          fontColor: '#333',
          fontSize: 12,
          fontWeight: 600,
        },
        yAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold',
            lineHeight: 1.5,
            // maxRotation: 90,
            // minRotation: 45
            callback: function (value, index, values) {
              // console.log(value, index, values);
              // console.log(value.split(' '));
              // if (value.length > 12) {
              //   return stateShortNames[value];
              // }
              return value.split(' ');
            }
          }
        }]
      },
      // responsiveAnimationDuration: 100,
      // aspectRatio: 1,
      maintainAspectRatio: false,
      responsive: true,
      title: {
        display: true,
        text: 'Corona in India'
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          color: 'white',
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          align: 'end',
          // offset: 16,
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  });
  console.log(chart);
  console.log(stateNameArr.length);
  // chart.getDatasetMeta(1).hidden = true;
  // chart.getDatasetMeta(2).hidden = true;
  // chart.getDatasetMeta(3).hidden = true;
  // chart.options.aspectRatio = 0.5;
  // chart.update();
  wrapperElem.style.height = stateNameArr.length * 175 + 'px';
  // chart.resize();

  // chart.canvas.onclick = function (e) {

  //   // console.log(wrapperElem.style.height)
  //   // console.log(chart.getDatasetAtEvent(e));
  // }
};