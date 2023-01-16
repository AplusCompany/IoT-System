// Spinner
var spinner = function () {
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 800);
};
spinner();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      { scrollTop: 0 },
      1500,
      "easeInOutExpo",
    );
    return false;
  });

  // // Sidebar Toggler
  // $(".sidebar-toggler").click(function () {
  //   $(".sidebar, .content").toggleClass("open");
  //   return false;
  // });

  // Progress Bar
  $(".pg-bar").waypoint(
    function () {
      $(".progress .progress-bar").each(
        function () {
          $(this).css(
            "width",
            $(this).attr("aria-valuenow") + "%",
          );
        },
      );
    },
    { offset: "80%" },
  );

  //Charts Start

  // first-chart
  var ctx1 = $("#worldwide-sales")
    .get(0)
    .getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["ΔT=30°C", "ΔT=50°C", "ΔT=70°C"],

      //datasets: the values required from the firebase
      datasets: [
        {
          label: "L1", 
          data: [1.8, 3.7, 5.1],
          backgroundColor: "#00203c",
        },
        {
          label: "L2",
          data: [2, 3.6, 5.3],
          backgroundColor: "#118DF0",
        },
        {
          label: "L3",
          data: [1.9, 3.4, 5.5],
          backgroundColor: "#ed0930",
        },
      ],
    },
    options: {
      responsive: true,
      y: {
        max: 6,
        ticks: {
          stepSize: 0.5,
        },
      },
    },
  });

  // second chart
  const labels = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Experimental Values",
        fill: false,
        backgroundColor: "#ed0930",
        borderColor: "#ed0930",
        //data: values required from the firebase (line)
        data: [
          { x: "30", y: 2 },
          { x: "50", y: 3.5 },
          { x: "70", y: 5.4 },
        ],
      },
      {
        label: "Theoretical Values",
        fill: false,
        backgroundColor: "#00203c",
        borderColor: "#00203c",
        borderDash: [5, 5],
        // the standard theretical values (dashed line)
        data: [
          { x: "30", y: 2 },
          { x: "50", y: 3.7 },
          { x: "70", y: 5.4 },
        ],
      },
    ],
  };
  const config = {
    type: "line",
    data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          autoskip: true,
          autoSkipPadding: 5,
          display: true,
          title: {
            display: true,
            text: "Change in Temperature (°C)",
          },
        },
        y: {
          min: 0,
          max: 6,
          ticks: {
            stepSize: 0.5,
          },
          display: true,
          title: {
            display: true,
            text: "Sea Level Rise (c m)",
          },
        },
      },
    },
  };
  var myChart2 = new Chart(
    document.getElementById("salse-revenue"),
    config,
  );

  // calculator

let itemTemp = document.getElementById("item-temp-long");
let itemLength = document.getElementById("item-length-long");
let item = document.querySelector(".item");

document.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    itemTemp.innerHTML = "ΔT = " + event.target.value + "°C";
    itemLength.innerHTML = "ΔL = " + event.target.id + "cm";
  } else {
    itemTemp.innerHTML = "Temperature Change";
    itemLength.innerHTML = "Sea Level Rise";
    }
});


const readingProgress = document.querySelector(
  "#reading-progress-fill",
);
document.addEventListener("scroll", function (e) {
  let w =
    ((document.body.scrollTop ||
      document.documentElement.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;
  readingProgress.style.setProperty(
    "width",
    w + "%",
  );
});