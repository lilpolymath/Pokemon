import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';

import Pokemon from './src/components/Pokemon';
import getRandomInt from './src/helpers/getRandomInt';

const client = new ApolloClient({
  uri: 'http://93da8631.ngrok.io', //replace this with your internal ipaddress.
});

export const AppContext = React.createContext({data: {pokemon: null}});

export class App extends Component {
  state = {
    query: null,
  };

  componentDidMount() {
    this.getNewPokemon();
  }

  getNewPokemon = () => {
    let query = this.getQuery();
    this.setState({
      query,
    });
  };

  getQuery = () => {
    const randomID = getRandomInt(1, 600);
    return `
      query GetPokemonByName {
        pokemon(id: ${randomID}) {
          id,
          name,
          desc,
          pic,
          types {
            id,
            name
          }
        }
      }
    `;
  };

  render() {
    const {query} = this.state;
    if (!query) {
      return <Text>Nothing dey state</Text>;
    }
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            ${query}
          `}>
          {({loading, error, data}) => {
            if (loading || error) {
              return <ActivityIndicator size="large" color="#0000ff" />;
            }
            return (
              <AppContext.Provider
                value={{...data.pokemon, onPress: this.getNewPokemon}}>
                <Pokemon />
              </AppContext.Provider>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
