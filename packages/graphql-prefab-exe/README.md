# graphql-prefab-exe

## Installation

`yarn add graphql-prefab-exe`
or download the latest from [releases](https://github.com/jdolle/graphql-prefab/releases)

## Usage

GraphQL Prefab supplies prebuilt executables for painless cross platform servers. No boilerplate. No code. Just GraphQL.

> See [graphql-prefab-server](https://github.com/jdolle/graphql-prefab/tree/master/packages/graphql-prefab-server#configuration) for additional environment configuration.

### Dockerfile

```
# Set working directory
WORKDIR /path/to/app

# Install curl
RUN apt-get update && apt-get install -y \
curl

# Install gql prefab binary
RUN curl -L https://github.com/jdolle/graphql-prefab/releases/download/v0.2.1/graphql-prefab.linux-x64-9.5.0 > bin/graphql-prefab
RUN chmod +x bin/graphql-prefab

# Expose gql prefab default port
EXPOSE 4000
CMD bin/graphql-prefab
```
