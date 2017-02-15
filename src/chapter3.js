let d3 = require('d3');
import {BasicChart} from './basic-chart';

export class UlamSpiral extends BasicChart {
    constructor(data){
        super(data);
        let dot = d3.svg.symbol().type('circle').size(3),
        center = 400,
        l = 2,
        x = (x, l) => center + l * x,
        y = (y, l) => center + l * y;
    }

    generateSpiral(n) {
        let spiral = [],
        x = 0, y = 0,
        min = [0,0],
        max = [0,0],
        add = [0,0],
        direction = 0,
        directions = {
            up: [0,-1],
            left: [-1,0],
            right: [1,0],
            down: [0,1]
        };

    }
}

export class ScalesDemo extends BasicChart {
    constructor() {
        super();
        //this.ordinal();
        this.quantitative();
    }

    ordinal() {
        let data  = d3.range(30);
        let colors = d3.scale.category10();
        let points = d3.scale.ordinal().domain(data)
                        .rangePoints([0, this.height], 1.0);
        let bands = d3.scale.ordinal().domain(data)
                        .rangeBands([0,this.width], 0.1);
        
        this.chart.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr({
            d: d3.svg.symbol().type('circle').size(10),
            transform: d => `translate(${this.width/2}, ${points(d)})`
        })
        .style('fill', d => colors(d));

        this.chart.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr({
            x: d => bands(d),
            y: this.height/2,
            width:bands.rangeBand(),
            height: 10
        })
        .style('fill', d => colors(d));
    }

    quantitative() {
        let weirstrass = (x) => {
            let a = 0.5;
            let b = (1 + 3 * Math.PI / 2) / a;
            return d3.sum(d3.range(100).map(n => {
                return Math.pow(a, n) * Math.cos(Math.pow(b,n) * Math.PI * x);
            }));
        };

        var data = d3.range(-100,100).map(d => d/200);

        let drawSingle = (line) => {
            return this.svg.append('path')
                    .datum(data)
                    .attr('d', line)
                    .style({fill: 'none',
                'stroke-width': 2});
        };

        
        //console.log(data);
        let extent = d3.extent(data.map(weirstrass));
        //console.log(`extent is: ${extent}`);
        let colors = d3.scale.category10();
        let x = d3.scale.linear()
                .domain(d3.extent(data))
                .range([0,this.width]);

        let linear = d3.scale.linear()
                    .domain(extent)
                    .range([this.height/4, 0]);

        let line1 = d3.svg.line()
                        .x( i => {
                            //console.log(`Inside line generator, x: ${x(i)}`);
                            return x(i);
                        })
                        .y(d => {
                            //console.log(`linear: ${linear(weirstrass(d))}`);
                            return linear(weirstrass(d));
                        });
        
        drawSingle(line1)
            .attr('transform', `translate(0, ${this.height/16})`)
            .style('stroke', colors(0));

        let identity = d3.scale.identity()
                        .domain(extent);
        
        let line2 = line1.y(d => identity(weirstrass(d)));
        drawSingle(line2)
            .attr('transform', `translate(0, ${this.height/12})`)
            .style('stroke',colors(1));

        let power = d3.scale.pow()
                        .exponent(0.2)
                        .domain(extent)
                        .range([this.height/2, 0]);
        let line3 = line1.y(d => power(weirstrass(d)));

        drawSingle(line3)
            .attr('transform', `translate(0, ${this.height/8})`)
            .style('stroke', colors(2));
        
        let log = d3.scale.log()
                    .domain(d3.extent(data.filter(d => d>0 ? d : 0)))
                    .range([0,this.width])
        let line4 = line1.x(d => d>0?log(d):0)
                            .y(d => linear(weirstrass(d)));
        drawSingle(line4)
            .attr('transform', `translate(0, ${this.height/4})`)
            .style('stroke', colors(3));

    }
}