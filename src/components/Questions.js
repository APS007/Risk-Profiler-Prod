import React,{ useState } from "react";
import "./Questions.css";

const Question = (p) => {

    const[radioActive,setRadioActive] =useState('');

    const handleChange = (e) => {
        setRadioActive(p.an[parseInt(e.target.value)]);
        p.parentCallBack([parseInt(e.target.name),parseInt(e.target.value)])
    }


    return(
        <div>
            <p className="questionFormat">{p.qq}</p>
            {p.numrows.map(numrow=><ul className="buttonFormat"><input type="radio" name={p.qn} value={numrow} checked={radioActive===p.an[numrow]} onChange={handleChange} />{p.an[numrow]}</ul> )}
        </div>
    )
}

export default Question;
