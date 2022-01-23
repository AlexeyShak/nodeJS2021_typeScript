# RS School TypeScript

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)
- Docker HUB - [Create Docker Hub account](https://hub.docker.com/)

## Downloading

```
git clone https://github.com/AlexeyShak/nodeJS2021_typeScript.git
```

## Checkout to task7-docker-basics branch

```
git checkout task9-authentication&JWT
```
## Installing NPM modules

```
npm install
```

##  Build docker images of an app & database


```
docker-compose up --build
```
!!! After starting an app and postgres in docker containers please create database. Database name should match with PG_DATABASE that you may specify in .env file(default name: posgres).



## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```
## Logging and Error handlig

By default all logs are written to files logs.txt & errorLogs.txt. If you dont want to write logs into file please change in .env LOG_IN_FilE value to false:

```
LOG_IN_FILE=false
```
to chose logging level in .env file change value of LOG_LEVEL to one of following parametors:  

0: all  
1: info  
2: warn  
3: debug  
4: error 
```
LOG_LEVEL=0 \\ to display all logs
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
