import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { render } from 'react-dom';

export default function PassesAnalysis({value, fromDate, toDate}) {

    const [passes, setPasses] = useState([])
    const operator1 = value[0];
    const operator2 = value[1];
    const from = fromDate.getFullYear() * 10000 + (fromDate.getMonth()+1) * 100 + fromDate.getDate()
    const to= toDate.getFullYear() * 10000 + (toDate.getMonth()+1) * 100 + toDate.getDate()  
    const baseURL = 'http://localhost:9103/interoperability/api/PassesAnalysis'

    useEffect(() => {
        axios.get(
            baseURL + "/" + operator1 + "/" + operator2 +  "/" + from + "/" + to
        )
            .then(res => {
                const jsonString = JSON.stringify(res.data)
                const param = jsonString.indexOf('"PassIndex"', 0)
                const newjson = "[{"+jsonString.substring(param,(jsonString.length)-2)
                console.log(newjson)
                console.log(typeof(JSON.parse(newjson)))
                setPasses(JSON.parse(newjson))
            })})

  
    return (
        <div className="passes">
        { passes.map(pass => {
            return (
            <>
                <h4> Αριθμός Διέλευσης: {pass.PassIndex}</h4>
                <p>Αναγνωριστικό: {pass.PassID}</p>
                <p>Σταθμός Διέλευσης: {pass.StationID}</p>
                <p>Ημερομηνία και Ώρα Διέλευσης: {pass.PassTimeStamp}</p>
                <p>Αναγνωριστικό Οχήματος: {pass.VehicleID}</p>
                <p>Χρέωση {pass.Charge}€ </p>
            </>
            )
        })}
    </div>
    )
}
