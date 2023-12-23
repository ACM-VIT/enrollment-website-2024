"use client";
import React, {useState} from "react";
import {Container} from "@mui/system";
import {Box} from "@mui/material";

const terminalText = "[user@acm-mainframe]~$ ";


interface consoleLine {
    type: 'error' | 'response' | 'command';
    message: string;
}

function Terminal({setShowTerminal}: { setShowTerminal: Function }) {
    const [consoleHistory, setConsoleHistory] = useState<consoleLine[]>([
        {
            type: "response",
            message: "Welcome to the ACM Mainframe Terminal! Type 'help' for a list of commands",
        },
    ]);

    return (
        <>
            <Box sx={{
                height: "10%",
                marginTop: "4px",
                marginBottom: "14px",
                textDecoration: "underline #0078d4",
                textUnderlineOffset: "5px",
                paddingLeft: "28px",
                paddingTop: "12px",
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
                    height: "85%",
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
                            color: line.type === 'error' ? '#ff0000' : line.type === 'command' ? '#c353c3' : '#ffffff',
                        }}>{line.message}</pre>
                    ))}
                    <pre style={{
                        marginBottom: "8px",
                        marginTop: "8px",
                    }}>
            <span style={{
                color: "#c353c3",
            }}>
          {terminalText}
        </span>
            <input
                type="text"
                name="input"
                autoFocus
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        const temp: consoleLine[] = [
                            ...consoleHistory,
                            {
                                message: `${terminalText}${(event.target as HTMLInputElement).value}`,
                                type: "command",
                            },
                        ];
                        const input = (event.target as HTMLInputElement).value;
                        switch (input) {
                            case "help":
                                setConsoleHistory([
                                    ...temp,
                                    {
                                        message: "Available commands: \n help - displays this message \n clear - clears the terminal \n exit - exits the terminal",
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
                            default:
                                setConsoleHistory([
                                    ...temp,
                                    {
                                        message: `${input} is not a valid command`,
                                        type: "error",
                                    },
                                ]);
                                break;
                        }
                        (event.target as HTMLInputElement).value = "";
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
      </pre>
                </Box>
            </Container>
        </>

    );
}

export default Terminal;
