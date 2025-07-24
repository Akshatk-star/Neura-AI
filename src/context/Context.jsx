import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => { 
    const [input, setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const[resultData, setResultData] = useState("");

    const delaypara = (index, nextWord) => { 
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setInput("");
    }
     
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        let currentPrompt;

        if(prompt !== undefined){
            response = await main(prompt);
            setRecentPrompt(prompt);
            currentPrompt = prompt;
        } else { 
            setRecentPrompt(input);
            response = await main(input);
            currentPrompt = input;
        }

        // Add to prevPrompts if it's not already there (avoid duplicates)
        setPrevPrompts(prev => {
            if (!prev.includes(currentPrompt)) {
                return [...prev, currentPrompt];
            }
            return prev;
        });
   
        let responseArray = response.split("**");
        let newArray = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 !== 1) {
                newArray += responseArray[i];
            } else {
                newArray += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newres = newArray.split("*").join("<br/>");
        let newres2 = newres.split(" ");
        for (let i = 0; i < newres2.length; i++) {
            const nextWord = newres2[i];
            delaypara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;