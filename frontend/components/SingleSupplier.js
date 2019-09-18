import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Link from 'next/link';
import Error from './ErrorMessage';

const SINGLE_SUPPLIER_QUERY = gql`
  query SINGLE_SUPPLIER_QUERY($id: ID!) {
    supplier(where: { id: $id }) {
      id
      name
    }
  }
`;

const SingleItemStyles = styled.div`
  a {
    color: white;
    text-decoration: none;
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin: auto;
    text-align: center;
    font-family: arial;
  }
  h1 {
    padding: 10px 0 0 0;
  }

  .price {
    color: grey;
    font-size: 22px;
  }

  .buttons {
    border: none;
    outline: 0;
    padding: 12px;
    color: white;
    text-align: center;
    font-size: 18px;
    display: flex;
    .first :hover {
      opacity: 0.7;
    }
    .second :hover {
      opacity: 0.7;
    }
    .first {
      cursor: pointer;
      background-color: green;
      width: 50%;
      margin: 0 10px 0 0;
    }
    .second {
      cursor: pointer;
      margin: 0 0 0 10px;
      background-color: red;
      width: 50%;
      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
      }
    }
  }
`;

class SingleSupplier extends Component {
  render() {
    const { id } = this.props;
    console.log(id);
    return (
      <Query query={SINGLE_SUPPLIER_QUERY} variables={{ id }}>
        {({ loading, data: { supplier }, error }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <Error error={error} />;
          if (!supplier) return <p>Nenhum item encontrado</p>;
          return (
            <SingleItemStyles>
              <div className="card">
                <h1>{supplier.name}</h1>

                <div className="buttons">
                  <div className="first">
                    <Link
                      href={{
                        pathname: 'updateSupplier',
                        query: { id: supplier.id },
                      }}
                    >
                      <p>Editar</p>
                    </Link>
                  </div>
                  <div className="second">
                    <button>
                      <p>Remover</p>
                    </button>
                  </div>
                </div>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleSupplier;
export { SINGLE_SUPPLIER_QUERY };
