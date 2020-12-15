module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./lib/jest/setup.ts'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      babelConfig: {
        presets: ['@babel/preset-react'],
      },
    },
  },
}
