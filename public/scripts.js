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
    const cured = data[prop]['Cured/Discharged/Migrated'];
    const deaths = data[prop]['Death'];
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

  const stateList = {
    'Andhra Pradesh': 'AP',
    'Chhattisgarh': 'CT',
    'Delhi': 'DL',
    'Gujarat': 'GJ',
    'Haryana': 'HR',
    'Himachal Pradesh': 'HP',
    'Karnataka': 'KA',
    'Kerala': 'KL',
    'Madhya Pradesh': 'MP',
    'Maharashtra': 'MH',
    'Odisha': 'OR',
    'Puducherry': 'PY',
    'Punjab': 'PB',
    'Rajasthan': 'RJ',
    'Tamil Nadu': 'TN',
    'Telengana': 'TL',
    'Chandigarh': 'CH',
    'Jammu and Kashmir': 'JK',
    'Uttar Pradesh': 'UP',
    'West Bengal': 'WB'
  }

  const theMap = zingchart.loadModules('maps, maps-ind', function(e) {
    zingchart.render ({
      id: 'myChart',
      data: {
        shapes: [
          {
            type: 'zingchart.maps',
            options: {
              name: 'ind',
       
              zooming: false,
              panning: true,
              scrolling: false,
              
              style: {
                controls: {
                  visible: true
                },
                label: {
                  // visible: false,
                },
                fillType: 'radial',
                cursor: 'pointer',
                hoverState: {
                  alpha: 0.3,
                  backgroundColor: 'white',
                },
                items: {
                  MP: {
                    backgroundColor: 'red',
                    label: {
                      visible: true,
                      // text: 'asdfads'
                    }
                  }
                },
                tooltip: {
                  alpha: 0.8,
                  backgroundColor: 'white',
                  borderColor: 'white',
                  borderRadius: 3,
                  fontColor: 'black',
                  // fontFamily: 'Georgia',
                  fontSize: 22,
                  textAlpha: 1
                }
              }
            }
          }
        ]
      },
      height: 600,
      width: '100%'
    });
  });

  console.log(theMap);
};