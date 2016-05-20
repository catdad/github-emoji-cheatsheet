/* jshint node: true */

var fs = require('fs');
var util = require('util');
var list = require('./list.js');

function tableString(arr, str) {
    str = str || '';
    
    var four = arr.splice(0,4);
    
    while(four.length < 4) {
        four.push('');
    }
    
    var tableFour = four.map(function(item) {
        return item === '' ? item : util.format('%s `%s`', item, item);
    });
    
    str += '| ' + tableFour.join(' | ') + ' |\n';
    
    if (arr.length) {
        return tableString(arr, str);
    } else {
        return str;
    }
}

var markdown = '# GitHub Emoji Cheatsheet\n\n';

markdown += '|     |     |     |     |\n';
markdown += '| --- | --- | --- | --- |\n';

Object.keys(list).forEach(function(key) {
    markdown += '| **' + key + '** | | | |\n';
    markdown += tableString(list[key]);
});

fs.writeFileSync('README.md', markdown);
