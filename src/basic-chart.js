export class BasicChart {
    constructor(data) {
        let d3 = require('d3');
        this.data = data;
        this.svg = d3.select('#chart').append('svg');
        this.margin = {
            left: 50,
            top: 30,
            right: 30,
            bottom: 30
        };
        this.svg.attr('width', window.innerWidth);
        this.svg.attr('height', window.innerHeight);
        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight - this.margin.top - this.margin.bottom;
        this.chart = this.svg.append('g')
                         .attr('width', this.width)
                         .attr('height', this.height)
                         .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }
}