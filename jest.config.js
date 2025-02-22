module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/src/test/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/src/test/__mocks__/file-mock.js`,
    '\\.svg$': `<rootDir>/src/test/__mocks__/svg.tsx`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|swiper|ssr-window|dom7)/)`], //added Swiper node molules folder to make it work with jest
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/src/test/loadershim.js`],
  setupFilesAfterEnv: [`<rootDir>/src/test/setupTests.ts`],
  automock: false,
}
