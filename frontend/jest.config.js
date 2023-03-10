

const modules = ['@react-dnd', 'react-dnd', 'dnd-core', 'react-dnd-html5-backend', 'uuid']

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  collectCoverageFrom: [
    '*/.{ts,tsx}',
    '!*/node_modules/*',
    '!*/productConfigurationTest/*',
    '!*/coverage/*',
    '!**/styles.js',
    '!**/i18n.js',
    '!*/src/mock/*'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/assetsTransformer.js',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 60,
  //     functions: 70,
  //     lines: 70,
  //     statements: 70
  //   }
  // },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/assetsTransformer.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^src(.*)$': '<rootDir>/src$1'
  },
  transformIgnorePatterns: [
    `node_modules/(?!(?:.pnpm/)?(${modules.join('|')}))`
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  roots: ['<rootDir>/src']
}