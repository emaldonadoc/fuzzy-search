import fsPromise from 'fs-readfile-promise';
import fs from 'fs';
import fuzzySearch from '../src/fuzzySearch';

const PATH_FILE = './assets/listTmp.txt';
const FILE_DATA_MOCK = [
  {
    "name": "Alberto Vera Padrón"
  },
  {
    "name": "Juan Antonio Perez"
  },
  {
    "name": "Rodolfo Juarez Fernandez"
  }
];

beforeEach(() => {
  fs.writeFileSync(PATH_FILE, '[ ' +
    '{' +
    '"name": "Alberto Vera Padrón"' +
    '},' +
    '{' +
    '"name": "Juan Antonio Perez"' +
    '},' +
    '{' +
    '"name": "Rodolfo Juarez Fernandez"' +
    '}' +
    ']',
    { encoding: 'utf8', flag: 'w' });
});

afterEach(() => {
  fs.unlink(PATH_FILE, (e) => {
  })
});

test('Must parse json from command line', () => {
  let jsonParam = '{name:Jhon Snow}'
  let argv = ['node', 'fuzzySearch.js', 'add', jsonParam]
  let jsonParsed = fuzzySearch.parseCommandLine(argv);
  expect(jsonParsed.name).toEqual('Jhon Snow')
});

test('Must read file', () => {
  let expectedData = [
    "Alberto Vera Padrón",
    "Juan Antonio Perez",
    "Rodolfo Juarez Fernandez"
  ];

  fuzzySearch.readFile(PATH_FILE).then((dataFromFile) => {
    dataFromFile.forEach((data, i) => {
      expect(data.name).toEqual(expectedData[i]);
    });
  });

});

test('Must add new user in sorted list', () => {
  let newUser = { name: 'Diego Zarate' };
  fuzzySearch.fileData = FILE_DATA_MOCK;
  fuzzySearch.add(PATH_FILE, newUser);

  fsPromise(PATH_FILE).then((d) => {
    let json = JSON.parse(d);
    let lastUsr = json[1];
    expect(json.length).toEqual(4);
    expect(lastUsr.name).toEqual(newUser.name);
  });
});