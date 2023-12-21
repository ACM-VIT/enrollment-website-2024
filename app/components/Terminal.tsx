'use client'
import React, { useState } from 'react';
import {Container} from "@mui/system";

const terminalText = "[user@acm-mainframe]~$ ";

interface TerminalWindow {
    domain: string;
    content: string[];
}

function Confirmation({setTerminalWindows, terminalWindows, currentIndex, setCurrentIndex}) {
    const [inputHistory, setInputHistory] = useState<String[]>([]);
    const domain = terminalWindows[currentIndex].domain;

    return (
        <>
        {inputHistory.map((input) => <><pre>Do you wish to initiate registration for {domain} domain (y/n?)</pre><pre>{input}</pre><pre>Invalid input.</pre></>)}
            <pre>Do you wish to initiate registration for {domain} domain (y/n?)</pre>
            <pre>{terminalText}<input type="text" name="input" autoFocus onKeyPress={
            (event) => {
                if (event.key === 'Enter') {
                    const input = event.target.value;
                    if (input === 'y') {
                        let x = [...terminalWindows];
                        x[currentIndex].content.push(`Do you wish to initiate registration for ${domain} domain (y/n?)`);
                        x[currentIndex].content.push(`y`);
                        x[currentIndex].content.push(`Registration for ${domain} domain initiated.`);
                        setTerminalWindows([...terminalWindows, {domain: domain, content: []}]);
                        // TODO: Trigger server action or make api call
                    } else if (input === 'n') {
                        let x = [...terminalWindows];
                        x.splice(currentIndex, 1);
                        setTerminalWindows(x);
                    } else {
                        event.target.value = '';
                        setInputHistory([...inputHistory, input]);
                    }
                }
            }
        } style={{ border: 'none', outline:'none', color:'inherit', backgroundColor:'#272727',}}/></pre>
        </>
    );
}

function Terminal({showTerminal}){
    // const [showTerminal, setShowTerminal] = useState(true);
    const [terminalWindows, setTerminalWindows] = useState<TerminalWindow[]>([{domain: 'x', content: []}]);
    const [currentIndex, setCurrentIndex] = useState(0);


    if (showTerminal) {
        // TODO: Make this responsive
        return (
            <Container
                sx={{
                    height: '40%', 
                    width: '100%',
                    // backgroundColor: "#181818",  
                    color: 'inherit',
                    // overflow: 'auto',
                    // border: '3px solid #181818',
                    
                }}
            >
                {
                    terminalWindows[currentIndex].content.length == 0 ?
                    <Confirmation setCurrentIndex={setCurrentIndex} setTerminalWindows={setTerminalWindows} terminalWindows={terminalWindows} currentIndex={currentIndex}/> :
                    terminalWindows[currentIndex].content.map((line) => {
                        return <pre>{line}</pre>
                    })
                }
            </Container>
        )
    }
    return <></>;
};

export default Terminal;
