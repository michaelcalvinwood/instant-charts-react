import global from "./global";

const bar = {
    Default: {
        desktop: {
            info: {
                minHeight: 450
            },
            title: {
            text: 'Hello',
            subtext: 'My Friend',
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
                bottom: 60,
                height: 380
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
            tooltip: {
                trigger: "item",
                formatter: "<div style='text-align:center'>{b}<br>{a}<br>{c}</div>",
                backgroundColor: "rgba(0, 0, 0, .8)",
                textStyle: {
                    color: 'white'
                }
                },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
                }
            ]
        }
    }
}

export default bar;