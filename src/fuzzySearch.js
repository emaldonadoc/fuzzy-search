import fs from 'fs';
import _ from 'lodash';
import fsPromise from 'fs-readfile-promise';

export default {

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
    console.log('Usuario agregado');
  },

  list() {
    return _.sortBy(this.fileData, ['name']);
  }

};