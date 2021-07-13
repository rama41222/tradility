# Currency Conversion API V0.01

This API will return a set of Curriency conversion rates hourly. It helps you to convert between any of the currencies available using the GraphQL API. This api follows a code first approach to graphql.

Given below is a sample GQL

* The fixers query will give you the mamjor currency conversions.

* Trade query returns all the possible currency pairs.

* Convert query will help you to convert between any of the currencies.
  
```query
query  {
  fixers {
    from
    to
    rate
    timestamp
    date
  }
  trade {
    base
    date
    timestamp
    rates
  }
  convert(pairs:[{to:"hb", from:"XAG"},{to:"XCD", from:"XPF"},{to:"USD", from:"SGD"}]){
    from
    to
    rate
    timestamp
    date
  }
}
```

## Prerequisites

1. Running instance of redis
2. NodeJs intalled
3. Yarn

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Documentation

The generated documentation can be seen [here](./documentation/).

Execute the following command to serve the documentatoin at [localhost](http://127.0.0.1:8080)

```bash
yarn run doc
```

## Things left to do

[ ] Containerize the application and run each service using `docker-compose`

[ ] Add more unit tests

## All Commands

```bash

# Remove the build data
yarn prebuild

# Build the project
yarn prebuild

# Format the code
yarn format

# Debugger
yarn start:debug

# Run the linter
yarn lint

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
