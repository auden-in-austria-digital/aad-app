Highcharts.getJSON(
  "js/json/analytics/Sender_receiver_addresses_XY.json",
  function (data) {
    let features = data.features;
    var auden = [];
    var audenD = {};
    var stella = [];
    var stellaD = {};
    var mendelson = [];
    var mendelsonD = {};
    var sullivan = [];
    var sullivanD = {};
    var kraus = [];
    var krausD = {};

    for (let x in features) {
      if (features[x].attributes.Role === "Sender") {
        // convert unix date to m/d/y
        let d = features[x].attributes.Date;
        let nd = new Date(d);
        // let ndd = nd.getDate(nd);
        // let ndm = nd.getMonth(nd);
        let ndy = nd.getFullYear(nd);
        // let dr = `${ndd}/${ndm}/${ndy}`;
        let dr = ndy;

        if (features[x].attributes.From_Person == "W. H. Auden") {
          if (!audenD[dr]) {
            audenD[dr] = 0;
          }
          audenD[dr] += 1;
        }

        if (features[x].attributes.From_Person == "Stella Musulin") {
          if (!stellaD[dr]) {
            stellaD[dr] = 0;
          }
          stellaD[dr] += 1;
        }

        if (features[x].attributes.From_Person == "Edward Mendelson") {
          if (!mendelsonD[dr]) {
            mendelsonD[dr] = 0;
          }
          mendelsonD[dr] += 1;
        }

        if (features[x].attributes.From_Person == "Michael O'Sullivan") {
          if (!sullivanD[dr]) {
            sullivanD[dr] = 0;
          }
          sullivanD[dr] += 1;
        }

        if (features[x].attributes.From_Person == "Dr. Wolfgang Kraus") {
          if (!krausD[dr]) {
            krausD[dr] = 0;
          }
          krausD[dr] += 1;
        }
      }
    }

    for (let [key, value] of Object.entries(audenD)) {
      auden.push([Date.UTC(key), value]);
    }

    for (let [key, value] of Object.entries(stellaD)) {
      stella.push([Date.UTC(key), value]);
    }

    for (let [key, value] of Object.entries(mendelsonD)) {
      mendelson.push([Date.UTC(key), value]);
    }

    for (let [key, value] of Object.entries(sullivanD)) {
      sullivan.push([Date.UTC(key), value]);
    }

    for (let [key, value] of Object.entries(krausD)) {
      kraus.push([Date.UTC(key), value]);
    }

    Highcharts.chart("container", {
      title: {
        text: "",
      },

      yAxis: {
        title: {
          text: "Number of Letters",
        },
        min: 0,
      },

      xAxis: {
        type: "datetime",
        title: {
          text: "Year",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true,
            inside: true,
            radius: 2.5,
            
          },
        },
      },

      series: [
      
        {
          name: "Auden W.H.",
          data: auden,
        },
        {
          name: "Stella Musulin",
          data: stella,
        },
       ] 
    });
  }
);
