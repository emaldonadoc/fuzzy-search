import fsPromise from 'fs-readfile-promise';

export default {

  parseCommandLine(mapArguments) {
    let json = {};
    let i = 3;
    const length = mapArguments.length;
    for (i; i < length; i++) {
      let keyValue = mapArguments[i].replace('{', '').replace('}', '').split(':');
      json[keyValue[0]] = keyValue[1];
    }
    return json;
  },

  readFile(pathFile) {
    return fsPromise(pathFile).then((d) => {
      return JSON.parse(d)
    });
  },

};