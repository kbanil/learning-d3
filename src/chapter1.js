import {BasicBarChart} from './basic-bar-chart';

let data = require('./data/chapter1.json');

let totalNumbers = [].map.call(
    [].filter.call(data, obj => obj.population.length), obj => {
    return {
        name: obj.name,
        population: Number(obj.population[0].value)
    };
});
let myChart = new BasicBarChart(totalNumbers);
require('./index.css');