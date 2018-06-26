#!/usr/bin/env node

var fuzzySearch = require("./fuzzySearch");


console.log('hello there', process.argv);
console.log(fuzzySearch.parseCommandLine(process.argv));
