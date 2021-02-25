import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainPage from './Containers/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;
