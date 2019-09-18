import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

const ListItem = styled.div`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  /* Float four columns side by side */
  .column {
    float: left;
    width: 100%;
    padding: 10px 10px;
  }

  /* Remove extra left and right margins, due to padding in columns */
  .row {
    margin: 0 -5px;
  }

  /* Clear floats after the columns */
  .row:after {
    content: '';
    display: table;
    clear: both;
  }

  /* Style the counter cards */
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
    padding: 16px;
    background-color: #f1f1f1;
    min-height: 80px;
    border-radius: 15px;
    display: flex;
    .first {
      width: 80%;
    }
    .second {
      width: 10%;
    }
    .third {
      width: 10%;
    }

    p {
      margin: auto;
      padding: 10px;
      display: inline-block;
    }
  }
  .card:hover {
    box-shadow: 1px 8px 20px grey;
    -webkit-transition: box-shadow 0.1s ease-in;
  }

  /* Responsive columns - one column layout (vertical) on small screens */
  @media screen and (max-width: 600px) {
    .column {
      width: 100%;
      display: block;
      margin-bottom: 20px;
    }
  }
`;

class Suppliers extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <ListItem className="row">
          {products && (
            <>
              {products.map(item => (
                <div key={item.id}>
                  <Link href={{ pathname: 'item', query: { id: item.id } }}>
                    <div className="column">
                      <div className="card">
                        <div className="first">
                          <p>{item.name}</p>
                        </div>
                        <div className="second">
                          <p>{item.supplier.name}</p>
                        </div>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </ListItem>
      </div>
    );
  }
}

export default Suppliers;
