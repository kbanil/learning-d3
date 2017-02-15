import {TableBuilder} from './table-builder';
import {BasicChart} from './basic-chart';

let d3 = require('d3');

export default function() {
    let chart = new BasicChart();
    let svg = chart.chart;
    let x = d3.scale.linear()
                .domain([0,100])
                .range([chart.margin.left, chart.width - chart.margin.right]);
    let axis = d3.svg.axis()
                .scale(x);
    
    let a = svg.append('g')
                .attr('transform', 'translate(0,30)')
                .data(d3.range(0,100))
                .call(axis);
    a.selectAll('path')
        .attr({
            fill: 'none',
            stroke: 'black',
            'stroke-width': 0.3
        });
    a.selectAll('line')
        .attr({
            fill: 'none',
            stroke: 'black',
            'stroke-width': 0.3
        });
}

export function funkyD3PathRenders() {
    let chart = new BasicChart();
    let svg = chart.svg;
    let sine = d3.range(0,10).map(
        k => {
            console.log(`${k}: ${[0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)]}`)
            return [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)];
        }
    );
    let x = d3.scale.linear()
                .range([0, chart.width/2 - (chart.margin.left + chart.margin.right)])
                .domain(d3.extent(sine, d => d[0]));
                //.domain(sine.map(d => d[0]));
    
    let y = d3.scale.linear()
                .range([chart.height/2 - (chart.margin.top + chart.margin.bottom),0])
                .domain([-1,1]);
    
    let line = d3.svg.line()
                .x(d => x(d[0]))
                .y(d => y(d[1]));
    
    let g = svg.append('g');
    g.append('path')
        .datum(sine)
        .attr({
            d: line,
            stroke: 'steelblue',
            'stroke-width': 2,
            fill: 'none'
        });
    g.append('path')
        .datum(sine)
        .attr({
            d: line.interpolate('step-after'),
            stroke: 'black',
            'stroke-width': 1,
            fill: 'none'
        });
    let g2 = svg.append('g')
                .attr('transform',`translate(${chart.width/2 + chart.margin.left + chart.margin.right}, 
                ${chart.margin.top})`);
    
    let area = d3.svg.area()
                .x(d => x(d[0]))
                .y0(chart.height/2)
                .y1(d => y(d[1]))
                .interpolate('basis');
    
    g2.append('path')
        .datum(sine)
        .attr({
            d: area,
            fill: 'steelblue',
            'fill-opacity': 0.4
        });
    g2.append('path')
        .datum(sine)
        .attr({
            d: line.interpolate('basis'),
            fill: 'none',
            stroke: 'steelblue',
            'stroke-width': 2
        });

    let g3 = svg.append('g')
                .attr('transform', `translate(${chart.margin.left + chart.margin.right}, 
                ${chart.height/2 + chart.margin.top + chart.margin.bottom})`)
    
    let arc = d3.svg.arc();
    g3.append('path')
        .attr({
            d: arc({
                outerRadius: 100,
                innerRadius: 50,
                startAngle: -Math.PI * 0.25,
                endAngle: Math.PI * 0.25
            }),
            fill: 'lightslategrey',
            transform: 'translate(150,150)'
        });
    
    let symbols = d3.svg.symbol()
                    .type(d => d[1] > 0 ? 'triangle-down': 'triangle-up')
                    .size((d,i) => i%2 ? 20 : 64);
    g2.selectAll('path')
        .data(sine)
        .enter()
        .append('path')
        .attr({
            d: symbols,
            stroke: 'steelblue',
            'stroke-width': 2,
            fill: 'white'
        })
        .attr('transform', d => {
            console.log(`${d}: translate(${x(d[0])},${y(d[1])})`);
            return `translate(${x(d[0])},${y(d[1])})`;
        });
    g3.append('g')
    .selectAll('path')
    .data([{
        source: {
            radius: 50,
            startAngle: -Math.PI*0.30,
            endAngle: -Math.PI * 0.20
        },
        target: {
            radius: 50,
            startAngle: Math.PI * 0.30,
            endAngle: Math.PI * 0.30
        }
    }])
    .enter()
    .append('path')
    .attr('d', d3.svg.chord());
    
    let data = d3.zip(d3.range(0,12), d3.shuffle(d3.range(0,12)));
    let colors = ['linen', 'lightsteelblue', 'lightcyan', 'lavender', 'honeydew','gainsboro'];

    let chord = d3.svg.chord()
                    .source(d => d[0])
                    .target(d => d[1])
                    .radius(150)
                    .startAngle(d => -2*Math.PI*(1/data.length)*d)
                    .endAngle(d => -2*Math.PI*(1/data.length)*((d-1)%data.length));
    g3.append('g')
        .attr('transform', 'translate(300,200)')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', chord)
        .attr('fill', (d,i) => colors[i%colors.length])
        .attr('stroke', (d,i) => colors[(i+1)%colors.length]);
}

export function myWeirdSVGDrawing() {
    let svg = new BasicChart().chart;
    svg.append('text')
        .text('A picture')
        .attr({
            x:10,
            y:150,
            'text-anchor': 'start',
            dx: 150,
            dy: 0
        });
    svg.append('line')
        .attr({
            x1: 10,
            y1: 10,
            x2:100,
            y2:100,
            stroke: 'blue',
            'stroke-width': 3,
            fill: 'black'
        });
    svg.append('rect')
        .attr({
            x: 200,
            y:50,
            width: 300,
            height:400
        });
    svg.select('rect')
        .attr({
            stroke: 'green',
            'stroke-width' : 0.5,
            fill: 'white',
            'rx': 20,
            'ry': 50,
            'fill-opacity': 0.1
        });
    svg.append('circle')
        .attr({
            cx: 350,
            cy:250,
            r:100,
            stroke:'steelblue',
            fill: 'green',
            'stroke-width': 2,
            'fill-opacity': 0.5
        });
    svg.append('ellipse')
    .attr({
        cx: 350,
        cy: 250,
        rx: 150,
        ry: 70,
        fill: 'green',
        stroke: 'steelblue',
        'stroke-width': 0.7,
        'fill-opacity': 0.3
    });

    svg.append('ellipse')
    .attr({
        cx: 350,
        cy:250,
        rx:20,
        ry:70
    });
    svg.selectAll('ellipse, circle')
        .attr({'transform': `translate(150,0) scale(1.2) translate(-70, 0) rotate(-45, ${350/1.2}, ${250/1.2}) skewY(20)`});
        //.attr('transform', `translate(150,0) rotate(-45, 350,250) scale(1.2)`);

    svg.append('path')
        .attr({
            d: 'M 100 100 L 300 100 L 200 300 Z',
            fill: 'red',
            'fill-opacity': 0.7,
            stroke: 'blue',
            'stroke-width': '0.5'
        });
}

export function renderDailyShowGuestTables() {
    let url = 'http://cdn.rawgit.com/fivethirtyeight/data/master/daily-show-guests/daily_show_guests.csv';
    let table = new TableBuilder(url);
}