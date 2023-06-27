import React, {useContext, useState, useEffect, createContext} from 'react';
import Question from './Question';
import {ConContext} from './MyApp';
import { Button, ThemeProvider } from '@ui5/webcomponents-react';
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { useNavigate } from 'react-router-dom';


export const QContext = createContext()
const Quiz = () => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState();
  const {questions, fetchQuestions, setQuestions, setScore, score} = useContext(ConContext);
  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );

    
  }, [currQues, questions]);
  console.log(questions);

  
  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };


  return (
    < QContext.Provider value={{currQues,
      setCurrQues,
      questions,
      options,
      score,
      setScore,
      setQuestions}}>
    <div style={{
      display:'flex', flexDirection:'column', alignItems: 'center',...spacing.sapUiLargeMargin
    }}>
      <span style={{ ...spacing.sapUiContentPadding, border: '1px solid black', boxshadow: '4px 4px 2px black', fontSize:'25px'}}>
        Welcome!!
      </span>
      {questions?(
        <>
      <div style={{ width:'100%', display: 'flex', justifyContent:'space-between', ...spacing.sapUiLargeMarginBeginEnd }}>
            {/* <span>{questions[currQues].category}</span> */}
            <span>
              {/* {questions[currQues].difficulty} */}
              Score : {score}
            </span>
          </div>
          
              <Question />
          
          
          
      </>
      ): (<div style={{justifyContent:'space-evenly',...spacing.sapUiMediumMarginTop}}>Loading Questions Please Wait!</div> )}

    </div>
    </QContext.Provider>
  )
}

export default Quiz