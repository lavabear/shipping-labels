const { gql } = require('apollo-server-express')
const GraphQLJSON = require('graphql-type-json')
const { GraphQLDate, GraphQLTime, GraphQLDateTime } = require('graphql-iso-date')

module.exports.scalars = {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    JSON: GraphQLJSON,
    Time: GraphQLTime,
}

module.exports.typeDefs = gql`
  scalar JSON
  scalar Date
  scalar DateTime
  scalar Time

  type Mutation {
    confirmPurchase(info: PurchaseInfo!, user: User) : Reciept
  }

  type Query {
    getPrices(from: Address!, to: Address!, parcel: Package!, packages: [Package!]!, extras: Extras): [ShippingCost!]!
  }
  
  input Extras {
    shippingDate: String
    returnAddress: Address
    customs: CustomsDeclaration
    metadata: JSON
  }

  input CustomsDeclaration {
    description: String!
  }

  input User {
    id: Int
  }
  
  type Reciept {
    id: Int
  }

  input PurchaseInfo {
    rateId: String!
  }

  input Address {
    name: String!
    company: String
    street: String!
    line2: String
    line3: String
    city: String!
    state: String!
    country: String!
    postalCode: String!
    phone: String
    email: String
    isResidential: Boolean
    validate: Boolean
    metadata: String
  }

  input Package {
    weight: String!
    height: String!
    length: String!
    width: String!
  }

  type ShippingCost {
    id: Int
  }
`