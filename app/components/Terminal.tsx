"use client";
import React, { useState } from "react";
import { Container } from "@mui/system";
import { Grid, Box, Paper } from "@mui/material";

const terminalText = "[user@acm-mainframe]~$ ";


interface TerminalWindow {
  domain: string;
  content: string[];
}

function Terminal({ showTerminal, setShowTerminal }: { showTerminal: boolean, setShowTerminal: Function }) {
  const [consoleHistory, setConsoleHistory] = useState<String[]>([
    "Welcome to the ACM Terminal!",
  ]);
  // const terminalContainer = useRef<HTMLElement>(null);

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
          marginBottom: "12px",
          marginTop: "12px",
        }}>{line}</pre>
      ))}
      <pre style={{
        marginBottom: "12px",
        marginTop: "12px",
      }}>
            <span style={{
              fontWeight: "bold",
              color: "#c353c3",
            }}>
          {terminalText}
        </span>
            <input
          type="text"
          name="input"
          autoFocus
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              const temp = [
                ...consoleHistory,
                `${terminalText}${(event.target as HTMLInputElement).value}`,
              ];
              const input = (event.target as HTMLInputElement).value;
              switch (input) {
                case "help":
                  setConsoleHistory([
                    ...temp,
                    "help - displays this message",
                    "clear - clears the terminal",
                    "exit - exits the terminal",
                  ]);
                  break;
                case "clear":
                  setConsoleHistory([]);
                  break;
                case "exit":
                  setConsoleHistory([...temp, "Goodbye!"]);
                  setTimeout(() => {
                    setShowTerminal(false);
                  }, 1000);
                  break;
                default:
                  setConsoleHistory([
                    ...temp,
                    `${input} is not a valid command`,
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
