import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BackgroundImageComponent from './components/miniComp/BackgroundImage';
import Login_Register from './components/LoginRegister'; // Uncomment if needed
import GameService from './components/GameService';
import { fetchEntities } from "./_api/game.service";

import Unit from "./components/miniComp/Unit.js";




function App() {


  return (
    <div>
      <BackgroundImageComponent />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login_Register />} />
          <Route path="/game" element={<GameService />} />
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
