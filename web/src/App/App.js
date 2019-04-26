import React from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Container, Header, Button } from 'semantic-ui-react'
import AddressForm from '../CheckRates/AddressForm'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'
import Auth from '../Auth/Auth.js';

const auth = new Auth();
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql"
});

let NotFound = () => (
  <div>
    <h1>Sorry this isn't what you're looking for.</h1>
    <Button as={Link} to="/">Back</Button>
  </div>
)

let Account = () => (
  <>
    <h1>Account</h1>
  </>
)

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Container className="App">
            <Header className="main-header">Shipping in a Pinch</Header>

            <Switch>
                <Route exact path="/" component={AddressForm}/>
                <Route exact path="/account" component={Account}/>
                <Route path="/" component={NotFound}/>
            </Switch>
        </Container>
      </ApolloProvider>
    </Router>
  );
}

export default App;
