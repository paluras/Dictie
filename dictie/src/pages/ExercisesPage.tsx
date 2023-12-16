import React from 'react';
import Header from '../components/Header';
import '../style/style.exercise.css';
import { useState } from 'react';   
import { Link, } from 'react-router-dom';
import UsorComp from '../components/UsorComponent';
import MidComp from '../components/MidComponent';
import GreuComp from '../components/GreuComponent';

const ExercisesPage: React.FC = () => {

  


    const [level, setLevel] = useState<string>("Usor");
    console.log(level, "Level");
    const backBtnElement = <Link to={'/'}><button>Log in</button></Link>;    
    return (
        <div>
            <Header backButton={backBtnElement}/>
        <div className="exercise-main">
            {/* LeftBar component */}
            <div className="left-bar">
                <ul>
                    <li onClick={()=> setLevel("Usor")}>Usor</li>
                    <li onClick={()=> setLevel("Mediu")}>Mediu</li>
                    <li onClick={()=> setLevel("Greu")}>Greu</li>
                </ul>
            </div>
            <div className="right-main">
                {level === "Usor" && <UsorComp />}
                {level === "Mediu" && <MidComp />}
                {level === "Greu" && <GreuComp />}
            </div>
        </div>
        </div>
    );
};

export default ExercisesPage;
