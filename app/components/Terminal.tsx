"use client";
import { useRef } from 'react';
import React, { useState } from "react";
import { Container } from "@mui/system";

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
    <Container
      // ref={terminalContainer}
      sx={{
        height: "40%",
        width: "100%",
        // backgroundColor: "#181818",
        color: "inherit",
        // overflow: 'auto',
        // border: '3px solid #181818',
      }}
    >
      {consoleHistory.map((line, index) => (
        <pre key={index}>{line}</pre>
      ))}
      <pre>
        {terminalText}
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
            color: "inherit",
            backgroundColor: "#272727",
          }}
        />
      </pre>
    </Container>
  );
}

export default Terminal;
