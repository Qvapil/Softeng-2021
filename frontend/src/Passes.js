import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import PassesAnalysis from './PassesAnalysis';

export default function Passes() {
    var stations = [
        {value: "aodos", label: "Αττική Οδός"},
        {value: "gefyra", label: "Γέφυρα Ρίου-Αντιρρίου"},
        {value: "egnatia", label: "Εγνατία Οδός"},{value: "kentriki_odos", label: "Κεντρική Οδός"},
        {value: "moreas", label: "Μορέας"},
        {value: "nea_odos", label: "Νέα Οδός"},{value: "olympia_odos", label: "Ολυμπία Οδός"},
    ]

        var [value, getValue] = useState(new Array(2).fill(0))

        var handleSelect = (e) =>
        {
            getValue(Array.isArray(e)?e.map(x=>x.value):[]);
        }

        const [fromDate, setFromDate] = useState(new Date());
        const [toDate, setToDate] = useState(new Date());

  
        return (
            <>
            <div class="pass-date">
            <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />

            <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
            </div>
            <div class="select-multi">
                <Select isMulti options={stations} onChange={handleSelect}></Select>
            </div>

            <PassesAnalysis value = {value} fromDate = {fromDate} toDate = {toDate} />
            
            </>  
        )

}
