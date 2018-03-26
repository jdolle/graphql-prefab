# graphql-json-resolvers
Configure resolvers through JSON configuration rather than code

### Configuring Resolvers

Resolver `options` are written in [Velocity](http://velocity.apache.org/engine/1.7/vtl-reference.html) (via the [velocityjs](https://github.com/shepherdwind/velocity.js) package). Resolver arguments and the `process.env` object are available as variables in the `options`.
```
$obj
$args
$context
$info
$env = process.env
```

See [examples](https://github.com/jdolle/graphql-json-resolvers/tree/master/examples) for usage examples.

### Usage
```javascript
import { compile } from 'graphql-json-resolvers'
import { addResolveFunctionsToSchema } from 'graphql-tools'

...

addResolveFunctionsToSchema(schema, compile(path.resolve(__dirname, './resolvers')))
```

### Adding custom resolvers

Basic Example:
```javascript
import { addResolver } from 'graphql-json-resolvers'

const fooResolver = (options) => (obj, args, context, info) => 'foo'

addResolver('foo', fooResolver)

```

### Demo

Take a look at the [demo server](https://github.com/jdolle/graphql-json-resolvers/tree/master/examples/demo-server) to see just how easy setting up GraphQL using `graphql-config-resolvers` can be.

```
yarn demo
```
