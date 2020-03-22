init();

async function init() {
  const wrapperElem = document.getElementById('wrapper');
  const confirmedIndianLegend = document.getElementById('confirmed-indian');
  const confirmedForeignLegend = document.getElementById('confirmed-Foreign');
  const curedLegend = document.getElementById('cured');
  const deathsLegend = document.getElementById('deaths');
  const totalConfirmedIndianElem = document.getElementById('total-confirmed-indian');
  const totalConfirmedForeignElem = document.getElementById('total-confirmed-foreign');
  const totalCuredElem = document.getElementById('total-cured');
  const totalDeathsElem = document.getElementById('total-deaths');
  const mohfwLink = document.getElementById('mohfw-link');
  const loadData = await fetch('/get-data');
  const data = await loadData.json();
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
  }

  const totalConfirmedIndian = confirmedIndianArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const totalConfirmedForeign = confirmedForeignArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const totalCured = curedArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const totalDeaths = deathsArr.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  totalConfirmedIndianElem.innerHTML = totalConfirmedIndian;
  totalConfirmedForeignElem.innerHTML = totalConfirmedForeign;
  totalCuredElem.innerHTML = totalCured;
  totalDeathsElem.innerHTML = totalDeaths;

  wrapperElem.style.height = stateNameArr.length * 175 + 'px';

  const ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontFamily = "'Montserrat', sans-serif";


  const chart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: stateNameArr,
      datasets: [
        {
          label: 'Total Confirmed cases (Indian National)',
          backgroundColor: 'hsl(30, 90%, 60%)',
          data: confirmedIndianArr
        },
        {
          label: 'Total Confirmed cases (Foreign National)',
          backgroundColor: 'hsl(200, 70%, 40%)',
          data: confirmedForeignArr
        },
        {
          label: 'Cured/Discharged/Migrated',
          backgroundColor: 'hsl(120, 60%, 60%)',
          data: curedArr
        },
        {
          label: 'Deaths',
          backgroundColor: 'hsla(0, 90%, 60%)',
          data: deathsArr
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      layout: {
        padding: {
          right: 35
        }
      },
      scales: {
        pointLabels: {
          fontColor: '#333',
          fontSize: 12,
          fontWeight: 600,
        },
        yAxes: [{
          ticks: {
            fontSize: 16,
            fontStyle: 'bold',
            lineHeight: 1.5,
            callback: function (value, index, values) {
              return value.split(' ');
            }
          }
        }]
      },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          color: 'white',
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          align: 'end',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  });

  confirmedIndianLegend.addEventListener('click', () => {
    let value = 0;
    if (chart.getDatasetMeta(0).hidden) {
      chart.getDatasetMeta(0).hidden = null;
      confirmedIndianLegend.style.opacity = 1;
      confirmedIndianLegend.style.textDecoration = 'none';
      value = 1;
    } else {
      chart.getDatasetMeta(0).hidden = true;
      confirmedIndianLegend.style.opacity = 0.5;
      confirmedIndianLegend.style.textDecoration = 'line-through';
    }
    gtag('event', 'click', {
      'event_category': 'filter',
      'event_label': 'Total Confirmed cases (Indian National)',
      'value': value
    });
    chart.update();
  });
  confirmedForeignLegend.addEventListener('click', () => {
    let value = 0;
    if (chart.getDatasetMeta(1).hidden) {
      chart.getDatasetMeta(1).hidden = null;
      confirmedForeignLegend.style.opacity = 1;
      confirmedForeignLegend.style.textDecoration = 'none';
      value = 1;
    } else {
      chart.getDatasetMeta(1).hidden = true;
      confirmedForeignLegend.style.opacity = 0.5;
      confirmedForeignLegend.style.textDecoration = 'line-through';
    }
    gtag('event', 'click', {
      'event_category': 'filter',
      'event_label': 'Total Confirmed cases (Foreign National)',
      'value': value
    });
    chart.update();
  });
  curedLegend.addEventListener('click', () => {
    let value = 0;
    if (chart.getDatasetMeta(2).hidden) {
      chart.getDatasetMeta(2).hidden = null;
      curedLegend.style.opacity = 1;
      curedLegend.style.textDecoration = 'none';
      value = 1;
    } else {
      chart.getDatasetMeta(2).hidden = true;
      curedLegend.style.opacity = 0.5;
      curedLegend.style.textDecoration = 'line-through';
    }
    gtag('event', 'click', {
      'event_category': 'Filter',
      'event_label': 'Cured/Discharged/Migrated',
      'value': value
    });
    chart.update();
  });
  deathsLegend.addEventListener('click', () => {
    let value = 0;
    if (chart.getDatasetMeta(3).hidden) {
      chart.getDatasetMeta(3).hidden = null;
      deathsLegend.style.opacity = 1;
      deathsLegend.style.textDecoration = 'none';
      value = 1;
    } else {
      chart.getDatasetMeta(3).hidden = true;
      deathsLegend.style.opacity = 0.5;
      deathsLegend.style.textDecoration = 'line-through';
    }
    gtag('event', 'click', {
      'event_category': 'Filter',
      'event_label': 'Deaths',
      'value': value
    });
    chart.update();
  });

  mohfwLink.addEventListener('click', () => {
    gtag('event', 'click', {
      'event_category': 'External link',
      'event_label': 'mohfw-link',
    });
  });
};