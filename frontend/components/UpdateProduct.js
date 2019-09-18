import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { SINGLE_ITEM_QUERY } from './SingleItem';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $name: String
    $supplier: ID
    $price: Float
    $id: ID!
  ) {
    updateProduct(id: $id, name: $name, supplier: $supplier, price: $price) {
      id
    }
  }
`;

const ALL_SUPPLIERS_QUERY = gql`
  query ALL_SUPPLIERS_QUERY {
    suppliers {
      id
      name
    }
  }
`;

const Container = styled.div`
  padding: 0 2rem 2rem 2rem;
  max-width: 1000px;
  margin: 100px auto 0;
  @media (max-width: 1300px) {
    margin-right: 20px !important;
    margin: 100px auto 0;
    min-height: calc(100vh - 260px);
  }
  &::after {
    content: '';
  }
`;

const SelectBox = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
  p {
    color: #303030;
    font-size: 15px;
    font-weight: 100 !important;
    word-spacing: 2px;
  }
  select {
    font-size: 2.2rem;
    color: #212121;
    font-weight: 300;
    border-radius: 1.5;
    background: #c6b5b4;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`;
class UpdateProduct extends Component {
  handleSupplier = e => {
    this.setState({ supplier: e.target.value });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async (e, mutation) => {
    const { id } = this.props;
    e.preventDefault();
    const res = await mutation({
      variables: {
        id,
        ...this.state,
      },
    });
    if (res) {
      Router.push({
        pathname: '/item',
        query: { id: res.data.updateProduct.id },
      });
    }
  };

  render() {
    const { id } = this.props;
    return (
      <Container>
        <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
          {({ data: item, loading, error }) => {
            if (loading) return <p>Loading</p>;
            if (!item.product) return <p>Nenhum item encontrado</p>;
            return (
              <Query query={ALL_SUPPLIERS_QUERY}>
                {({ loading: newLoading, data }) => (
                  <Mutation
                    mutation={UPDATE_PRODUCT_MUTATION}
                    variables={this.state}
                    refetchQueries={[
                      {
                        query: SINGLE_ITEM_QUERY,
                        variables: { id },
                      },
                    ]}
                  >
                    {(updateItem, { loading, error }) => (
                      <Form onSubmit={e => this.updateItem(e, updateItem)}>
                        <Error error={error} />
                        <fieldset disabled={loading} aria-busy={loading}>
                          <label htmlFor="name">
                            Nome
                            <input
                              type="text"
                              id="name"
                              name="name"
                              placeholder="Nome"
                              required
                              defaultValue={item.product.name}
                              onChange={this.handleChange}
                            />
                          </label>

                          <label htmlFor="price">
                            Preço
                            <input
                              type="number"
                              id="price"
                              name="price"
                              placeholder="Preço"
                              required
                              defaultValue={item.product.price}
                              onChange={this.handleChange}
                            />
                          </label>

                          <SelectBox>
                            <select
                              id="author"
                              defaultValue={item.product.supplier.id}
                              onChange={this.handleSupplier}
                            >
                              {data &&
                                data.suppliers.map(item => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </SelectBox>
                          <br />
                          <br />
                          <button type="submit">
                            Grava{loading ? 'ndo' : 'r'}
                          </button>
                        </fieldset>
                      </Form>
                    )}
                  </Mutation>
                )}
              </Query>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default UpdateProduct;
