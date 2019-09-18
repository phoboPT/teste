import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { SearchStyles } from './styles/DropDown';
import Products from './Products';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    products(where: { name_contains: $searchTerm }) {
      id
      name
      price
      supplier {
        id
        name
      }
    }
  }
`;

const IMG = styled.div`
  .img {
    text-align: center;
  }
`;

class AutoComplete extends React.Component {
  state = {
    products: [],
    loading: false,
  };

  onChange = async (e, client) => {
    if (e.key === 'Enter') {
      this.setState({ loading: true });
      const res = await client.query({
        query: SEARCH_ITEMS_QUERY,
        variables: { searchTerm: e.target.value },
      });
      this.setState({
        products: res.data.products,
        loading: false,
      });
    }
  };

  render() {
    resetIdCounter();
    const { products, loading } = this.state;
    return (
      <>
        <SearchStyles>
          <Downshift>
            {({ getInputProps }) => (
              <div>
                <ApolloConsumer>
                  {client => (
                    <input
                      {...getInputProps({
                        type: 'search',
                        placeholder: 'Search',
                        id: 'search',
                        className: loading ? 'loading' : '',
                        onKeyPress: e => {
                          e.persist();
                          this.onChange(e, client);
                        },
                      })}
                    />
                  )}
                </ApolloConsumer>
              </div>
            )}
          </Downshift>
        </SearchStyles>
        <IMG>
          {!loading ? (
            <Products products={products}></Products>
          ) : (
            <div className="img">
              <img src="../static/loading.gif" />
            </div>
          )}
        </IMG>
      </>
    );
  }
}

export default AutoComplete;
