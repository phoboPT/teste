import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Home from '../components/Home';

const Inner = styled.div`
  display: flex;
  padding: 0 2rem 2rem 2rem;
  max-width: 1500px;
  margin: 100px auto 0;
  min-height: calc(100vh - 210px);
  @media (max-width: 1300px) {
    margin-right: 20px !important;
    margin: 100px auto 0;
    min-height: calc(100vh - 260px);
  }
  &::after {
    content: '';
  }
  .first {
    width: 95%;
  }
  .second {
    padding: 0 0 0 20px;

    .car_btn {
      width: 55px;
      height: 55px;
      line-height: 50px;
      text-align: left;
      text-indent: 10px;
      font-family: Verdana, Geneva, sans-serif;
      font-size: 16px;
      color: #333;
      background-color: white;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      cursor: pointer;
    }

    .car_btn:hover {
      background-color: #f7f7f7;
    }

    .car_btn img {
      float: left;
    }
  }
  /* Dropdown Button */
  .dropbtn {
    background-color: #4caf50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
  }

  /* The container <div> - needed to position the dropdown content */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* Dropdown Content (Hidden by Default) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {
    background-color: #ddd;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown:hover .dropbtn {
    background-color: #3e8e41;
  }
`;

const index = () => (
  <Inner>
    <div className="first">
      <Home />
    </div>
    <div className="second">
      <Link href="/create">
        <div className="dropdown">
          <img src="../static/dots.png" width="52" alt="" />
          <div className="dropdown-content">
            <Link href="/createProduct">
              <a>Adicionar Produto</a>
            </Link>
            <Link href="/createSupplier">
              <a>Adicionar Fornecedor</a>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  </Inner>
);

export default index;
