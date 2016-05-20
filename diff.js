/* jshint node: true */

var list = require('./list.js');

var flatList = [];

Object.keys(list).forEach(function(key) {
    flatList = flatList.concat(list[key]);
});

// Note, call the diff file "file.js"
var file = require('./file.js');
var _ = require('lodash');

// In other list but not in mine
console.log(_.difference(file, flatList));

// In my list but not in the other
console.log(_.difference(flatList, file));
