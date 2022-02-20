import React, { useState, useEffect } from 'react';
import Login from "../components/Login";
import Register from "../components/Register";



const LogReg = (props) => {




    return(
        <div>
            <div class="
                mx-96
                my-24
            ">
                <Login/>
            </div>
            <div class="
                mx-96
                my-48
            ">
                <Register/>
            </div>
        </div>
    )
}


export default LogReg;