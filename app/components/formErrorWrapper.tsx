import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CSS from "csstype";


interface ErrorProps {
  error: boolean;
  errorMsg: string;
  children: React.ReactNode;
}


const errStyle: CSS.Properties = {
  textDecorationLine: "underline",
  textDecorationStyle: "wavy",
  textDecorationColor: "red",
};


const popoverStyle: CSS.Properties = {
  backgroundColor: "rgb(37, 37, 38)",
  border: "2px solid rgb(90,90,90,0.25)",
  borderRadius: "0",
  borderBottom: "0",
  margin: "0",
  padding: "2px",
  paddingLeft: "5px",
  paddingRight: "5px",
  fontFamily: "'Monaco', monospace",
};


const viewProb: CSS.Properties = {
  padding: "0",
  paddingLeft: "5px",
  paddingRight: "5px",
  color: "rgb(0, 122, 204)",
  backgroundColor: "rgb(44, 44, 45)",
};


export function FormErrorWrapper(props: ErrorProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);


  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);


  return (
    <div>
      {props.error && (
        <span style={errStyle}>
          <div
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {props.children}
          </div>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography style={popoverStyle} sx={{ p: 1 }}>
              Long error message description. &nbsp;&nbsp;
              <span style={{ color: "grey" }}>ts(2304)</span>
            </Typography>
            <Typography style={popoverStyle} sx={{ p: 1 }}>
              {props.errorMsg}
            </Typography>
            <Typography
              style={{
                ...popoverStyle,
                ...viewProb,
                borderBottom: "2px solid rgb(70,70,70,0.25)",
              }}
              sx={{ p: 1 }}
            >
              View Problem(Alt+F8) &nbsp;&nbsp; Quick Fix...(Ctrl+.)
            </Typography>
          </Popover>
        </span>
      )}
      {!props.error && <>{props.children}</>}
    </div>
  );
}