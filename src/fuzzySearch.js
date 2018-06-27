import fs from 'fs';
import _ from 'lodash';
import fsPromise from 'fs-readfile-promise';
import hammingDistance from './hammingDistance';

export default {

  pathFile: '../assets/fuzzy-search.txt',

  fileData: [],

  parseCommandLine(mapArguments) {
    let json = {};
    let i = 3;
    const length = mapArguments.length;
    for (i; i < length; i++) {
      let keyValue = mapArguments[i]
        .replace('{', '')
        .replace('}', '')
        .split(':');
      json[keyValue[0]] = keyValue[1];
    }
    return json;
  },

  readFile(pathFile) {
    return fsPromise(pathFile).then((d) => {
      return JSON.parse(d)
    });
  },

  add(pathFile, newUser) {
    this.fileData.push(newUser);
    this.fileData = _.sortBy(this.fileData, ['name']);
    fs.writeFileSync(pathFile,
      JSON.stringify(this.fileData),
      { encoding: 'utf8', flag: 'w' });
    return 'Usuario agregado';
  },

  list() {
    return _.sortBy(this.fileData, ['name']);
  },

  getIndexMin(distances, valueLength) {
    let minIndex = -1;
    let min = valueLength;
    distances.forEach((d, i) => {
      if (d < min) {
        min = d;
        minIndex = i;
      }
    });
    return minIndex;
  },

  search(_, userToSearch) {
    let distances = [];
    this.fileData.forEach((user) => {
      distances.push(hammingDistance(userToSearch.name, user.name));
    });
    const index = this.getIndexMin(distances, userToSearch.name.length);
    return index > -1 ? [this.fileData[index]] : [];
  },

  init(argvs) {
    this.readFile(this.pathFile).then((d) => {
      this.fileData = d;
      const option = argvs[2];
      const value = this.parseCommandLine(argvs)
      const result = this[option](this.pathFile, value);
      console.log(result);
    });
  }

};