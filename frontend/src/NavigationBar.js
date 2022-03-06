import React from 'react'
import {Link} from 'react-router-dom'
import Button from "react-bootstrap/Button";

export default function NavigationBar() {
  return (
      <div>
          <div class="tolltag">
                <h1> <b>TOLLTAG</b> </h1>
            </div>
    <div class="nav-bar">
     <Link to="/">
        <button type="button3">
            Αρχική
        </button>
    </Link>

    <Link to="/passes">
        <button type="button1">
            Διελεύσεις
        </button>
    </Link>
    
    <Link to="/charges">
        <button type="button2">
            Χρεώσεις
        </button>
    </Link>
    </div>
    </div>
  )
}
