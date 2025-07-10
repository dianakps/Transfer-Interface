// Dummy JSON data - https://dummyjson.com/docs/carts
let newData = {};

fetch("https://dummyjson.com/carts")
  .then((res) => res.json())
  .then((data) => {
    const cartData = data.carts;

    cartData.forEach((cart) => {
      if (cart.products[1]) {
        newData[cart.id] = [
          [cart.products[1].title],
          [cart.products[1].quantity],
        ];
      }
    });

    const labels = extractValues();
    const dataPoints = Object.values(newData)
      .map((dt) => dt[1][0])
      .slice(2, 6);

    const ctx1 = document.getElementById("myChart1").getContext("2d");

    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Products",
            data: dataPoints,
            backgroundColor: [
              "rgba(34, 193, 195, .7)",
              "rgba(239, 253, 45, 0.7)",
              "rgba(87, 253, 45, 0.7)",
              "rgba(246, 45, 253, 0.7)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#ffff",
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ffff",
              font: {
                size: 12,
              },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#ffff",
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    // Second Chart
    const ForChart2 = {
      labels: labels,
      datasets: [
        {
          label: "Top 5 Locations",
          data: dataPoints,
          backgroundColor: [
            "rgba(34, 193, 195, .7)",
            "rgba(239, 253, 45, 0.7)",
            "rgba(87, 253, 45, 0.7)",
            "rgba(246, 45, 253, 0.7)",
          ],
          hoverOffset: 1,
        },
      ],
    };

    const ctx2 = document.getElementById("myChart2").getContext("2d");

    new Chart(ctx2, {
      type: "doughnut",
      data: ForChart2,
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#ffff",
              font: {
                size: 11,
              },
            },
          },
        },
      },
    });
  })
  .catch((err) => console.error("Fetch error:", err));

// Extracts titles from newData
function extractValues() {
  return Object.values(newData)
    .map((dt) => dt[0].toString())
    .slice(2, 6);
}
