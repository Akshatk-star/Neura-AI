import React from "react";
import './Main.css';
import {assets} from '../../assets/assets.js';
import { Context } from "../../context/Context.jsx";
import { useContext } from "react"; 
import main from "../../config/gemini.js";

const Main = () => { 

    const {onSent,recentPrompt, showResult,loading, resultData,input,setInput} = useContext(Context);
    return(
        <>
        <div className="main">
            <div className="nav">
                <p>Neura</p>
                <img src= {assets.user_icon} alt="" />
            </div>
            <div className="main-container"> 
                {!showResult?<> <div className="greet">
                    <p><span>Hello,Human</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div onClick={()=>{
                        onSent("Suggest beautiful places near me!");
                        setInput("");
                    } } className="card">
                        <p>Suggest beautiful places near me!</p>
                        <img src= {assets.compass_icon} alt="" />
                    </div>
                    <div onClick={()=>{
                        onSent("Brainstorm some startup ideas!");
                        setInput("");
                    }
                    }    
                    className="card">
                        <p>Brainstorm some startup ideas!</p>
                        <img src= {assets.bulb_icon} alt="" />
                    </div>
                    <div onClick={()=>{ 
                        onSent("What's new around the world?");
                        setInput("");
                    }}
                    
                    className="card">
                        <p>What's new around the world?</p>
                        <img src= {assets.menu_icon} alt="" />
                    </div>
                    <div
                    onClick={()=>{
                        onSent("Horror Movie Recommendations!");}}
                    className="card">
                        <p>Horror Movie Recommendations!</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                </div> </> : <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                          <p><b>{recentPrompt}</b></p>
                    </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading? 
                            <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                                </div> : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                               
                        </div>
                    </div>
                    }
               
                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                         type="text" placeholder="Enter your Prompt Here"/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img 
                            onClick={() => {
                                onSent(input);
                                setInput("");
                            }}
                            src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Neura is a large multimodal model that can accept images and text as input and generate text as output. It is designed to be helpful, honest, and harmless.
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Main;