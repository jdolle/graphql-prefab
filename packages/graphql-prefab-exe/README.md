# graphql-prefab-exe

### Docker Example

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
