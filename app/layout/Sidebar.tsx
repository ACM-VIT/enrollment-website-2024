import React from "react";
import {
  Box,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Button,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { VscFiles, VscSettingsGear } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";
import Divider from "@mui/material/Divider";
import { links } from "../pages/links";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";

interface Props {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  handleThemeChange: () => void;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar({
  expanded,
  setExpanded,
  darkMode,
  handleThemeChange,
  setSelectedIndex,
}: Props) {
  // const navigate = useNavigate();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openProfileMenu = Boolean(anchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    signOut({ redirect: true, callbackUrl: "/landing" });
  };

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
          <Tooltip title="Source of this project" arrow placement="right">
            <Link
              target="_blank"
              href={"https://github.com/Supratim69/react-vscode-portfolio"}
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
                sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
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
            onClick={handleProfileClick}
          >
            <Box mt={0.7}>
              <AccountCircleIcon />
            </Box>
          </Box>
          <Tooltip
            title={darkMode ? "Turn on the light" : "Turn off the light"}
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
          <Tooltip title="Markdown syntax" arrow placement="right">
            <Link
              onClick={() => {
                setSelectedIndex(-1);
                router.push("/docs");
              }}
              underline="none"
              color="inherit"
              sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
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
              >
                <Box mt={0.7}>
                  <VscSettingsGear />
                </Box>
              </Box>
            </Link>
          </Tooltip>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openProfileMenu}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Button
            color="inherit"
            disableRipple
            style={{ backgroundColor: "transparent" }}
            onClick={handleLogout}
            sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          >
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
