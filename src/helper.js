let d3 = require('d3');

export function uniques(data,name) {
    let uniques = [];
    data.forEach(d => {
        if(uniques.indexOf(name(d)) < 0) {
            uniques.push(name(d));
        }
    });
    return uniques;
}

export function nameId(data,name) {
    let uniqueNames = uniques(data,name);
    return d3.scale.ordinal()
            .domain(uniqueNames)
            .range(d3.range(uniqueNames.length));
}

export function binPerName(data,name) {
    let nameIds = nameId(data,name);
    let histogramLayout = d3.layout.histogram()
                            .bins(nameIds.range())
                            .value(d => nameIds(name(d)));
    return histogramLayout(data);
}