# graphql-prefab-resolvers
> Reduce resolver boilerplate by configuring resolvers through JSON

## Usage
```javascript
import { compile } from 'graphql-prefab-resolvers'
import { addResolveFunctionsToSchema } from 'graphql-tools'

...

const resolversPath = path.resolve(__dirname, './resolvers')
addResolveFunctionsToSchema(schema, compile(resolversPath))
```

## Adding custom resolvers

Basic Example:
```javascript
import { addResolver } from 'graphql-prefab-resolvers'

const fooResolver = (options) => (obj, args, context, info) => 'foo'

addResolver('foo', fooResolver)

```


## Demo
Take a look at the [demo server](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-resolvers/examples/demo-server) to see just how easy setting up GraphQL using `graphql-prefab-resolvers` can be.

```
yarn demo
```
