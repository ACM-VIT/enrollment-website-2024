'use client';
import Box from '@mui/material/Box';
import Terminal from "@/app/components/Terminal";
import Paper from '@mui/material/Paper';


import {
    Container,
    createTheme,
    CssBaseline,
    darkScrollbar,
    Grid,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import AppTree from "./AppTree";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import AppButtons from "./AppButtons";
import {pages as pagesGenerator} from "../pages/pages";
import {isBrowser} from "react-device-detect";
import {useRouter} from "next/navigation";
import {Registration} from "@prisma/client";

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
    content: React.ReactNode;
}

// function initVisiblePageIndexs(pages: Page[]) {
//     const tabs = [];
//     for (let i = 0; i < pages.length; i++) {
//         const page = pages[i];
//         if (page.visible) tabs.push(page.index);
//     }
//     return tabs;
// }

export default function App({ registrations, children }: { registrations: Registration[] ,children: React.ReactNode }) {
    const pages: Page[] = pagesGenerator(registrations);
    const [showTerminal, setShowTerminal] = useState(false);
    const [expanded, setExpanded] = useState(isBrowser);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currentComponent, setCurrentComponent] = useState("");
    const [visiblePageIndexs, setVisiblePageIndexs] = useState<number[]>([]);
    const [darkMode, setDarkMode] = useState(false);
    const [visiblePages, setVisiblePages] = useState<Page[]>([]);
    const paletteType = darkMode ? "dark" : "light";

    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === "light" ? "#FFFFFF" : "#1e1e1e",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: paletteType === "dark" ? darkScrollbar() : null,
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: "rgba(255, 255, 255, 0.12)",
                    },
                },
            },
        },
    });
    const router = useRouter();

    function handleThemeChange() {
        setDarkMode(!darkMode);
        localStorage.setItem("theme", darkMode ? "light" : "dark");
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        if (!currentTheme) setDarkMode(true);
        else setDarkMode(currentTheme === "dark");
    }, []);


    useEffect(() => {
        const newPages = [];
        const deletedIndex = visiblePages.find(
            (x) => !visiblePageIndexs.includes(x.index)
        )?.index;
        const deletedPosition = visiblePages.findIndex((x) => x.index === deletedIndex);

        for (const index of visiblePageIndexs) {
            const page = pages.find((x) => x.index === index);
            if (page) newPages.push(page);
        }
        setVisiblePages(newPages);


        if (visiblePageIndexs.length === 0) {
            setSelectedIndex(-1);
            router.push("/");
        } else if (
            deletedIndex === selectedIndex
        ) {
            if (deletedIndex === 0) {
                setSelectedIndex(visiblePageIndexs[0]);
                router.push(`/${pages[visiblePageIndexs[0]].group}/${pages[visiblePageIndexs[0]].route}`);
            } else {
                setSelectedIndex(visiblePageIndexs[deletedPosition - 1]);
                router.push(`/${pages[visiblePageIndexs[deletedPosition - 1]].group}/${pages[visiblePageIndexs[deletedPosition - 1]].route}`);
            }
        } else {
        }
    }, [visiblePageIndexs, selectedIndex]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <Container
                sx={{m: 0, p: 0, overflowY: "hidden"}}
                maxWidth={false}
                disableGutters
            >
                <Grid container sx={{overflow: "auto", overflowY: "hidden"}}>
                    <Grid container sx={{overflow: "auto"}}>
                        <Grid item sx={{width: 50}}>
                            <Sidebar
                                setExpanded={setExpanded}
                                expanded={expanded}
                                darkMode={darkMode}
                                handleThemeChange={handleThemeChange}
                                showTerminal={showTerminal}
                                setShowTerminal={setShowTerminal}
                            />
                        </Grid>
                        {expanded && (
                            <Grid
                                item
                                sx={{
                                    backgroundColor: darkMode ? "#252527" : "#f3f3f3",
                                    width: 220,
                                }}
                            >
                                <Stack sx={{mt: 1}}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ml: 4}}
                                    >
                                        EXPLORER
                                    </Typography>
                                    <AppTree
                                        pages={pages}
                                        selectedIndex={selectedIndex}
                                        setSelectedIndex={setSelectedIndex}
                                        currentComponent={currentComponent}
                                        setCurrentComponent={setCurrentComponent}
                                        visiblePageIndexs={visiblePageIndexs}
                                        setVisiblePageIndexs={setVisiblePageIndexs}
                                    /> 
                                </Stack>
                            </Grid>
                        )}

                        <Grid item xs zeroMinWidth>
                            <Grid
                                sx={{
                                    height: "33px",
                                }}
                            >
                                <AppButtons
                                    // pages={pages}
                                    pages={visiblePages}
                                    selectedIndex={selectedIndex}
                                    setSelectedIndex={setSelectedIndex}
                                    currentComponent={currentComponent}
                                    setCurrentComponent={setCurrentComponent}
                                    visiblePageIndexs={visiblePageIndexs}
                                    setVisiblePageIndexs={setVisiblePageIndexs}
                                />
                            </Grid>

                            <Grid
                                sx={{
                                    scrollBehavior: "smooth",
                                    // overflow: 'scroll',
                                    overflowY: "auto",
                                    height: `calc(100vh - 20px - 33px)`,
                                }}
                            >
                                {/* {children} */}
                                {showTerminal?<>
                                        <Box
                                            sx={{
                                                height: "64.4%",
                                                overflow: "auto",
                                            }}
                                        >
                                            {children}
                                    </Box>
                                        <Box
                                            sx={{
                                                height: "0.5px",
                                                backgroundColor: "#323233",
                                        }}
                                        />
                                        <Box
                                            component={Paper}
                                        sx={{
                                                height: "35%",
                                                }}
                                            elevation={1}
                                        >
                                            <Terminal setShowTerminal={setShowTerminal}></Terminal>
                                        </Box>
                                        </>
                                : children
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Footer/>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}


