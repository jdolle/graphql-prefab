# graphql-prefab [![Test Coverage](https://api.codeclimate.com/v1/badges/da06c7682572accb0831/test_coverage)](https://codeclimate.com/github/jdolle/graphql-prefab/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/da06c7682572accb0831/maintainability)](https://codeclimate.com/github/jdolle/graphql-prefab/maintainability)

## Configuring Resolvers

Resolver `options` are written in [Velocity](http://velocity.apache.org/engine/1.7/vtl-reference.html) (via the [velocityjs](https://github.com/shepherdwind/velocity.js) package). Resolver arguments and the `process.env` object are available as variables in the `options`.
```
$obj
$args
$ctx
$info
$env = process.env
```

See [examples](https://github.com/jdolle/graphql-prefab/tree/master/examples) for usage examples.


## Usage
```javascript
import { compile } from 'graphql-prefab'
import { addResolveFunctionsToSchema } from 'graphql-tools'

...

addResolveFunctionsToSchema(schema, compile(path.resolve(__dirname, './resolvers')))
```


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
```
url - *required*
method
responseType
url
headers
data
params
timeout
baseURL
withCredentials
proxy
maxRedirects
maxContentLength
xsrfCookieName
xsrfHeaderName
```

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

```
fn - *required*
args
```

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


### Adding custom resolvers

Basic Example:
```javascript
import { addResolver } from 'graphql-prefab'

const fooResolver = (options) => (obj, args, context, info) => 'foo'

addResolver('foo', fooResolver)

```

### Demo

Take a look at the [demo server](https://github.com/jdolle/graphql-prefab/tree/master/examples/demo-server) to see just how easy setting up GraphQL using `graphql-prefab` can be.

```
yarn demo
```

### Docker Usage

GraphQL Prefab supplies prebuilt executables for painless cross platform servers. No boilerplate. No code. Just GraphQL.

```
# Install curl
RUN apt-get update && apt-get install -y \
curl

# Install gql prefab binary
RUN curl -L https://github.com/jdolle/graphql-prefab/releases/download/0.0.2/graphql-prefab.linux-x64-9.5.0 > /graphql-prefab
RUN chmod +x /graphql-prefab

# Expose gql prefab default port
EXPOSE 4000
WORKDIR /path/to/schema
CMD /graphql-prefab
```
