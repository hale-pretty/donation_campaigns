/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' if testing browser-based code
  roots: ['<rootDir>/src'], // Adjust to match your source code directory
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '\\.test\\.ts$', // Test files ending with `.test.ts`
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
