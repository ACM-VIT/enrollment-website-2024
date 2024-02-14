"use client";
import Box from "@mui/material/Box";
import Terminal from "@/app/components/Terminal";
import Paper from "@mui/material/Paper";
import PagesContext from "@/lib/PagesContext";
import Modal from "@mui/material/Modal";

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
import React, { useEffect, useState } from "react";
import AppTree from "./AppTree";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import AppButtons from "./AppButtons";
import BreadCrumbs from "./BreadCrumbs";
import { pages as pagesGenerator } from "../pages/pages";
import { isDesktop } from "react-device-detect";
import { useParams, useRouter } from "next/navigation";
import { Registration } from "@prisma/client";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TerminalContextProvider } from "react-terminal";
import subscribe from "@/app/actions/push";

const style = {
  position: "absolute",
  top: "23%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400",
  bgcolor: "background.paper",
  border: "1px solid #323233",
  boxShadow: 24,
  p: 4,
};

interface Page {
  index: number;
  name: string;
  route: string;
  group: string;
}

// function initVisiblePageIndexs(pages: Page[]) {
//     const tabs = [];
//     for (let i = 0; i < pages.length; i++) {
//         const page = pages[i];
//         if (page.visible) tabs.push(page.index);
//     }
//     return tabs;
// }

export default function App({registrations, children}: { registrations: Registration[], children: React.ReactNode }) {
    const params = useParams<{ folder: string, file: string }>()
    const router = useRouter();

  const [showTerminal, setShowTerminal] = useState(false);
  const [showExplorer, setShowExplorer] = useState(isDesktop);
  const [focusApptree, setFocusApptree] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [pages, setPages] = useState<Page[]>(pagesGenerator(registrations));
  const [darkMode, setDarkMode] = useState(
    localStorage ? localStorage.getItem("theme") === "dark" : false
  );
  const [openPages, setOpenPages] = useState<Page[]>(
    pages.filter((x) =>
      (
        JSON.parse(localStorage.getItem("openPages") || "[]") as number[]
      ).includes(x.index)
    )
  );
  const [currentPage, setCurrentPage] = useState<Page | null>(null);

  const paletteType = darkMode ? "dark" : "light";

  const handleClose = () => setOpen(false);

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

  function handleThemeChange() {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  }

  useEffect(() => {
        if ("serviceWorker" in navigator) {
            const handleServiceWorker = async () => {
                const register = await navigator.serviceWorker.register("/sw.js");
                console.log("New Service Worker registered", register.active);

                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                });

                subscribe(subscription.toJSON()).then((res) => console.log(res));
            };
            handleServiceWorker();
        }
    }, []);

    useEffect(() => {
        setOpenPages(
            openPages.filter((x) => pages.find((y) => y.index === x.index))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pages]);

  useEffect(() => {
    localStorage.setItem(
      "openPages",
      JSON.stringify(openPages.map((x) => x.index))
    );
    if (currentPage && !openPages.find((x) => x.index === currentPage.index)) {
      router.push(
        openPages[0] ? `/${openPages[0].group}/${openPages[0].route}` : "/"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPages]);

  useEffect(() => {
    if (params.folder && params.file) {
      const page = pages.find(
        (p) => p.group === params.folder && p.route === params.file
      );
      if (page) {
        setCurrentPage(page);
        if (!openPages.find((x) => x.index === page?.index)) {
          setOpenPages([...openPages, page]);
        }
        localStorage.setItem("lastPage", page.index.toString());
      } else localStorage.removeItem("lastPage");
    } else {
      const lastPageIndex = localStorage.getItem("lastPage");
      if (!lastPageIndex) {
        setCurrentPage(null);
        return;
      }
      const lastPage = openPages.find(
        (x) => x.index.toString() === lastPageIndex
      );
      if (!lastPage) {
        setCurrentPage(null);
        return;
      }
      router.replace(`/${lastPage.group}/${lastPage.route}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <PagesContext.Provider
          value={{
            pages,
            setPages,
            openPages,
            setOpenPages,
            currentPage,
          }}
        >
          <TerminalContextProvider>
            <CssBaseline enableColorScheme />
            <Container
              sx={{ m: 0, p: 0, overflowY: "hidden" }}
              maxWidth={false}
              disableGutters
            >
              <Grid
                container
                sx={{ overflow: "auto", overflowY: "hidden" }}
                onClick={() => setFocusApptree(false)}
              >
                <Grid container sx={{ overflow: "auto" }}>
                  <Grid item sx={{ width: 50 }}>
                    <Sidebar
                      setExpanded={setShowExplorer}
                      expanded={showExplorer}
                      darkMode={darkMode}
                      handleThemeChange={handleThemeChange}
                      showTerminal={showTerminal}
                      setShowTerminal={setShowTerminal}
                      open={open}
                      setOpen={setOpen}
                    />
                  </Grid>
                  {showExplorer && (
                    <Grid
                      item
                      sx={{
                        backgroundColor: darkMode ? "#252527" : "#f3f3f3",
                        width: 220,
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setFocusApptree(true);
                      }}
                    >
                      <Stack sx={{ mt: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 4 }}
                        >
                          EXPLORER
                        </Typography>
                        <AppTree focusApptree={focusApptree} />
                      </Stack>
                    </Grid>
                  )}

                  <Grid item xs zeroMinWidth>
                    <div>
                      <Modal open={open} onClose={handleClose}>
                        <Box sx={style} style={{ borderRadius: "8px" }}>
                          <Fade in={open}>
                            <div>
                              <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                value="Sai Kumar"
                                disabled
                                style={{
                                  borderRadius: "12px",
                                }}
                              />
                              <TextField
                                label="Regn No."
                                value="18BCE0000"
                                margin="normal"
                                fullWidth
                                disabled
                                style={{
                                  borderRadius: "12px",
                                }}
                              />
                              <TextField
                                label="Email ID"
                                placeholder="Email ID"
                                value="pms@vitstudent.ac.in"
                                fullWidth
                                margin="normal"
                                disabled
                                style={{
                                  borderRadius: "12px",
                                }}
                              />
                              <TextField
                                label="Phone Number"
                                contentEditable
                                // value="9876543210"
                                fullWidth
                                margin="normal"
                                name="phoneNumber"
                                type="tel"
                                style={{
                                  borderRadius: "12px",
                                }}
                              />
                              <Button
                                variant="outlined"
                                size="small"
                                sx={{
                                  backgroundColor: "inherit",
                                  border: "1px solid #333",
                                  color: "#3279cb",
                                  padding: "8px 16px",
                                  borderRadius: "4px",
                                  textTransform: "none",
                                  "&:hover": {
                                    backgroundColor: "#3279cb",
                                    color: "white",
                                    border: "1px solid #333",
                                  },
                                  marginTop: "12px",
                                }}
                              >
                                Update
                              </Button>
                            </div>
                          </Fade>
                        </Box>
                      </Modal>
                    </div>
                    <Grid
                      sx={{
                        height: "33px",
                      }}
                    >
                      <AppButtons />
                    </Grid>
                    <Grid
                      sx={{
                        height: "4px",
                      }}
                    >
                      <BreadCrumbs />
                    </Grid>

                    <Grid
                      sx={{
                        scrollBehavior: "smooth",
                        // overflow: 'scroll',
                        overflowY: "auto",
                        height: `calc(100vh - 20px - 33px - 4px)`,
                      }}
                    >
                      {/* {children} */}
                      {showTerminal ? (
                        <>
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
                            <Terminal
                              setShowTerminal={setShowTerminal}
                              dark={darkMode}
                              showTerminal={showTerminal}
                              setPages={setPages}
                            ></Terminal>
                          </Box>
                        </>
                      ) : (
                        children
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Footer />
                </Grid>
              </Grid>
            </Container>
          </TerminalContextProvider>
        </PagesContext.Provider>
      </ThemeProvider>
    </>
  );
}
