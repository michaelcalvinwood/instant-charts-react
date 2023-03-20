import global from "./global";

const line = {};
line.Default = {
    desktop: {
        info: {
            minHeight: 450
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: "rgba(0, 0, 0, .6)",
            textStyle: {
              color: 'white'
            },
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
            top: 20,    
        },
        legend: {
            show: true,
            orient: 'horizontal',
            position: 'bottom',
            left: 10,
            bottom: 0,
            textStyle: {
                  fontSize: 15,
                  color: 'black'
            }
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          min: 'dataMin'
        },
        series: [
          
        ]
    }
}

line.Zero = {
    desktop: {
        info: {
            minHeight: 450
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: "rgba(0, 0, 0, .6)",
            textStyle: {
              color: 'white'
            },
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
            top: 20,    
        },
        legend: {
            show: true,
            orient: 'horizontal',
            position: 'bottom',
            left: 10,
            bottom: 0,
            textStyle: {
                  fontSize: 15,
                  color: 'black'
            }
        },
        toolbox: {
            feature: {
            saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          min: 0
        },
        series: [
          
        ]
    }
}
          

export default line;