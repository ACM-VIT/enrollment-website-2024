"use client";
import React, { useContext, useRef, useState, useTransition } from "react";
import { Container, color, fontSize, width } from "@mui/system";
import { Box } from "@mui/material";
import { formSubmit, registerDomain } from "@/app/actions/terminal";
import { Domain } from "@prisma/client";
import PagesContext from "@/lib/PagesContext";
import { pages as pagesGenerator } from "../pages/pages";
import { ReactTerminal } from "react-terminal";

const terminalText = (
    <span
      style={{
        color: "#0DBC79",
      }}
    >
      [user@acm-mainframe]~$
    </span>
  );
  
  const welcomeMessage = (
    <span>
      Welcome to the ACM Mainframe Terminal! Type <strong>'help'</strong> for a
      list of commands
      <br />
      <br />
    </span>
  );


function Terminal({
  setShowTerminal,
  showTerminal,
  setPages,
  dark,
}: {
  setShowTerminal: Function;
  showTerminal: boolean;
  setPages: Function;
  dark: boolean;
}) {
  const commands = {
    help: (
      <span>
        Available commands: <br />
        ┝ help - displays this message <br />
        ┝ clear - clears the terminal <br />
        ┝ register &lt;domain&gt; - registers a domain <br />
        ┝ formsubmit &lt;domain&gt; - submits a form for a domain, <br />└ exit - exits
        the terminal
      </span>
    ),
    exit: () => {
      setTimeout(() => {
        setShowTerminal(false);
      }, 1000);
      return <span>Goodbye!</span>;
    },
    vc: <span>Anand Rajaram</span>,
    register: async (domain: string) => {
      if (!domain) {
        return <span style={{ color: "#FF443E" }}>Domain not specified</span>;
        }
        if (!(domain in Domain)) {
            return <span style={{ color: "#FF443E" }}>Domain not found</span>;
        }
      const response = await registerDomain(domain as Domain);
      if (response.registrations) {
        setPages(pagesGenerator(response.registrations));
      }
      return response.console.type === "error" ? (
        <span style={{ color: "#FF443E" }}>{response.console.message}</span>
      ) : (
        response.console.message
      );
    },
  };

  return     <>
  <Box
    sx={{
      height: "15%",
      marginTop: "1px",
      // marginBottom: "0px",
      textDecoration: "underline #0078d4",
      textUnderlineOffset: "5px",
      paddingLeft: "28px",
      paddingTop: "3px",
      fontFamily: "consolas regular",
      color: "inherit",
    }}
  >
    <span
      style={{
        fontSize: "75%",
        fontFamily: "inherit",
        textTransform: "uppercase",
        cursor: "context-menu",
      }}
    >
      Terminal
    </span>
  </Box>
  <Container
    sx={{
      height: "85%",
              marginLeft: "0px",
    paddingRight: "0px",
          }}
          maxWidth={false}
  >
          <ReactTerminal
              style={{
                  fontSize: "12",
              }}
      commands={commands}
      themes={{
        dark1: {
          themeBGColor: "#1e1e1e",
          themeToolbarColor: "#424242",
          themeColor: "#fff",
          themePromptColor: "#42A5F5",
        },
        light1: {
          themeBGColor: "#fafafa",
          themeToolbarColor: "#424242",
          themeColor: "#151515",
          themePromptColor: "#42A5F5",
        },
      }}
      showControlBar={false}
      welcomeMessage={welcomeMessage}
      theme={dark ? "dark1" : "light1"}
      prompt={terminalText}
      errorMessage={
        <span style={{ color: "#FF443E" }}>Command not found</span>
      }
    />
  </Container>
</>;
}

export default Terminal;
