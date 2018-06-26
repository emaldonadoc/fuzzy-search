#!/usr/bin/env node

var fuzzySearch = require("./fuzzySearch").default;

console.log(fuzzySearch.parseCommandLine(process.argv));
