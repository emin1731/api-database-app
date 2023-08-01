// import logo from './logo.svg';
import './App.css';
import React from 'react';

import Header from './components/Header';
// import RandomCards from './components/RandomCards';
import ItemTable from './components/ItemTable';
// import { Container } from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap'
import SelectedItem from './components/SelectedItem';

import CharacterPage from './pages/characterPage';
import NarutoDB from './service/NarutoDB';

function App() {
  

  return (

    <Container fluid>
      <Row>
        <Header/>

      </Row>
      <CharacterPage/>
    </Container>

  );
}

export default App;
