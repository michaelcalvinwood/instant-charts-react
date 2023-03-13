
export const pieTemplate = {};

/*
 * Light Color
 */

pieTemplate.lightColor = {};
pieTemplate.lightColor.colorPalette = ['#87b6ff', '#00d88a', '#fd8f83', '#8c97d7', '#f0d173', '#b0b1b3', '#e89065'];
pieTemplate.lightColor.option = {
    title: {
        text: 'This is the Title',
        subtext: 'This is the sub-title or description',
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
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
        fontSize: 15
        }
    },
    series: [
        {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
                fontSize: 15,
                color: '#000000'
            },
        color: colorPalette,
        data: [
            { value: 200, name: 'Pie 1', },
            { value: 200, name: 'Pie 2' },
            { value: 200, name: 'Pie 3' },
            { value: 200, name: 'Pie 4' },
            { value: 200, name: 'Pie 5' },
            { value: 200, name: 'Pie 6' },
            { value: 200, name: 'Pie 7' }
        ],
        emphasis: {
            itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
        }
    ],
        rich: {
        pietext: {
        fontSize: 15,
        fontFamily: 'Roboto',
        }
    }
    };





