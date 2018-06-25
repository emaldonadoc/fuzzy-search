import fuzzySearch from '../src/fuzzySearch';

const PATH_FILE = './assets/listTmp.txt';

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