
const pie = {};
/*
 * TODO: Scale fontsize down based on media size
 */

/*
 * Pie Default
 */

pie.Default = {};
pie.Default.desktop = {
    title: {
      left: 'center',
      textStyle: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "bold",
        color: "#000000",
        height: 0
        },
        subtextStyle: {
            fontSize: 12,
            lineHeight: 16,
            color: "#000000",
        }
    
    },
    grid: {
      bottom: 0
    },
     tooltip: {
          trigger: "item",
          formatter: (a) => {
            return `${a.name}:<br>${a.value}`
          },
          backgroundColor: "rgba(0, 0, 0, .6)",
          textStyle: {
            color: 'white'
          },
          extraCssText: 'text-align:center'
        },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 10,
        textStyle: {
              fontSize: 15,
              color: 'black'
        }
      },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ["50%", "50%"],
            selectedMode: "single",
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
       emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
        },
       label: {
          show: true,
          position: 'inside',
          fontSize: 15,
          color: '#000000',
          formatter: (a) => {
            let percentFlag = a.data.percentFlag;
            let value = a.value;
            return percentFlag ? `${value}%` : `${value}`;
          }
        },
      }
    ]
  };


pie.Labels = {};
pie.Labels.desktop = {
    info: {
      minHeight: 350
    },
    title: {
      left: 'center',
      textStyle: {
              fontSize: 35,
              fontWeight: "bold",
              color: "#000000",
          },
          subtextStyle: {
            fontSize: 18,
            color: "#000000",
        }
    },
    grid: {
      bottom: 0
    },
    toolbox: {
      feature: {
      saveAsImage: {}
      }
    },
     tooltip: {
          trigger: "item",
          formatter: (a) => {
            return `${a.name}:<br>${a.value}`
          },
          backgroundColor: "rgba(0, 0, 0, .6)",
          textStyle: {
            color: 'white'
          },
          extraCssText: 'text-align:center'
        },
      legend: {
        orient: 'horizontal',
        position: 'bottom',
        left: 10,
        bottom: 0,
        textStyle: {
              fontSize: 15,
              color: 'black'
        }
      },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        center: ["50%", "50%"],
            selectedMode: "single",
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
       emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
        },
       label: {
          show: true,
          position: 'outside',
          fontSize: 15,
          color: '#000000',
          formatter: (a) => {
            let percentFlag = a.data.percentFlag;
            let value = a.value;
            return `${a.name}`;
          }
        
        },
      }
    ]
  };

/*
 * Pie Interior
 */


export default pie;