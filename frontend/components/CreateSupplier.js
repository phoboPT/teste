import React, { Component } from 'react';
import styled from 'styled-components';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_SUPPLIER_MUTATION = gql`
  mutation CREATE_SUPPLIER_MUTATION($name: String!) {
    createSupplier(name: $name) {
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

class CreateSupplier extends Component {
  state = {
    name: '',
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { name } = this.state;
    return (
      <Container>
        <Mutation mutation={CREATE_SUPPLIER_MUTATION} variables={this.state}>
          {(createSupplier, { loading, error }) => (
            <Form
              data-test="form"
              onSubmit={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await createSupplier();
                console.log(res.data);
                // change them to the single item page
                Router.push({
                  pathname: '/supplier',
                  query: { id: res.data.createSupplier.id },
                });
              }}
            >
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
                    value={name}
                    onChange={this.handleChange}
                  />
                </label>

                <button type="submit">Gravar</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </Container>
    );
  }
}

export default CreateSupplier;
