# graphql-prefab-server

A fully functional, configurable GraphQL server in one line. `graphql-prefab-server` starts up a graphql server, provides graphiql, and a very basic `/health` endpoint.

## Installation

```
yarn add graphql-prefab-server
```

## Usage

```
import start from 'graphql-prefab-server'

start()
```

## Configuration
`graphql-prefab-server` can be configured conveniently through environment variables. The following variables are available:

* `PREFAB_GQL_PORT` - port of the graphql server. Default: `4000`
* `PREFAB_GQL_ENDPOINT` - endpoint for graphql. Default: `/`
* `PREFAB_SCHEMA_PATH` - location of the schema's query file. Default: `./types/Query.graphql`
* `PREFAB_RESOLVERS_PATH` - location of the directory containing all the resolvers. Default: `./resolvers`
