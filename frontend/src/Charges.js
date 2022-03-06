import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ChargesBy from './ChargesBy';

export default function Charges() {
  const [value, setValue] = useState('');
  const handleSelect = (e) => {
    setValue(e);
  }

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  return (
    <>
     <div class="charge-date">
      <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />

      <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
      </div>

    <div class="dropdown">
    <DropdownButton
      title="Επιλέξτε Λειτουργό Διοδίων"
      id="provider-select"
      variant="secondary"
      onSelect = {handleSelect}
        >
          <Dropdown.Item eventKey="aodos">Αττική Οδός</Dropdown.Item>
          <Dropdown.Item eventKey="gefyra">Γέφυρα Ρίου-Αντιρρίου</Dropdown.Item>
          <Dropdown.Item eventKey="egnatia">Εγνατία Οδός</Dropdown.Item>
          <Dropdown.Item eventKey="kentriki_odos">Κεντρική Οδός</Dropdown.Item>
          <Dropdown.Item eventKey="moreas">Μορέας</Dropdown.Item>
          <Dropdown.Item eventKey="nea_odos">Νέα Όδος</Dropdown.Item>
          <Dropdown.Item eventKey="olympia_odos">Ολυμπία Οδός</Dropdown.Item>
      </DropdownButton>
      </div>


    <ChargesBy value = {value} fromDate = {fromDate} toDate = {toDate} />
    </>

  )
}
