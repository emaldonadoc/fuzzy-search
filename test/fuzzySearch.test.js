import fuzzySearch from '../src/fuzzySearch';

test('Must parse json from command line', () => {
  let jsonParam = '{name:Jhon Snow}'
  let argv = ['node', 'fuzzySearch.js', 'add', jsonParam]
  let jsonParsed = fuzzySearch.parseCommandLine(argv);
  expect(jsonParsed.name).toEqual('Jhon Snow')
});