# graphql-json-resolvers
Configure resolvers through JSON configuration rather than code

### Usage
```javascript
import { compile } from 'graphql-json-resolvers';
import { addResolveFunctionsToSchema } from 'graphql-tools';

...

addResolveFunctionsToSchema(schema, compile('./resolvers'));
```

### Test Compilation
```
$ yarn build && RESOLVERS_DIR=./examples node ./dist/index.js
```
