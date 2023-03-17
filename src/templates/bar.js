import global from "./global";

const bar = {
    Default: {
        option: {
            title: {
            text: 'Hello',
            subtext: 'My Friend',
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
            top: 90,
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}<br>{c}",
                backgroundColor: "rgba(0, 0, 0, .6)",
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