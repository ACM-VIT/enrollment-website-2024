"use client";
import React from "react";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import { submitForm, registerDomain } from "@/app/actions/terminal";
import { Domain } from "@prisma/client";
import { pages as pagesGenerator } from "../pages/pages";
import { ReactTerminal } from "react-terminal";
import style1 from "@/app/components/terminal.module.css";

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
        Welcome to the ACM Mainframe Terminal! Type{" "}
        <strong>&apos;help&apos;</strong> for a list of commands
        <br />
        <br />
    </span>
);

function Terminal({
    setShowTerminal,
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
                ┝ register &lt;domain&gt; - registers a domain <br />┝
                submitform &lt;domain&gt; - submits a form for a domain, <br />└
                exit - exits the terminal
            </span>
        ),
        exit: () => {
            setTimeout(() => {
                setShowTerminal(false);
            }, 1000);
            return <span>Goodbye!</span>;
        },
        board: (
            <span>
                - chair
                <br />
                - vc
                <br />
                - techLead
                <br />
                - sec
                <br />
                - researchLead
                <br />
                - designLead
                <br />
                - contentLead
                <br />
                - projectLead
                <br />
                - internalLead
                <br />
                - devRelLead
                <br />
                - wChair
                <br />
                - wVC
                <br />
                - wSec
                <br />
            </span>
        ),
        chair: "Manav Muthanna: the one who hustles so hard, he'd even trade his ID card for ACM.",
        vc: " Anand Rajaram: His sweetness rivals honey and his shyness adds a touch of mystery to his legendary skills.",
        techLead:
            "Rohan Khatua: Bend the knee, for the almighty Lord Rohan has arrived.",
        sec: "Shambhavi Sinha: She is smooth as butter, sharp as a knife,whenever you want something from her she gets it done right.",
        researchLead:
            "Saharsh Bhansali: He doesn't just lead by an example, he leads by an example and a 10-mark diagram.",
        designLead:
            "Ritaank Gunjesh: A maestro of the twerk and design, man shakes up social media with bootylicious designs and visually stunning graphics.",
        contentLead: "Ojal Binoj Koshy",
        projectLead:
            "Sarthak Gupta: If acm were a classroom he would be the quiet kid.",
        internalLead: "Hari R. Kartha",
        devRelLead:
            "Vidit Kothari: He makes every flex box move to his melodious tunes.",
        wChair: "Anshuman Gupta: he infuses every interaction with a potent blend of engaging humor and communication wizardry",
        wVC: " Devanshi Tripathi:  a girl with an iron will and a heart of gold, promising endless reliability with a sprinkle of fun!",
        wSec: "Aryan Chaudhary:",
        dev: (
            <span>
                Kairav Nitin Sheth & Supratim Ghose
                <br />
                Assisted by - Shane Shaji Thomas, Souparnika Jayagopal, Eshita
                Jain, Kushagra Rohatgi, Srija Puvvada , K Dhanush Baalaji
            </span>
        ),

        register: async (domain: string) => {
            if (!domain) {
                return (
                    <span style={{ color: "#FF443E" }}>
                        Domain not specified
                    </span>
                );
            }
            if (!(domain in Domain)) {
                return (
                    <span style={{ color: "#FF443E" }}>Domain not found</span>
                );
            }
            const response = await registerDomain(domain as Domain);
            if (response.roundUser) {
                setPages(pagesGenerator(response.roundUser));
            }
            return response.console.type === "error" ? (
                <span style={{ color: "#FF443E" }}>
                    {response.console.message}
                </span>
            ) : (
                response.console.message
            );
        },
        formsubmit: async (domain: string) => {
            if (!domain) {
                return (
                    <span style={{ color: "#FF443E" }}>
                        Domain not specified
                    </span>
                );
            }
            if (!(domain in Domain)) {
                return (
                    <span style={{ color: "#FF443E" }}>Domain not found</span>
                );
            }
            const response = await submitForm(domain as Domain);
            if (response.roundUser) {
                setPages(pagesGenerator(response.roundUser));
            }
            return response.console.type === "error" ? (
                <span style={{ color: "#FF443E" }}>
                    {response.console.message}
                </span>
            ) : (
                response.console.message
            );
        },
    };

    return (
        <>
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
                }}
                maxWidth={false}
            >
                <div className={style1.terminal}>
                    <ReactTerminal
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
                            <span style={{ color: "#FF443E" }}>
                                Command not found
                            </span>
                        }
                    />
                </div>
            </Container>
        </>
    );
}

export default Terminal;
