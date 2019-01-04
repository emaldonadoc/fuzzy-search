#!/usr/bin/env node
var fuzzySearch = require("./fuzzySearch").default;
fuzzySearch.init(process.argv).then(console.log);
