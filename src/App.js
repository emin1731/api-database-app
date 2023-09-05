import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap'
import Header from './components/Header';
import CharacterPage from './pages/characterPage';

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Please select section</h1>,
  },
  {
    path: "/characters",
    element: <CharacterPage/>,
  },
]);


function App() {
  

  return (

    <Container fluid>
      <Row>
        <Header/>

      </Row>

        <RouterProvider router={router}/>

      {/* <CharacterPage/> */}
    </Container>

  );
}

export default App;
