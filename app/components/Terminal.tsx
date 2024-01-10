"use client";
import React, {useContext, useState, useTransition} from "react";
import {Container} from "@mui/system";
import {Box} from "@mui/material";
import {formSubmit, registerDomain} from "@/app/actions/terminal";
import {Domain} from "@prisma/client";
import PagesContext from "@/lib/PagesContext";
import {pages as pagesGenerator} from "../pages/pages";

const terminalText = "[user@acm-mainframe]~$ ";

const customFont = `
    @font-face {
        font-family: 'consolas regular';
        src: url('../public/CONSOLA.ttf') format('truetype');
    }
`;

interface consoleLine {
    type: 'error' | 'response' | 'command';
    message: string;
}

function Terminal({setShowTerminal}: { setShowTerminal: Function }) {
    const [isPending, startTransition] = useTransition();
    const [consoleHistory, setConsoleHistory] = useState<consoleLine[]>([
        {
            type: "response",
            message: "Welcome to the ACM Mainframe Terminal! Type 'help' for a list of commands",
        },
    ]);

    const {setPages} = useContext(PagesContext);

    const runCommand = async (command: string) => {
        let domain: string;
        const temp: consoleLine[] = [
            ...consoleHistory,
            {
                message: `${terminalText}${command}`,
                type: "command",
            },
        ];
        if (!command) {
            setConsoleHistory([...temp])
            return;
        }

        switch (command.split(" ")[0].toLowerCase()) {
            case "help":
                setConsoleHistory([
                    ...temp,
                    {
                        message: "Available commands: \n ┝ help - displays this message \n ┝ clear - clears the terminal \n ┝ register <domain> - registers a domain \n ┝ formsubmit <domain> - submits a form for a domain, \n └ exit - exits the terminal",
                        type: "response",
                    },
                ]);
                break;
            case "clear":
                setConsoleHistory([]);
                break;
            case "exit":
                setConsoleHistory([...temp, {message: "Goodbye!", type: "response"}]);
                setTimeout(() => {
                    setShowTerminal(false);
                }, 1000);
                break;
            case "register":
                if (command.split(" ").length<2){
                    setConsoleHistory([
                        ...temp,
                        {
                            message: "Domain not provided. Usage: register <domain>",
                            type: "error",
                        },
                    ]);
                    break;
                }
                domain = command.split(" ")[1];

                if(Object.keys(Domain).includes(domain)){
                    const response = await registerDomain(domain as Domain);
                    setConsoleHistory([
                        ...temp,
                        response.console,
                    ]);
                    if (response.registrations) {
                        setPages(pagesGenerator(response.registrations));
                    }
                } else {
                    setConsoleHistory([
                        ...temp,
                        {
                            message: "Please provide valid domain [web, app, research, cc, design, management]",
                            type: "error",
                        },
                    ]);
                }
                break;
            case "formsubmit":
                if (command.split(" ").length<2){
                    setConsoleHistory([
                        ...temp,
                        {
                            message: "Domain not provided. Usage: register <domain>",
                            type: "error",
                        },
                    ]);
                    break;
                }
                domain = command.split(" ")[1];

                if(Object.keys(Domain).includes(domain)){
                    const response = await formSubmit(domain as Domain);
                    setConsoleHistory([
                        ...temp,
                        response.console,
                    ]);
                    if (response.registrations) {
                        setPages(pagesGenerator(response.registrations));
                    }
                } else {
                    setConsoleHistory([
                        ...temp,
                        {
                            message: "Please provide valid domain [web, app, research, cc, design, management]",
                            type: "error",
                        },
                    ]);
                }
                break;
            default:
                setConsoleHistory([
                    ...temp,
                    {
                        message: `${command} is not a valid command`,
                        type: "error",
                    },
                ]);
                break;
        }
    }

    return (
        <>
            <Box sx={{
                height: "15%",
                marginTop: "1px",
                // marginBottom: "0px",
                textDecoration: "underline #0078d4",
                textUnderlineOffset: "5px",
                paddingLeft: "28px",
                paddingTop: "3px",
                fontFamily: "consolas regular",
                backgroundColor: "#1e1e1e",
            }}>
                <span style={{
                    fontSize: "75%",
                    fontFamily: "inherit",
                    textTransform: "uppercase",
                    cursor: "context-menu",
                }}>Terminal</span>
            </Box>
            <Container
                sx={{
                    height: "86%",
                    marginLeft: "0px",
                    // height: "40%",
                    width: "100%",
                    // backgroundColor: "#181818",
                    color: "inherit",
                    overflow: 'auto',
                    marginRight: "0px",
                }}
                maxWidth={false}
            >

                <Box
                    sx={{
                        // height:"90%"
                        width: "100%",
                    }}
                >
                    {consoleHistory.map((line, index) => (
                        <pre key={index} style={{
                            marginBottom: "8px",
                            marginTop: "8px",
                            color: line.type === 'error' ? '#F14C4C' : line.type === 'command' ? '#0DBC79' : 'inherit',
                        }}>{line.message}</pre>
                    ))}{!isPending &&
                    <pre style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                    }}><span style={{color: "#0DBC79",}}>{terminalText}</span>
                         <input
                            type="text"
                            name="input"
                            autoFocus
                            onKeyDown={(event) => {
                                // TODO implement up-arrow and down-arrow functionality
                                if (event.key === "Enter") {
                                    startTransition(()=>runCommand((event.target as HTMLInputElement).value));
                                    (event.target as HTMLInputElement).value = "";
                                    // TODO: Scroll to bottom of terminal
                                    // terminalContainer.current!.scrollTop = terminalContainer.current!.scrollHeight;
                                }
                            }}
                            style={{
                                border: "none",
                                outline: "none",
                                // backgroundColor: ()?"#272727" : "none",
                                backgroundColor: "inherit",
                                fontFamily: "inherit",
                                fontSize: "inherit",
                            }}
                        />
      </pre>}
                </Box>
            </Container>
        </>

    );
}

export default Terminal;
