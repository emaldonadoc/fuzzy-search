import hammingDistance from '../src/hammingDistance';

test('Should return distance between 2 strings', () => {
  const stringToCompare = 'Alberto';
  const stringArray = ['Alverto', 'Emmanuel', 'Daniel'];
  const expectedDistance = [1, 7, 7]
  stringArray.forEach((string, i) => {
    expect(hammingDistance(stringToCompare, string)).toEqual(expectedDistance[i]);
  });

})
