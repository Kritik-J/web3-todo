# Simple Todo App with React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle


# Install dependencies in the truffle directory
$ cd truffle
$ npm install

# Install dependencies in the client directory
$ cd client
$ npm install

```

## Usage

Start the react dev server.

```sh
$ cd client
$ npm start
```

```sh
$ cd truffle
$ truffle compile
$ truffle migrate
```

## Environment Variables

> Note: You will need to create a .env file in the truffle directory of the project. This file will contain your environment variables.

- MNEMONIC
- INFURA_PROJECT_ID

> Note: You will need to create a .env file in the client directory of the project. This file will contain your environment variables.

- REACT_APP_INFURA_PROJECT_ID
