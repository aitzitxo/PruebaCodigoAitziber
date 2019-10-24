//CHART1: LINE CHART CONFIGURATION
var chart1 = Highcharts.chart('chart1', {
    title: {
      text: 'Ejercicio 2'
    },
    subtitle: {
      text: 'Chart 1'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { 
        month: '%e. %b'
      },
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Value'
      },
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
    },
  
    plotOptions: {
      series: {
        marker: {
          enabled: true
        }
      }
    },
  
    series: [],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          plotOptions: {
            series: {
              marker: {
                radius: 2.5
              }
            }
          }
        }
      }]
    }
  });

//CHART2: PIE CHART CONFIGURATION
var chart2 = Highcharts.chart('chart2', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title:{
        text: ''
    },
    subtitle: {
      text: 'Chart 2'
    },
    tooltip: {
      pointFormat: ' <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
        colorByPoint: true,
        data: []
      }]
  });


var array_url = ['https://s3.amazonaws.com/logtrust-static/test/test/data1.json', 'https://s3.amazonaws.com/logtrust-static/test/test/data2.json', 'https://s3.amazonaws.com/logtrust-static/test/test/data3.json']  

function executeAjax(i) {
    $.ajax({ 
        type: 'GET', 
        url: array_url[i], 
        data: { get_param: 'val' }, 
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                var name;
                var obj;
                // PARSE JSON VALUES
                switch(i){
                    case "0":
                        name = (element.cat).toUpperCase(); 
                        obj =[element.d, element.value];
                        break;
                    case "1":
                         name = (element.categ).toUpperCase(); 
                         obj =[Date.parse(element.myDate), element.val];
                        break;
                    case "2":
                        name = (element.raw.match(/cat\s\d/i)[0]).toUpperCase();
                        obj =[Date.parse(element.raw.match(/\d{4}([\/.-])\d{2}\1\d{2}/g)), element.val];
                        break;
                    default:    
                }

                //ADD VALUES TO CHART 1
                var serieExists = false;
                for (k in chart1.series){
                    if (chart1.series[k].name == name){
                        chart1.series[k].addPoint(obj);
                        serieExists = true
                    }
                }
                if (!serieExists){
                    chart1.addSeries({name: name, data: [obj]})
                }

            });

            //ADD VALUES TO CHART 2
            var data = [];
            for(k in chart1.series){
                var msgTotal = chart1.series[k].data.reduce(function(prev, cur) {
                    console.log(prev);
                    console.log(cur.y);
                    return prev + cur.y;
                  }, 0);
                console.log(msgTotal);

                data.push({name: chart1.series[k].name, y: msgTotal});
                
            }
            chart2.series[0].setData(data);
        }
    });
}

//EXECUTE AXAJ CALL FOR EACH URL
for (i in array_url){    
    executeAjax(i);
}

