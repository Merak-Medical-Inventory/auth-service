module.exports = {
  preset: 'ts-jest',
  roots: [
    "<rootDir>/src"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: 'node',
  collectCoverage : true,
  coverageDirectory : 'coverage',
  testPathIgnorePatterns : [
    "/node_modules/"
  ],
  verbose : true,
  coverageThreshold : {
    global : {
      branches : 100,
      functions : 100,
      lines : 100,
      statements : 100
    }
  },
  moduleNameMapper: {
    "^@entity/(.*)$": "<rootDir>/src/db/entity$1",
    "^@db/(.*)$": "<rootDir>/src/db$1",
  } 
};