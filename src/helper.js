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

export const color = d3.scale.ordinal().range(['#EF3B39', '#FFCD05', '#69C9CA', '#666699', '#CC3366',
  '#0099CC', '#999999', '#FBF5A2', '#6FE4D0', '#CCCB31', '#009966', '#C1272D', '#F79420', '#445CA9',
  '#402312', '#272361', '#A67C52', '#016735', '#F1AAAF','#A0E6DA', '#C9A8E2', '#F190AC', '#7BD2EA',
  '#DBD6B6']);

export function makeTree(data, filterByDonor, name1, name2) {
    let tree = { name: "Donations", children: []};
    let uniqueNames = uniques(data, d => d.DonorName);

    tree.children = uniqueNames.map(name => {
        let donatedTo = data.filter(d => filterByDonor(d,name));
        let donationsValue = donatedTo.reduce((last,curr) => {
            let value = Number(curr.Value.replace(/[^\d\.]*/g, ''));
            return value ? last + value: last;
        },0)
        return {
            name: name,
            donated: donationsValue,
            children: donatedTo.map(d => {
                return {
                    name: name2(d),
                    count: 0,
                    children: []
                };
            })
        };
    });
}

export function fixateColors(data) {
        color.domain(uniques(data, d=> d.DonorName));
    }