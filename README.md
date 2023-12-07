## Description
Jobs portal API.

Assessment required by Soluciones JM

### Author
Diego Karabin

## Recommended node version
20.10.0

## Installation

```bash
$ npm install
```

## Running the app

```bash
# Use watch mode to test locally, start command is being used to deploy in Cyclic
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Used commands history

```bash
nest new jobs-demo-backend
cd jobs-demo-backend
git config user.name "Diego Karabin"
git config user.email "diegokarabin@gmail.com"
git add .
git commit -m "First commit"
code .
nest g resource jobs
git add .vscode/settings.json
git commit --amend
npm run start:dev
npm run start
npm run start:dev
npm i -s @nestjs/axios
npm run start:dev
npm i -s @nestjs/swagger
npm i -s class-validator class-transformer
npm run test
npm run test:watch
npm run test:e2e:watch
npm run test:watch
npm i -s nestjs-paginate
npm run start:dev
npm uninstall nestjs-paginate
npm run start:dev
npm run test
npm run test:e2e
npm run test:watch
npm run test:e2e

```
The last commits where wrote directly from VS Code, that's why they doesn't appear in the history.

## Live test URL
https://shy-cyan-capybara-cuff.cyclic.app/
