import React, { createContext, useEffect } from 'react';
import { ShellBar , Icon, Text} from '@ui5/webcomponents-react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home  from "./Pages/Home";
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { useState } from 'react';
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result"

import axios from 'axios';

export const ConContext = createContext()
export function MyApp() {
  
    const fetchQuestions=async (category="", difficulty="")=>{
        const {data } = await axios.get(`https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`);

      console.log(data);
      setQuestions(data.results);

    }

    
  // const [name, setName] = useState("");
  const [userid, setUserid]=useState(0);
  const [questions, setQuestions] = useState("");
  const [score, setScore] = useState(0);
    
  const [best, setBest] = useState(0);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");

    return (
        <>
        <ShellBar 
        logo={<img src= "Quiz.jpg" alt='Welcome' />}
        icon="newspaper"
            primaryTitle='Intuitive Quiz Hub'
            // style={{...ThemingParameters.sapFontLargeSize}}
        >
            
        </ShellBar>
        <ConContext.Provider value={{questions, fetchQuestions, setQuestions, setScore, score,userid, setUserid,category,setCategory,difficulty,setDifficulty,best,setBest}}>
       <BrowserRouter>
       <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path="/home" element={<Home  />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
       </BrowserRouter>
       </ConContext.Provider>
        </>
    )
}