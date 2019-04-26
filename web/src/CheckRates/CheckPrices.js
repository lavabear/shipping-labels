import React from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Dimmer, Loader, Button } from 'semantic-ui-react'

const CheckPricesQuery = gql`
  query GetPrices($from:Address!, $to:Address!, $parcel:Package!, $packages:[Package!]!, $extras:Extras) {
    getPrices(from:$from, to:$to, parcel: $parcel, packages:$packages, extras: $extras) {
      id
    }
  }
`

const CheckPricesError = ({back, error}) => {
  let missingFields = []
  let otherErrors = []

  error.networkError.result.errors.map(({ message }, i) => {
    let match = message.match(/Variable "\$(\w+)" got invalid value .+;.+ value\.(\w+) .+ was not provided\./)
    if(match) {
      let property = match[1][0].toUpperCase() + match[1].replace("parcel", "package").substring(1)
      let field = match[2][0].toUpperCase() + match[2].replace("ostalCode", "ostal Code").substring(1)
      missingFields.push([property,field])
    } else {
      otherErrors.push(message)
    }
  })
  
  return <>
    <Button onClick={back}>Back</Button>
    {
      missingFields.length > 0 && (
        <>
          <h1>Missing Fields:</h1>
          { missingFields.map((message, i, messages) => {
            if(i === 0 || messages[Math.max(0, i - 1)][0] != message[0])
              return <div key={"mf-"+i}>
                <h2 key={i+"-key"}>{message[0]}</h2>
                <span key={i+"message"}>{message[1]}, </span>
              </div>
            return <span key={i+"-message"}>{message[1]}, </span>
          })
          }
        </>
      )
    }
    {
      otherErrors.length > 0 && (
        <>
          <h1>Other Errors:</h1>
          { otherErrors.map((message, i) => <h3 key={i+"-other"}>{message}</h3>) }
        </>
      )
    }
  </>
}

const CheckPrices = ({addressInfo, parcel, back}) => {
  let {from, to, packages, extras} = addressInfo

  let variables = packages.length === 1 && parcel === {} 
                ? { from, to, packages: [], parcel: packages[0], extras } 
                : { from, to, packages, parcel, extras }

  return (
    <Query query={CheckPricesQuery} variables={variables} >
      {({ loading, error, data }) => {
        if (loading) return <Dimmer active><Loader /></Dimmer>
    
        if (error) {
          let errorProps = { error, back }
          return <CheckPricesError {...errorProps}/>
        }

        return data.getPrices.map(({ id }, index) => (
          <div key={index}>
            <p>#{index + 1}: {id}</p>
          </div>
        ));
      }}
    </Query>
  )
}

export default CheckPrices