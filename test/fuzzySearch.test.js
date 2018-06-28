import fs from 'fs';
import fuzzySearch from '../src/fuzzySearch';
jest.mock('fs-readfile-promise', () => (path) => {
  return new Promise((resolve, reject) => {
    return resolve('[{"name":"Alberto Vera Padrón"},{"name":"Juan Antonio Perez"},{"name":"Rodolfo Juarez Fernandez"}]')
  });
})

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
  fs.writeFileSync(PATH_FILE,
    JSON.stringify(FILE_DATA_MOCK),
    { encoding: 'utf8', flag: 'w' });
});

afterEach(() => {
  fs.unlink(PATH_FILE, (e) => { });
});

test('Must return parsed obj when call fsPromise', () => {
  fuzzySearch.readFile(PATH_FILE).then((d) => {    
    expect(d).toEqual(FILE_DATA_MOCK);
  });
});

test('Must parse json from command line', () => {
  let jsonParam = '{name:Jhon Snow}'
  let argv = ['node', 'fuzzySearch.js', 'option', jsonParam]
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

test('Must show list', () => {
  fuzzySearch.fileData = FILE_DATA_MOCK;

  const list = fuzzySearch.list();
  expect(list).toEqual(FILE_DATA_MOCK);
});

test('Must add new user in sorted list', () => {
  let newUser = { name: 'Diego Zarate' };
  fuzzySearch.fileData = FILE_DATA_MOCK;
  fuzzySearch.add(PATH_FILE, newUser);

  fs.readFile(PATH_FILE, (e, d) => {
    console.log(d);
    let json = JSON.parse(d);
    let lastUsr = json[1];
    expect(json.length).toEqual(4);
    expect(lastUsr.name).toEqual(newUser.name);
  });
});

test("Should return min Index from array", () => {
  const values = [2, 3, 1, 4, 12];
  const valueLengthMax = 7;
  expect(fuzzySearch.getIndexMin(values, valueLengthMax)).toEqual(2);
});

test("Should return user found", () => {
  fuzzySearch.fileData = FILE_DATA_MOCK;
  expect(fuzzySearch.search(null, { name: 'Alver' }))
    .toEqual([{ name: 'Alberto Vera Padrón' }]);
});

test("Should return empty array when user doesnt found", () => {
  fuzzySearch.fileData = FILE_DATA_MOCK;
  expect(fuzzySearch.search(null, { name: 'Emmanuel' }))
    .toEqual([]);
});

test('Must call function by option', () => {
  let options = ['list', 'add', 'search']
  options.forEach((option) => {
    let argv = ['node', 'fuzzySearch.js', option, '{"name":"Emmanuel"}'];
    fuzzySearch[option] = jest.fn();
    fuzzySearch.readFile = jest.fn();
    fuzzySearch.readFile.mockReturnValue(new Promise((resolve, reject) => {
      resolve(FILE_DATA_MOCK);
    }));

    fuzzySearch.init(argv).then(() => {
      expect(fuzzySearch[option].mock.calls.length).toEqual(1);
      expect(fuzzySearch.readFile.mock.calls.length).toEqual(1);
    });

  });
});
