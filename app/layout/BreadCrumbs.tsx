import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { VscMarkdown } from "react-icons/vsc";
import { FaPython } from "react-icons/fa";

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
    type: string;
}

export default function BreadCrumbs({ currentPage }: { currentPage: Page }) {
    const theme = useTheme();

    return (
        <div
            style={{
                paddingLeft: "20px",
                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 2px 3px -3px #000"
                        : "0 2px 3px -3px #CCCCCC",
                backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#FFFFFF",
                width: "95%",
            }}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <div style={{ display: "flex" }}>{currentPage.group}</div>
                <div style={{ display: "flex" }}>
                    <Box sx={{ color: "#6997d5", mt: "1px", mr: 0.4 }}>
                        {currentPage.type === "md" && <VscMarkdown />}
                        {currentPage.type === "py" && <FaPython />}
                    </Box>
                    <Link
                        underline="none"
                        color="inherit"
                        sx={{
                            ":hover": {
                                color: "#7c7c7c",
                                textDecoration: "none",
                                cursor: "pointer",
                            },
                        }}
                    >
                        {currentPage.name}
                    </Link>
                </div>
            </Breadcrumbs>
        </div>
    );
}
