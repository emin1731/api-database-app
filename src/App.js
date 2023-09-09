import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap'
import Header from './components/Header';
import CharacterPage from './routes/characterPage';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './routes/Root';
import LocationPage from './routes/locationPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/character/",
        element: <CharacterPage/>,
      },
      {
        path: "/character/:id",
        element: <CharacterPage/>,
      },
      {
        path: "/location",
        element: <LocationPage/>,
      },
      {
        path: "/location/:id",
        element: <LocationPage/>,
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
