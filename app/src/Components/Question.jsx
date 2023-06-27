import React ,{ useContext, createContext} from 'react';
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { QContext } from '../Pages/Quiz';
import './Question.css';
import {Button} from '@ui5/webcomponents-react';
import ErrorMessage from './ErrorMessage';
import {ConContext} from '../MyApp'
export const SContext = createContext()
const Question = (
    
) => {
    const [selected, setSelected] = useState();
    
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {currQues,
    setCurrQues,
    questions,
    options,
    setScore,
    score,
    setQuestions } = useContext(QContext);
    const {questio, fetchQuestions, setQuest, setSore, sore, userid, setUserid,category,setCategory,difficulty,setDifficulty,best,setBest} = useContext(ConContext);
    
    const correct=questions[currQues]?.correct_answer;


  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(parseInt(score) + 1);
    setError(false);
  };
  let input={
    user_id:userid,
    category:category,
    difficulty:difficulty,
    score:score
  }
  const handleNext = async() => {
    
    console.log(currQues)
    if (currQues > 8) {
      console.log(JSON.stringify(input));
      const response = await fetch("http://localhost:4004/catalog/updateQuiz",{
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(input)
        });
        
      response.json().then((data) => {setBest(data.value)
      console.log(data.value)});
      console.log(best);
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
    navigate("/");
  };
  return (
    < SContext.Provider value={{best}}>
    <div style={{display:'flex',width:'100%', alignItems:'center', flexDirection:'column'}}>
        <h1>Question {currQues + 1} :</h1>
        <div style={{width:'95%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-around',...spacing.sapUiTinyMargin, ...ThemingParameters.sapUiContentPadding}}>
          <h2 style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{questions[currQues].question}</h2>
        </div>
        <div className="options">
        {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className='controls' >
          <Button
          style={{width:'185px'}}
          onClick={() => handleQuit()}>
            Quit
          </Button>
          <Button
          style={{width:'185px'}}          
          onClick={handleNext}>
          {currQues === 9 ? "Submit" : "Next Question"}
          </Button>

        </div>
    </div>
    </SContext.Provider>
  )
}

export default Question