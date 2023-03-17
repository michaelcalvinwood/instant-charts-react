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
            type: 'value'
        },
        series: [
            {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
}
          

export default line;