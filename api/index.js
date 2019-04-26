const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { scalars, typeDefs } = require('./graphql/types')
const { getCost, buyLabel } = require('./shipping/shipping')
const { checkOrder } = require('./purchases/purchases')
// Provide resolver functions for your schema fields
const resolvers = {
  Mutation: {
    confirmPurchase: ({ info, user }) => {
      if(checkOrder(info, user))
        return buyLabel(info.rateId, function(err, transaction) {
          if(err)
              console.log(err)
          else
              console.log(info, transaction, user)
        })
      else
        console.log('error')
    },
  },
  Query: {
    getPrices: ({ from, to, parcel, packages, extras }) => {
      return getCost(from, to, packages.shift(parcel), extras)
    },
  },
  ...scalars
}

const server = new ApolloServer({ 
  typeDefs, resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
  formatResponse: response => {
    console.log(response);
    return response;
  },
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(`🚀 Server ready`)
)
