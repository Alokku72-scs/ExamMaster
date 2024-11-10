import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";
import Logo1 from "../assets/Logo1.png";
import Logo2 from "../assets/Logo2.png";
import Logo3 from "../assets/Logo3.png";
import Logo4 from "../assets/Logo4.png";
import Logo5 from "../assets/Logo5.png";

function Instruction() {

    const navigate = useNavigate();
    const checkboxRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (checkboxRef.current && checkboxRef.current.checked) {
            navigate('/paper');
        } else {
            alert("Please agree to the instructions before proceeding.");
        }
    };




    return (
        <div className="w-full flex flex-col justify-center items-center relative ">
            <div className="flex w-full bg-gray-300 items-center justify-between relative">
                <div className="p-1 ml-8">
                    <h1 className="font-mono text-2xl text-blue-800 tracking-wide">GENERAL INSTRUCTIONS</h1>
                </div>
                <div className="flex flex-col p-1 mr-8">
                    <label>Choose your default language</label>
                    <select className="border rounded-lg bg-gray-200 mt-2">
                        <option value="1">English</option>
                        <option value="2">Hindi</option>
                    </select>
                </div>
            </div>


            <div className="flex flex-col w-9/12 relative">
                <h2 className="text-center font-bold text-lg  mt-1 tracking-wide">Please read the instructions carefully</h2>
                <div className="ml-[15px] mr-[15px] mt-2">
                    <h3 className="font-semibold text-xl "><u>General instructions:</u></h3>
                    <div className="ml-7 mt-3">
                        <ol className="list-decimal font-serif">
                            <li>Total duration of JEE-Main - PAPER 1 EHG 11th Jan SHIFT 2 is 180 min.</li>
                            <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination.
                                When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                            <li>The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:</li>
                            {/* </ol> */}

                            <div className="ml-5" >
                                <ol className="list-decimal font-serif ">
                                    <li className="flex items-center gap-2 mt-1 mb-2">1. 
                                        <img src={Logo1}/><span>You have not visited the question yet.</span></li>
                                    <li className="flex items-center gap-2 mt-1 mb-2">2.
                                        <img src={Logo2}/><span>You have not answered the question</span></li>
                                    <li className="flex items-center gap-2 mt-1 mb-2">3.
                                        <img src={Logo3} /><span>You have answered the question.</span></li>
                                    <li className="flex items-center gap-2 mt-1 mb-2">4.
                                        <img src={Logo4}/><span>You have NOT answered the question, but have marked the question for review.</span></li>
                                    <li className="flex items-center gap-2 mt-1 mb-2">5.
                                        <img src={Logo5}/><span>The question(s) "Answered and Marked for Review" will be considered for evalution.</span></li>
                                </ol>
                            </div>

                            <li> You can click on the {">"} arrow which apperes to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on {"<"} which appears on the right side of question window.</li>
                            <li>You can click on your "Profile" image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language</li>
                            <li>You can click on {"|"} to navigate to the bottom and {"|"} to navigate to top of the question are, without scrolling.</li>

                        </ol>
                    </div>

                    <h3 className="font-semibold text-xl mt-2"><u>Navigating to a Question:</u></h3>
                    <div className="ml-[15px] mr-[15px] mt-2">
                        <ol className=" list-decimal font-serif" start="7">
                            <li className="font-serif"> To answer a question, do the following:</li>
                        </ol>
                        
                        <div className="ml-7 mt-3">
                            <ol className="list-[lower-alpha]  font-serif"  type="a">
                                <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                                <li>Click on Save & Next to save your answer for the current question and then go to the next question.</li>
                                <li>Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question.</li>
                            </ol>
                        </div>
                    </div>

                    <h3 className="font-semibold text-xl mt-2"><u>Answering a Question:</u></h3>
                    <div className="ml-[15px] mr-[15px] mt-2">
                        <ol className="list-decimal" start="8">
                        <li className="font-serif">Procedure for answering a multiple choice type question:</li>
                        </ol>
                        
                        <div className="ml-7 mt-3">
                            <ol className="list-[lower-alpha] font-serif">
                                <li>To select you answer, click on the button of one of the options</li>
                                <li>To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button</li>
                                <li>To change your chosen answer, click on the button of another option</li>
                                <li>To save your answer, you MUST click on the Save & Next button.</li>
                                <li>To mark the question for review, click on the Mark for Review & Next button.</li>
                            </ol>
                        </div>
                        <ol className="list-decimal" start="9">
                            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question</li>
                        </ol>
                    </div>
                    <h3 className="font-semibold text-xl mt-2"><u>Navigating through sections:</u></h3>
                    <div className="ml-[15px] mr-[15px] mt-2">
                        <ol className="list-decimal" start="10">
                        <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
                        <li>After click the Save & Next button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
                        <li>You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
                        <li>Candidate can view the corresponding section summery as part of the legend that appears in every section above the question palette.</li>
                        </ol>
                    </div>
                    <br/>
                    <div className="border mt-5"></div>

                    <p className="text-red-800 mt-5">Please note all questions will appear in your default language. This language can be changed for a particular question later on.</p>

                    <div className=" border mt-5"></div>
                    <br/>
                    <div className="font-serif">
                        <input
                            required
                            type="checkbox"
                            ref={checkboxRef}
                        />
                        <label className="pl-2">I have read and understood the instructions.
                            All computer hardware allotted to me are in proper
                            working condition. I declare that I am not in possession
                            of / not wearing / not carrying any prohibited gadget like
                            mobile phone, bluetooth devices etc. /any prohibited material
                            with me into the Examination Hall.I agree that in case of not
                            adhering to the instructions, I shall be liable to be debarred
                            from this Test and/or to disciplinary action, which may include
                            ban from future Tests / Examinations.
                        </label>
                    </div>

                    <div className="border mt-5"></div>

                </div>
            </div><br/>
            <button
                onClick={submitHandler}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-40 mb-4">PROCEED</button>
            
            <div className="w-full bg-indigo-800 justify-center items-center">
                <label>All Rights Reserved - SC&SS Testing Agency</label>
            </div>
        </div>
    )
}

export default Instruction;