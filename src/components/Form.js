// import React, { useEffect, useState } from "react";

function Form({ id, question, op1, op2, op3, op4,selectedOption,onOptionChange }) {
   

    const handleChange = (event) => {
        onOptionChange(event.target.value);
    };

    return (
        <div>
            <div>
                <h2>Q.({id}) {question}</h2>
            </div>
            <div>
                <input
                    type="radio"
                    value={op1}
                    onChange={handleChange}
                   // name={`question-${id}`}
                    id={`question-${id}-op1`}
                    checked={selectedOption === op1}
                />
                <label htmlFor={`question-${id}-op1`}>{op1}</label>

                <input
                    type="radio"
                    value={op2}
                    onChange={handleChange}
                    name={`question-${id}`}
                    id={`question-${id}-op2`}
                    checked={selectedOption === op2}
                />
                <label htmlFor={`question-${id}-op2`}>{op2}</label>

                <input
                    type="radio"
                    value={op3}
                    onChange={handleChange}
                    name={`question-${id}`}
                    id={`question-${id}-op3`}
                    checked={selectedOption === op3}
                />
                <label htmlFor={`question-${id}-op3`}>{op3}</label>

                <input
                    type="radio"
                    value={op4}
                    onChange={handleChange}
                    name={`question-${id}`}
                    id={`question-${id}-op4`}
                    checked={selectedOption === op4}
                />
                <label htmlFor={`question-${id}-op4`}>{op4}</label>
            </div>
        </div>
    );
}

export default Form;
