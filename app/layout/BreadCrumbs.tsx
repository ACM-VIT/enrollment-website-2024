import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
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
    // const [breadcrumbs, setBreadcrumbs] = useState<React.JSX.Element[]>([]);

    const theme = useTheme();
    // const router = usePathname();

    // useEffect(() => {
    //     const pathArray = router.split("/").filter((x) => x);
    //     const extensions = ["", ""]

    //     if (pathArray.length === 0) {
    //         setBreadcrumbs([]);
    //         return;
    //     }

    //     if (pathArray[0] === "domain" || pathArray[0] === "extras") {
    //         pathArray[1] = pathArray[1] + ".md"
    //         extensions[1] = ".md"
    //     } else if (pathArray[0] === "forms") {
    //         pathArray[1] = pathArray[1] + ".py"
    //         extensions[1] = ".py"
    //     } else {
    //         pathArray[0] = pathArray[0] + ".py"
    //         extensions[0] = ".py"
    //     }

    //     const breadcrumbs = pathArray.map((path, index) => {
    //         return (
    //             <div key={index} style={{display: "flex"}}>
    //                 { extensions[index] === ".md" &&
    //                     <Box sx={{color: "#6997d5", mt: "1px", mr: 0.4}}>
    //                         <VscMarkdown/>
    //                     </Box>
    //                 }
    //                 { extensions[index] === ".py" &&
    //                     <Box sx={{color: "#6997d5", mt: "1px", mr: 0.4}}>
    //                         <FaPython />
    //                     </Box>
    //                 }
    //                 <Link
    //                     underline="none"
    //                     color="inherit"
    //                     sx={{":hover": {color: "#7c7c7c", textDecoration: "none", cursor: "pointer"}}}
    //                     >
    //                     {path}
    //                 </Link>
    //             </div>
    //         );
    //     });
    //     setBreadcrumbs(breadcrumbs);
    // }, [router]);

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
                position: "relative",
                width: "95%",
            }}
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <div style={{ display: "flex" }}>{currentPage.group}</div>
                <div style={{ display: "flex" }}>
                    {/* <Box sx={{ color: "#6997d5", mt: "1px", mr: 0.4 }}>
                        {currentPage.type === "md" ? (
                            <VscMarkdown />
                        ) : (
                            <FaPython />
                        )}
                    </Box> */}
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
