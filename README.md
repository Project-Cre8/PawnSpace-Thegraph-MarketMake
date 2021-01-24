[The Graph document](https://thegraph.com/docs/introduction)

# In The Graph Website

## Create Subgraph

Sign in with your personal GitHub account.

https://thegraph.com/

Go to dashboard

https://thegraph.com/explorer/dashboard

If you're admin of an organization, you can create a new subgraph as the organization. The subgraph name will be used afterward.

# Local Environment

## Clone this repo

```
$ git clone git@github.com:Project-Cre8/PawnSpace-Thegraph-MarketMake.git
$ cd PawnSpace-Thegraph-MarketMake
```

## Install Graph CLI globally

```
# NPM
$ npm install -g @graphprotocol/graph-cli

# Yarn
$ yarn global add @graphprotocol/graph-cli
```

## Modify subgraph

- Entity

`/schema.graphql`

- Mapping (data <=> entity)

`/src/*`

- Target Contract

  - Name, Address, ABI file name, Network

  `/subgraph.yaml`

  - ABI

  `/abis/xxxx.json`

## Generate graph code

```
$ yarn codegen
```

## Deploy the subgraph

Copy the access token displayed on the dashboard and run the following command. This will store the access token on your computer. You only need to do this once, or if you ever regenerate the access token.

```
$ graph auth https://api.thegraph.com/deploy/ <ACCESS_TOKEN>
```

You can deploy

```
$ yarn deploy
```

※ There is the setting in `/package.json`.

It's set as `<GitHub account name>=project-cre8` and `<Subgraph name>=pawnspace-subgraph`

or you can call directly

```
$ graph deploy --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ <GitHub account name>/<Subgraph name>
```

You can deploy multiple times. It overrides the previous one.
