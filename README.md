# graphql-prefab

[![CircleCI](https://circleci.com/gh/jdolle/graphql-prefab.svg?style=svg)](https://circleci.com/gh/jdolle/graphql-prefab) [![Test Coverage](https://api.codeclimate.com/v1/badges/da06c7682572accb0831/test_coverage)](https://codeclimate.com/github/jdolle/graphql-prefab/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/da06c7682572accb0831/maintainability)](https://codeclimate.com/github/jdolle/graphql-prefab/maintainability) [![Greenkeeper badge](https://badges.greenkeeper.io/jdolle/graphql-prefab.svg)](https://greenkeeper.io/)

See individual [packages](https://github.com/jdolle/graphql-prefab/tree/master/packages) for more details.
- [graphql-prefab-exe](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-exe) - a bundled, standalone language-agnostic GraphQL application
- [graphql-prefab-server](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-server) - a standalone, language-agnostic GraphQL Node server
- [graphql-prefab-resolvers](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-resolvers) - a flexible, language agnostic way to reduce resolver boilerplate

## Configuring Resolvers

Resolver `options` are written in [Velocity](http://velocity.apache.org/engine/1.7/vtl-reference.html) (via the [velocityjs](https://github.com/shepherdwind/velocity.js) package). Resolver arguments and the `process.env` object are available as variables in the `options`.
```
$obj
$args
$ctx
$info
$env = process.env
```

See [examples](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-resolvers/examples) for usage examples.


## Standard resolvers

Out of the box, `graphql-prefab` includes several useful resolvers.

### camelizeKeys

> Convert the previously returned object to camelcase keys using the [`humps`](https://github.com/domchristie/humps) package.

##### Usage

```json
{ "use": "camelizeKeys" }
```


### http

> Perform an http request using the [`axios`](https://github.com/axios/axios) package.

##### Options

- url - *required*
- method
- responseType
- url
- headers
- data
- params
- timeout
- baseURL
- withCredentials
- proxy
- maxRedirects
- maxContentLength
- xsrfCookieName
- xsrfHeaderName

##### Usage

```json
{
  "use": "http",
  "options": {
    "url": "$env.BACKEND_URL/v1/acceptance_documents/$args.type",
    "timeout": 5000
  }
}
```


### ramda

> Perform one of the functions in the  [`ramda`](https://github.com/ramda/ramda) library.

##### Options

- fn - *required*
- args

##### Usage

```json
{
  "use": "ramda",
  "options": {
    "fn": "path",
    "args": [
      ["acceptance_document"]
    ]
  }
}
```


### postgres

> Query postgres using the [`node-postgres`](https://github.com/brianc/node-postgres) package.

##### Options

- [query](https://node-postgres.com/features/queries#query-config-object)

##### Usage

```json
{
  "use": "postgres",
  "options": {
    "query": {
      "text": "SELECT * FROM features"
    }
  }
}
```
