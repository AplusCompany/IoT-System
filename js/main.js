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

// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import * as firebase from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configursation
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDZBv-FEKl8ndQ4rF9XI_3VuaWGryvo2q4",
    authDomain: "esp8266-1-ef318.firebaseapp.com",
    databaseURL: "https://esp8266-1-ef318-default-rtdb.firebaseio.com",
    projectId: "esp8266-1-ef318",
    storageBucket: "esp8266-1-ef318.appspot.com",
    messagingSenderId: "364028484942",
    appId: "1:364028484942:web:a65516978fe2f05ed3921f",
    measurementId: "G-RMVMEP5QHV"
  };
  
  // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  
  
    // Retrieving Data
  const database = firebase.getDatabase();
  


// Line Graph
  let lineArr = [], tempArr = []; 
  const linePaths = ['trialsTemp','manualMesuaredValues'];

  const drawSecChart = (arrX, arrY) => {
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
              { x: arrX[0], y: arrY[0] },
              { x: arrX[1], y: arrY[1] },
              { x: arrX[2], y: arrY[2] },
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
              { x: arrX[0], y: 2 },
              { x: arrX[1], y: 3.7 },
              { x: arrX[2], y: 5.4 },
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
  }

  const getLineGraphDataAsArr = () => {
      return new Promise((resolve, reject) => {
          linePaths.forEach(path => {
            let starCountRef = firebase.ref(database, path);
            firebase.onValue(starCountRef, snapshot => {
              if(snapshot.key == linePaths[0]) {
                snapshot.forEach(snap => {
                  tempArr.push((snap.val()).toString());
                })
              } else {
                snapshot.forEach(snap => {
                  lineArr.push(snap.val())
                  if(lineArr.length == 1) {
                    resolve("On the line!");
                  } else {
                    reject("Shit!")
                  }
                });
              }
            })
          })
    });
  }

  getLineGraphDataAsArr().then(res => {
    console.log("Drawing Line Graph");
    console.log(tempArr);
    console.log(lineArr);
    drawSecChart(tempArr, lineArr);
  }).catch(err => console.log("err"));
  
// Bar Chart

const paths = ['trialOneLevel', 'trialTwoLevel', 'trialThreeLevel']
let arr1 = [], arr2 = [], arr3 = [];

const getDataAsArr = () => {
return new Promise((resolve, reject) => {
  paths.forEach(path => {
    let starCountRef = firebase.ref(database, path);
    firebase.onValue(starCountRef, snapshot => {
      arr1.push(snapshot.val().value1);
      arr2.push(snapshot.val().value2);
      arr3.push(snapshot.val().value3);
      if(path == 'trialThreeLevel' && arr1.length == 3) {
        resolve("Resolved!");
      } 
    })
  })
});
}

const drawCharts = (arrOne, arrTwo, arrThree, arrTemp) => {
    var ctx1 = $("#worldwide-sales")
    .get(0)
    .getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: [`ΔT=${arrTemp[0]}°C`, `ΔT=${arrTemp[1]}C`, `ΔT=${arrTemp[2]}C`],

      //datasets: the values required from the firebase
      datasets: [
        {
          label: "L1", 
          data: arrOne,
          backgroundColor: "#00203c",
        },
        {
          label: "L2",
          data: arrTwo,
          backgroundColor: "#118DF0",
        },
        {
          label: "L3",
          data: arrThree,
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
}

getDataAsArr().then(res => {
  console.log('Fulfilled');
  console.log('Drawing');
  drawCharts(arr1, arr2, arr3, tempArr);
  console.log(arr1);
  console.log(arr2);
  console.log(arr3);
}).catch(err => console.log(err));

// Calculator

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