import React, { useTransition } from "react";
import { Box, Link, Paper, Tooltip } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { VscFiles, VscTerminalPowershell } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { styled, css } from "@mui/system";
import { signOutAction } from "@/app/actions/auth";
import { isDesktop } from "react-device-detect";

interface Props {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    darkMode: boolean;
    handleThemeChange: () => void;
    showTerminal: boolean;
    setShowTerminal: Function;
    open: boolean;
    setOpen: Function;
}

export default function Sidebar({
    expanded,
    setExpanded,
    darkMode,
    handleThemeChange,
    showTerminal,
    setShowTerminal,
    setOpen,
}: Props) {
    const handleOpen = () => setOpen(true);
    // const signOut = () => {};
    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    //
    // const openProfileMenu = Boolean(anchorEl);
    //
    // const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleProfileMenuClose = () => {
    //   setAnchorEl(null);
    // };

    const [, startTransition] = useTransition();
    return (
        <React.Fragment>
            <Box
                sx={{
                    height: `calc(100vh - 20px)`,
                    backgroundColor: darkMode ? "#333333" : "#2c2c2c",
                }}
                justifyContent="space-between"
                display="flex"
                flexDirection="column"
                component={Paper}
                square
                elevation={0}
            >
                <Box
                    sx={{ flexGrow: 0 }}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Box
                        sx={{
                            borderLeft: expanded
                                ? "solid 0.12em white"
                                : darkMode
                                ? "solid 0.12em #333333"
                                : "solid 0.12em #2c2c2c",
                            cursor: "pointer",
                            WebkitTapHighlightColor: "rgba(0,0,0,0)",
                        }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <Box
                            sx={{
                                flexGrow: 0,
                                my: 1.5,
                                color: expanded ? "white" : "#858585",
                                fontSize: 24,
                                outline: "none",
                                "&:hover": {
                                    color: "white",
                                },
                            }}
                            display="flex"
                            justifyContent="center"
                        >
                            <VscFiles />
                        </Box>
                    </Box>
                    <Tooltip
                        title="Source of this project"
                        arrow
                        placement="right"
                    >
                        <Link
                            target="_blank"
                            href={
                                "https://github.com/ACM-VIT/enrollment-website-2024"
                            }
                            underline="none"
                            color="inherit"
                            sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
                        >
                            <Box
                                sx={{
                                    flexGrow: 0,
                                    cursor: "pointer",
                                    color: "#858585",
                                    fontSize: 24,
                                    "&:hover": {
                                        color: "white",
                                    },
                                }}
                                display="flex"
                                justifyContent="center"
                            >
                                <Box mt={0.7}>
                                    <BiGitBranch />
                                </Box>
                            </Box>
                        </Link>
                    </Tooltip>

                    <Divider sx={{ m: 0.5 }} />

                    {links.map((link) => (
                        <Tooltip
                            title={link.title}
                            arrow
                            placement="right"
                            key={link.index}
                        >
                            <Link
                                target="_blank"
                                href={link.href}
                                underline="none"
                                color="inherit"
                                sx={{
                                    WebkitTapHighlightColor: "rgba(0,0,0,0)",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 0,
                                        m: 0.5,
                                        color: "#858585",
                                        fontSize: 24,
                                        "&:hover": {
                                            color: "white",
                                        },
                                        cursor: "pointer",
                                    }}
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <Box mt={0.7}>{link.icon}</Box>
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                </Box>

                <Box
                    sx={{ flexGrow: 0, pb: 0.5 }}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Link>
                        <Dropdown>
                            <Tooltip title="Profile" placement="right" arrow>
                                <MenuButton>
                                    <AccountCircleIcon />
                                </MenuButton>
                            </Tooltip>
                            <Menu slots={{ listbox: Listbox }}>
                                <MenuItem onClick={handleOpen}>
                                    Edit Profile
                                </MenuItem>
                                <Divider
                                    sx={{
                                        marginX: 0,
                                        paddingX: 0,
                                        marginY: "5px",
                                        backgroundColor: "#454545",
                                    }}
                                />
                                <MenuItem
                                    onClick={() =>
                                        startTransition(signOutAction)
                                    }
                                >
                                    Sign out
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </Link>

                    <Tooltip
                        title={
                            darkMode
                                ? "Turn on the light"
                                : "Turn off the light"
                        }
                        placement="right"
                        arrow
                    >
                        <Box
                            sx={{
                                flexGrow: 0,
                                fontSize: 24,
                                color: "#858585",
                                cursor: "pointer",
                                "&:hover": {
                                    color: "white",
                                },
                                WebkitTapHighlightColor: "rgba(0,0,0,0)",
                            }}
                            display="flex"
                            justifyContent="center"
                            onClick={handleThemeChange}
                        >
                            {!darkMode ? (
                                <Box>
                                    <DarkModeOutlinedIcon />
                                </Box>
                            ) : (
                                <Box>
                                    <LightModeOutlinedIcon />
                                </Box>
                            )}
                        </Box>
                    </Tooltip>
                    {isDesktop ? (
                        <Tooltip title="Terminal" arrow placement="right">
                            <Box
                                sx={{
                                    flexGrow: 0,
                                    fontSize: 24,
                                    color: "#858585",
                                    cursor: "pointer",
                                    "&:hover": {
                                        color: "white",
                                    },
                                    WebkitTapHighlightColor: "rgba(0,0,0,0)",
                                }}
                                display="flex"
                                justifyContent="center"
                                onClick={() => setShowTerminal(!showTerminal)}
                            >
                                <Box mt={0.7}>
                                    <VscTerminalPowershell />
                                </Box>
                            </Box>
                        </Tooltip>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </React.Fragment>
    );
}

const Listbox = styled("ul")(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.9rem;
    text-align: left;
    text-indent: 2em;
    transform-origin: top right;
    padding-left: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    box-sizing: border-box;
    min-width: 170px;
    border-radius: 6px;
    overflow: auto;
    outline: 1px;
    background: ${theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff"};
    border: 0.5px solid ${
        theme.palette.mode === "dark" ? "#454545" : "#1e1e1e"
    };
    color: ${theme.palette.mode === "dark" ? "#BDC3CF" : "#474747"};
    box-shadow: 0px 4px 4px ${
        theme.palette.mode === "dark"
            ? "rgba(0,0,0, 0.25)"
            : "rgba(0,0,0, 0.25)"
    };
    z-index: 3;
    margin-left: 26px;
    position: fixed;
    transform: translateY(-100%);
    `
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 3px 4px;
    border-radius: 6px;
    cursor: pointer;
    user-select: none;
    &:last-of-type {
      border-bottom: none;
    }

    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? "#BDC3CF" : "#1f1f1f"};
    }
  
    &:hover:not(.${menuItemClasses.disabled}) {
      
      background-color: ${
          theme.palette.mode === "dark" ? "#04395E" : "#6997D5"
      };
      color: ${theme.palette.mode === "dark" ? "#ffffff" : "#1f1f1f"};
    }
    `
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        padding: 10px 10px 6px 14px;
        transition: all 150ms ease;
        cursor: pointer;
        background: ${theme.palette.mode === "dark" ? "#333333" : "#2c2c2c"};
        border: 0;

        border-top-width: 2px;
        color: ${theme.palette.mode === "dark" ? "#858585" : "#858585"};
        box-shadow: 0 0 0 0;

        &:hover {
            background: ${theme.palette.mode === "dark"
                ? "#333333"
                : "#333333"};
            color: ${theme.palette.mode === "dark" ? "#ffffff" : "#ffffff"};
        }

        &:active {
            background: ${theme.palette.mode === "dark"
                ? "#333333"
                : "#333333"};
        }
    `
);
