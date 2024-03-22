import React from "react";
import ReactApexChart from "react-apexcharts";

class PlanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        { name: "Distance", data: [90, 120, 70, 130, 80, 140, 50] },
      ],
      options: {
        chart: {
          height: 200,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [3],
          colors: ["#0B2A97"],
          curve: "smooth",
        },
        legend: {
          show: false,
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          },
        },
        markers: {
          strokeWidth: [3],
          strokeColors: ["#0B2A97"],
          border: 0,
          colors: ["#fff"],
          hover: {
            size: 5,
          },
        },
        xaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          labels: {
            style: {
              colors: "#818995",
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 50,
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -16,
            style: {
              colors: '#818995',
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 50,
            },
          },
        },
        fill: {
          colors: ["#0b2a97"],
          type: "solid",
          opacity: 0,
        },
        colors: ["#0B2A97"],
        grid: {
          borderColor: "transparent",
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        responsive: [
          {
            breakpoint: 1601,
            options: {
              chart: {
                height: 400,
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 250,
              },
              markers: {
                strokeWidth: [4],
                strokeColors: ["#0B2A97"],
                border: 0,
                colors: ["#fff"],
                hover: {
                  size: 6,
                },
              },
              stroke: {
                width: [6],
                colors: ["#0B2A97"],
                curve: "smooth",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={200}
        />
      </div>
    );
  }
}

export default PlanList;
