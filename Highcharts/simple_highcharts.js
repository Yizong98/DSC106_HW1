// console.log("Hello World from simple_highcharts.js!");

// Data of the line chart
var series2 = [
    {
       name: "fulltime_men_admitted",
       data: []
    },
    {
      name: "fulltime_men_applied",
      data: []
   },
   {
      name: "fulltime_men_enrolled",
      data: []
   },
   {
      name: "fulltime_women_admitted",
      data: []
   },
   {
      name: "fulltime_women_applied",
      data: []
   },
   {
      name: "fulltime_women_enrolled",
      data: []
   },
]

var series3 = [
   {
      name: "fulltime_women_admitted",
      data: []
   },
   {
      name: "fulltime_women_applied",
      data: []
   },
   {
      name: "fulltime_women_enrolled",
      data: []
   },
   ]

 // Configuration about the plot
 var title = {
    text: 'Monthly Average Temperature'   
 };
 var subtitle = {
    text: 'Source: WorldClimate.com'
 };
 var xAxis = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'
       ,'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
 };

 var range = [...Array(14).keys()];
 var categories2 = range.map(x => x + 2005);
 var xAxis2 = {
   categories: categories2
};

var xAxis3 = {
   categories: categories2.slice(0,13)
};

 var yAxis = {
    title: {
       text: 'Number of people'
    },
    plotLines: [{
       value: 0,
       width: 1,
       color: '#808080'
    }]
 };  
 var tooltip = {
    valueSuffix: '\xB0C'    // /xB0C is basically degrees
 }
 var legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
 };

function asyncDraw_LINE(){
   // Data structure to hold all the configurations together
   var json = {};

   // Tying all the configurations
   json.title = title;
   json.subtitle = subtitle;
   //json.xAxis = xAxis2;
   json.xAxis = xAxis2;
   json.yAxis = yAxis;
   json.tooltip = tooltip;
   json.legend = legend;

   // Tying the data as the series data
   json.series = series2;
   // We need to couple the chart data structure with the chartPlaceHolder div
   var someVar = document.getElementById("chartPlaceHolder");
   Highcharts.chart(someVar, json);
 }

// fulltime_men_admitted, fulltime_men_applied, fulltime_men_enrolled, fulltime_women_admitted, fulltime_women_applied, fulltime_women_enrolled
function getArr(){
   $(document).ready(function(){
      $.getJSON("ucsd_common_converted.json", function(result){
       $.each(result, function(i, field){
          $.each(field.slice(0,-1), function(i, ele){
             series2[i]["data"].unshift(parseInt(ele.replace(/,/g,""), 10));
          })
          $.each(field.slice(-4,-1), function(i, ele){
            series3[i]["data"].unshift(parseInt(ele.replace(/,/g,""), 10));
         })
        })
      }).done(function(result) {
          asyncDraw_LINE();
          asyncDraw_BAR();
          asyncDraw_PIE();
       }).fail(function(result) {
          alert("error");
       }).always(function(result) {
          alert("complete");
       });
  });
  return;
}

function asyncDraw_BAR(){
   // Data structure to hold all the configurations together
   // We need to couple the chart data structure with the chartPlaceHolder div
   var someVar = document.getElementById("haha");
   Highcharts.chart(someVar, {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Historic World Population by Region'
      },
      subtitle: {
          text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
      },
      xAxis: {
          categories: categories2,
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Population (millions)',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          valueSuffix: ' millions'
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true
      },
      credits: {
          enabled: false
      },
      series: series3
   });

 }

 function asyncDraw_PIE(){
   Highcharts.chart('hehe', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Full Time applicants admitted by gender ratio, 2018'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
          name: 'fulltime_admitted',
          colorByPoint: true,
          data: [{
              name: 'Woman',
              y: 15821,
              sliced: true,
              selected: true
          }, {
              name: 'Man',
              y: 13781,
              sliced: true,
              selected: true}]
      }]
   });

 }
 

getArr();