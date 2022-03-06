import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { render } from 'react-dom';

export default function ChargesBy({value, fromDate, toDate}) {

    const [charges, setCharges] = useState([])
    const station = value;
    const from = fromDate.getFullYear() * 10000 + (fromDate.getMonth()+1) * 100 + fromDate.getDate()
    const to= toDate.getFullYear() * 10000 + (toDate.getMonth()+1) * 100 + toDate.getDate()  
    const baseURL = 'http://localhost:9103/interoperability/api/ChargesBy'

    useEffect(() => {
        axios.get(
            baseURL + "/" + value +  "/" + from + "/" + to
        )
            .then(res => { 
                const jsonString = JSON.stringify(res.data)
                const param = jsonString.indexOf('"VisitingOperator"', 0)
                const newjson = "[{"+jsonString.substring(param,(jsonString.length)-2)
                console.log(newjson)
                console.log(typeof(JSON.parse(newjson)))
                setCharges(JSON.parse(newjson))
                
    })})

    var stations = [
        {value: "aodos", label: "Αττική Οδός"},
        {value: "gefyra", label: "Γέφυρα Ρίου-Αντιρρίου"},
        {value: "egnatia", label: "Εγνατία Οδός"},{value: "kentriki_odos", label: "Κεντρική Οδός"},
        {value: "moreas", label: "Μορέας"},
        {value: "nea_odos", label: "Νέα Οδός"},{value: "olympia_odos", label: "Ολυμπία Οδός"},
    ]

    return (
        <div className="charges">
            { charges.map(charge => {
                return (
                <>
                    <h4> Κωδικός Λειτουργού: {charge.VisitingOperator}</h4>
                    
                    <p>Αριθμός Διελεύσεων: {charge.NumberOfPasses}</p>
                    <p>Χρωστούμενο Ποσό: {charge.PassesCost}€</p>
                </>
                )
            })}
        </div>
    )
}

