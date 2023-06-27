
import {  MenuItem, Select, Option, Input, Icon, Button } from '@ui5/webcomponents-react';
import { spacing } from "@ui5/webcomponents-react-base";
import Categories from "./Data/Categories";
import React, { useState, useContext } from "react";
import "@ui5/webcomponents-icons/dist/paper-plane.js";
import {useNavigate} from 'react-router-dom';
import {ConContext} from './MyApp';
import ErrorMessage from './ErrorMessage';
const Home = () => {
  
    const [name, setName] = useState("");
    // const [category, setCategory] = useState(9);
    // const [difficulty, setDifficulty] = useState("easy");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    const {questions, fetchQuestions, setQuestions, setScore, score, userid, setUserid,category,setCategory,difficulty,setDifficulty,best,setBest} = useContext(ConContext);
    const handleSubmit = async () => {
      if (!category || !difficulty || !name) {
        setError(true);
        return;
      } else {
        setError(false);
        console.log(category,difficulty)
        fetchQuestions(category, difficulty);
        let state={user_name: name}
        console.log(JSON.stringify(state));
        const response = await fetch("http://localhost:4004/catalog/addUser",{
          method:"POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(state)
        })
        
        response.json().then((data) => {
          console.log(data.value);
          setUserid(data.value);
        })
        
        navigate("/quiz");
      }
      };
      
      const data = [
        {id:0,text: 'Select Difficulty'},
        { id: 1, text: "easy" },
        { id: 2, text: "medium" },
        {id: 3, text:"hard"}
      ];
      
  return (
    <div style={{
        display: 'flex', justifyContent:'space-around'}}>
        <div style={{width: '45%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <span style={{fontSize: 30 ,...spacing.sapUiContentPadding}}>Quiz Settings</span>
            <div style={{justifyContent:'space-evenly'}}>
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
            <div style={{...spacing.sapUiResponsiveContentPadding, ...spacing.sapUiSmallMarginBottom, width: '400px'}}>
            
            <Input
                icon={<Icon name="employee" />}
                label="Enter Your Name"
            variant="outlined"
                placeholder="Name"
                style={{
                    width: '400px'
                  }}
                  onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div style={{...spacing.sapUiResponsiveContentPadding , ...spacing.sapUiSmallMarginBottom}}>
            <Select
                    
                    
                    variant ='outlined'
                    style={{ 
                        width: '400px'
                      }}
                    onChange={(e)=>setCategory((e.detail.selectedOption.dataset.value))}

                    >
                    {Categories.map((cat) => (
                        <MenuItem key={cat.category} data-value={cat.value}>
                        {cat.category}
                        </MenuItem>
                    ))}
                </Select>
            </div>
                <div style={{...spacing.sapUiResponsiveContentPadding , ...spacing.sapUiSmallMarginBottom}}>
                <Select
                    label="Select Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.detail.selectedOption.dataset.value)}

                    variant="outlined"
                    style={{ width: '400px'}}
                    >
                    {data.map((item) => (
                      <Option key={item.id} data-value={item.text}>
                        {item.text}
                      </Option>
                    ))}
                </Select>

                </div>
                <Button
                    icon="paper-plane"
                    onClick={handleSubmit}
                    >
                    Start Quiz
                    </Button>
            </div>
            
        </div>
        <img  src="./quiz.svg" style={{width: '55%', alignSelf:'centre', ...spacing.sapUiSmallMarginTop}}/>       
    </div>
  )
}

export default Home