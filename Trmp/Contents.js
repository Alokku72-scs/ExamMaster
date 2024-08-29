import React,{useState} from "react";
import Form from "./Form";

function Contents({dataContainer}){

    const [currIndex,setCurrIndex] = useState(0);
    const [ans,setAns] = useState(new Array(dataContainer.length).fill(null));


    const handleNext= ()=>{
        if(currIndex < dataContainer.length -1){
            saveCurrAns();
            setCurrIndex(prevIndex=>prevIndex+1);
        }
    };

    const handlePrev= ()=>{
        if(currIndex > 0){
            saveCurrAns();
            setCurrIndex(prevIndex=>prevIndex-1);
        }
    };


    const handleAnswerChange = (isCorrect) =>{
        setAns(prevAns=>{
            const newAns=[...prevAns];
            newAns[currIndex]=isCorrect;
            return newAns;
        });
    };


    const saveCurrAns = () => {
        const currentQuestion = dataContainer[currIndex];
        const isCorrect = selectedOption === currentQuestion.ans;
        handleAnswerChange(currIndex, isCorrect);
    };

    const [selectedOption, setSelectedOption] = useState(dataContainer[currIndex]?.op1 || "");

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSubmit = () => {
        // Final save of the current answer
        saveCurrAns();
        // Perform final submission logic here
        console.log("Submitted Answers:", ans);
        alert("Your answers have been submitted!");
    };


    const currQuestion=dataContainer[currIndex];

    return (
        <div>  
            <Form key={currQuestion.id}
                      {...currQuestion}
                      onAnsChange={handleAnswerChange}
                      selectedOption={selectedOption}
                      onOptionChange={handleOptionChange}
            />
            <div>
                <button onClick={handlePrev} disabled={currIndex===0}>
                    Previous
                </button>
            <br/>
            <br/>
                <button onClick={handleNext} disabled={currIndex===dataContainer.length-1}>
                    Next
                </button>

                <button onClick={handleSubmit} disabled={ans.includes(null)}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Contents;