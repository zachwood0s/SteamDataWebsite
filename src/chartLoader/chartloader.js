import Chart from "chart.js"

const charts = []
charts["PopularGames"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'bubble',
    data: {
      label: 'Popular Games Being Played Now!!!!',
      datasets: data
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Most Popular Games Being Played'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
    }
  });
}
charts["UsersTopGames"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'bar',
    data: data,
    options:
    {
      title: {
        display: true,
        text: 'Users Top 6 Games'
      },
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            autoSkip: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }]
      },
    }
  });
}
charts["UsersGameRecommendRatio"] = function (ctx, data) {
  return new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      rotation: -Math.PI,
      cutoutPercentage: 50,
      circumference: Math.PI,
      responsive: false,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Games Recommended vs Not Recommended'
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
    }
  });
}
charts["UsersGameGenre"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Users Games by Genre'
      },
      legend: {
        position: 'left'
      },
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }]
      },
    }
  });
}

charts["GamesReviewsOverTime"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Reviews Over Time'
      },
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }]
      }
    }
  });
}
charts["GameRecommendRate"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: false,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Game Recommendations'
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false,
        }]
      },
    }
  });
}

charts["BundleGenres"] = function (ctx, data) {
  return new Chart(ctx, {
    type: 'polarArea',
    data: data,
    options: {
      title: {
        display: true,
        text: "Bundles Games by Genre"
      },
      responsive: false,
      maintainAspectRatio: false,
      scale: {
        xAxes: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });
}
function loadChart(name, ctx, datasets) {
  charts[name](ctx, datasets)
}

export default {
  loadChart
}