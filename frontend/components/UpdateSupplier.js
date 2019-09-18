import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { SINGLE_SUPPLIER_QUERY } from './SingleSupplier';

const UPDATE_SUPPLIER_MUTATION = gql`
  mutation UPDATE_SUPPLIER_MUTATION($name: String, $id: ID!) {
    updateSupplier(id: $id, name: $name) {
      id
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
        pathname: '/supplier',
        query: { id: res.data.updateSupplier.id },
      });
    }
  };

  render() {
    const { id } = this.props;
    return (
      <Container>
        <Query query={SINGLE_SUPPLIER_QUERY} variables={{ id }}>
          {({ data: item, loading, error }) => {
            if (loading) return <p>Loading</p>;
            if (!item.supplier) return <p>Nenhum item encontrado</p>;
            return (
              <Mutation
                mutation={UPDATE_SUPPLIER_MUTATION}
                variables={this.state}
                refetchQueries={[
                  {
                    query: SINGLE_SUPPLIER_QUERY,
                    variables: { id },
                  },
                ]}
              >
                {(updateSupplier, { loading, error }) => (
                  <Form onSubmit={e => this.updateItem(e, updateSupplier)}>
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
                          defaultValue={item.supplier.name}
                          onChange={this.handleChange}
                        />
                      </label>

                      <button type="submit">
                        Grava{loading ? 'ndo' : 'r'}
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default UpdateProduct;
