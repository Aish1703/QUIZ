
import React,{useState, useEffect, useContext} from 'react';

import {ConContext} from '../MyApp';
import { useNavigate } from 'react-router-dom';
import {spacing} from "@ui5/webcomponents-react-base";
import {Button} from '@ui5/webcomponents-react';

const Result = () => {
  const navigate = useNavigate();
  
  const {questions, fetchQuestions, setQuestions, setScore, score,best,setBest} = useContext(ConContext);

  return (
    <div style={{display:'flex', justifyContent:'space-around'}}>
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', height:'60vh', width:'45%'}}>
      <span style={{alignSelf:'center', margin: '40px', fontSize:'30px'}}>Current Score : {score}</span>
      <span style={{alignSelf:'center', marginBottom:'40px', fontSize:'30px'}}>Best Score : {best}</span>
      <Button 
      style={{alignSelf: "center", width:'250px'}}
      onClick={()=>{
        setScore(0);
        navigate("/");
      }}
      >
      Go to homepage
      </Button>
    </div>
    <img  src="./Score.svg" style={{width: '40%', alignSelf:'centre'}}/> 
    </div>
  )
}

export default Result