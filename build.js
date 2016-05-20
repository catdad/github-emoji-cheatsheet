/* jshint node: true */

var fs = require('fs');
var util = require('util');
var list = require('./list.js');
var emojione = require('./emojione.js');
var outname = 'README.md';

//list = {
//    emojione: emojione
//};
//outname = 'EMOJIONE.md';

var tableCols = 3;

function makeRow(arr) {
    while (arr.length < tableCols) {
        arr.push('');
    }
    
    return '| ' + arr.join(' | ') + ' |\n';
}

function tableString(arr, str) {
    str = str || '';
    
    var columns = arr.splice(0, tableCols);
    
    var tableColumns = columns.map(function(item) {
        return util.format('%s `%s`', item, item);
    });
    
    str += makeRow(tableColumns);
    
    if (arr.length) {
        return tableString(arr, str);
    } else {
        return str;
    }
}

function makeHeader() {
    var headers = [];
    
    while (headers.length < tableCols) {
        headers.push('---');
    }
    
    return makeRow([]) + makeRow(headers);
}

var markdown = fs.readFileSync('HEADER.md');
markdown += makeHeader();

Object.keys(list).forEach(function(key) {
    var arr = ['**' + key + '**'];
    markdown += makeRow(arr);
    markdown += tableString(list[key]);
});

fs.writeFileSync(outname, markdown);
