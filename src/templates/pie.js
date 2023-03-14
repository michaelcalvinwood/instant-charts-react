
const pie = {};
/*
 * TODO: Scale fontsize down based on media size
 */

pie.default = {};
pie.default.desktop = {
    
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
     tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          backgroundColor: "rgba(0, 0, 0, .6)",
          textStyle: {
            color: 'white'
          }
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
                fontSize: 15,
                color: '#000000'
            },
      }
    ]
  };

export default pie;