import React, { useState } from 'react'
import {Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import "./App.css";

import ChargesBy from './ChargesBy';
import Home from './Home';
import Passes from './Passes';
import Charges from './Charges';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <>
      <div class="App">
      <Route exact path="/" component={Home} />
      <NavigationBar />
      <Route exact path="/passes" component={Passes} />
      <Route exact path="/charges" component={Charges} /> 
      </div>
    </>
  )
}

export default App;
