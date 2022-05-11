import React from 'react';
import "./Questions.css";


const Advance = (p) => {
    if (p.finalQuestion==='false') {
        return(
            <div>
                <button className="button" onClick={p.nextHandler}>Next</button>
            </div>
    )
    } else {
        return(
            <div>
                <button className="button" onClick={p.kickoffScoring}>Submit</button>
            </div>
        )
    }
}
export default Advance;
