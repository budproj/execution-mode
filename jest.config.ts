export default {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./lib/jest/setup.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
  },
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: ['@babel/preset-react'],
      },
    },
  },
}
