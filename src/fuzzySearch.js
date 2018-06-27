import fs from 'fs';
import _ from 'lodash';
import fsPromise from 'fs-readfile-promise';

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

  init(argvs) {
    const option = argvs[2];
    this.readFile(this.pathFile).then((d) => {
      this.fileData = d;
      const value = this.parseCommandLine(argvs)
      const result = this[option](this.pathFile, value);
      console.log(result);
    });
  }

};