import {Button, Box, Paper} from "@mui/material";
import React, {useContext} from "react";
import {VscMarkdown, VscChromeClose} from "react-icons/vsc";
import {useTheme} from "@mui/material/styles";
import {Container} from "@mui/system";
import {useRouter} from "next/navigation";
import PagesContext from "@/lib/PagesContext";


export default function AppButtons() {
    const {currentPage, openPages, setOpenPages} = useContext(PagesContext)
    const theme = useTheme();
    const router = useRouter();

    // const [selectedIndex, setSelectedIndex] = useState(-1);
    function renderButtonBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "#1e1e1e" : "#2d2d2d";
        } else {
            return currentPage?.index === index ? "#ffffff" : "#ececec";
        }
    }

    function renderButtonColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "white" : "#817d7a";
        } else {
            return currentPage?.index === index ? "#524a5f" : "#716f74";
        }
    }

    function renderCloseButtonBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "#1e1e1e" : "#2d2d2d";
        } else {
            return currentPage?.index === index ? "#ffffff" : "#ececec";
        }
    }

    function renderCloseButtonColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "#white" : "#2d2d2d";
        } else {
            return currentPage?.index === index ? "#72736d" : "#ececec";
        }
    }

    function renderCloseButtonHoverBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "#333c43" : "#333c43";
        } else {
            return currentPage?.index === index ? "#e6e4e5" : "#dadada";
        }
    }

    function renderCloseButtonHoverColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index !== index ? "#817d7a" : "#white";
        } else {
            return currentPage?.index === index ? "#44434b" : "#92938e";
        }
    }

    function renderPageButton(index: number, name: string, route: string) {
        return (
            <Box
                key={index}
                sx={{
                    display: "inline-block",
                    borderRight: 1,
                    borderColor: theme.palette.mode === "dark" ? "#252525" : "#f3f3f3",
                }}
            >
                <Button
                    key={index}
                    disableRipple
                    disableElevation
                    disableFocusRipple
                    onClick={() => {
                        router.push(route);
                    }}
                    sx={{
                        borderRadius: 0,
                        px: 2,
                        textTransform: "none",
                        backgroundColor: renderButtonBgColor(index),
                        color: renderButtonColor(index),
                        "&.MuiButtonBase-root:hover": {
                            bgcolor: renderButtonBgColor(index),
                        },
                        transition: "none",
                        pb: 0.2,
                    }}
                >
                    <Box
                        sx={{color: "#6997d5", width: 20, height: 20, mr: 0.4, ml: -1}}
                    >
                        <VscMarkdown/>
                    </Box>
                    {name}
                    <Box
                        component={Paper}
                        sx={{
                            ml: 1,
                            mr: -1,
                            backgroundColor: renderCloseButtonBgColor(index),
                            color: renderCloseButtonColor(index),
                            "&.MuiPaper-root:hover": {
                                bgcolor: renderCloseButtonHoverBgColor(index),
                                color: renderCloseButtonHoverColor(index),
                            },
                            width: 20,
                            height: 20,
                            transition: "none",
                        }}
                        elevation={0}
                        onClick={(e: any) => {
                            e.stopPropagation();
                            setOpenPages(openPages.filter((x) => x.index !== index));
                        }}
                    >
                        <VscChromeClose/>
                    </Box>
                </Button>
            </Box>
        );
    }

    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                display: "inline-block",
                overflowX: "auto",
                overflowY: "hidden",
                whiteSpace: "nowrap",
                backgroundColor: theme.palette.mode === "dark" ? "#252527" : "#f3f3f3",
                "&::-webkit-scrollbar": {
                    height: "3px",
                    // backgroundColor: 'red',
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#535353" : "#8c8c8c",
                },
                "&::-webkit-darkScrollbar-thumb": {
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#ffffff" : "#8c8c8c",
                },
                // '&::-webkit-scrollbar:hover, & *::-webkit-scrollbar:hover': {
                //   backgroundColor: '#ffffff',
                // },
                // '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                //   {
                //     backgroundColor:
                //       theme.palette.mode === 'dark' ? '#ffffff' : '#8c8c8c',
                //   },
            }}
        >
            {openPages.map(({index, name, route, group}) =>
                renderPageButton(index, name, `/${group}/${route}`)
            )}
        </Container>
    );
}
