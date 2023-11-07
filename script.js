ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    window.feed = function(callback) {
      var tick = {};
      tick.plot0 = 450; /*Math.ceil(350 + (Math.random() * 500));
      callback(JSON.stringify(tick));*/
    };
 
    var myConfig = {
      type: "gauge",
      globals: {
        fontSize: 25
      },
      plotarea: {
        marginTop: 80
      },
      plot: {
        size: '100%',
        valueBox: {
          placement: 'center',
          text: '%v' + 'V', //default
          fontSize: 50
          /*rules: [{
              rule: '%v >= 700',
              text: '%v<br>EXCELLENT'
            },
            {
              rule: '%v < 700 && %v > 640',
              text: '%v<br>Good'
            },
            {
              rule: '%v < 640 && %v > 580',
              text: '%v<br>Fair'
            },
            {
              rule: '%v <  580',
              text: '%v<br>Bad'
            }
          ]*/
        }
      },
      tooltip: {
        borderRadius: 10
      },
      scaleR: {
        aperture: 180,
        minValue: 0,
        maxValue: 1000,
        step: 1,
        center: {
          visible: false
        },
        tick: {
          visible: false
        },
        item: {
          offsetR: 0,
          rules: [{
            rule: '%i == 9',
            offsetX: 15
          }]
        },
        /*labels: ['0', '', '', '', '', '', '580', '640', '700', '750', '', '850'],*/
        ring: {
          size: 50,
          rules: [{
              rule: '%v > 200',
              backgroundColor: '#E53935'
            },
            {
              rule: '%v < 200',
              backgroundColor: '#EF5350'
            }     
          ]
        }
      },
      refresh: {
        type: "feed",
        transport: "js",
        url: "feed()",
        interval: 1000,
        resetTimeout: 1000
      },
      series: [{
        values: [0], // starting value
        backgroundColor: 'black',
        indicator: [10, 10, 10, 10, 0.75],
        animation: {
          effect: 2,
          method: 1,
          sequence: 4,
          speed: 900
        },
      }]
    };
 
    zingchart.render({
      id: 'chartVoltage',
      data: myConfig,
      height: 500,
      width: '100%'
    });
    zingchart.render({
      id: 'chartCurrent',
      data: myConfig,
      height: 500,
      width: '100%'
    });
    zingchart.render({
      id: 'chartPower',
      data: myConfig,
      height: 500,
      width: '100%'
    });
