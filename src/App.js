import React from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Drop from "./Drop";
import TaskManager from "./TaskManager";



function App() {
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<TaskManager />} />
          <Route path="/drop" element={<Drop/>} />
        </Routes>
    
      </BrowserRouter>
      
     
    </div>
  );
}

export default App;
