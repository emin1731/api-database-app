import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap'
import Header from './components/Header';
import CharacterPage from './routes/characterPage';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './routes/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/characters/",
        element: <CharacterPage/>,
      },
      {
        path: "/characters/:id",
        element: <CharacterPage/>,
      },
    ]
  },
  
]);


function App() {
  

  return (

        <RouterProvider router={router}/>


  );
}

export default App;
