"use client";

import {
  Alert,
  Box,
  Chip,
  Divider,
  Link,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Image from "next/image";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function MarkdownLink(props: any) {
  return (
    <Link href={props.href} target="_blank" underline="hover">
      {props.children}
    </Link>
  );
}

export function MarkdownTable(props: { children: ReactNode }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        {props.children}
      </Table>
    </TableContainer>
  );
}

export function MarkdownTableCell(props: any): ReactElement {
  if (props.style && props.style.textAlign === "right") {
    return (
      <StyledTableCell sx={{ textAlign: "right" }}>
        {props.children}
      </StyledTableCell>
    );
  } else {
    return <StyledTableCell>{props.children}</StyledTableCell>;
  }
}

export function MarkdownTableRow(props: { children: ReactNode }) {
  return <StyledTableRow>{props.children}</StyledTableRow>;
}

export function MarkdownCode(props: any): ReactElement {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  if (props.inline) {
    return <Chip size="small" label={props.children?.toString()} />;
  } else if (props.className) {
    const language = props.className.split("-")[1];
    return (
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? materialDark : materialLight}
        PreTag="div"
        showLineNumbers={true}
      >
        {props.children.toString().trim()}
      </SyntaxHighlighter>
    );
  } else {
    return (
      <SyntaxHighlighter
        style={isDarkMode ? materialDark : materialLight}
        PreTag="div"
      >
        {props.children}
      </SyntaxHighlighter>
    );
  }
}

export function MarkdownDivider() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <>
      {isDarkMode ? (
        <Divider sx={{ bgcolor: "#393939" }} />
      ) : (
        <Divider sx={{ bgcolor: "#eeeeee" }} />
      )}
    </>
  );
}

export function MarkdownH1(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontSize: "2em",
          display: "block",
          marginBlockStart: "0.67em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </>
  );
}

export function MarkdownH2(props: { children: ReactNode }) {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.5em",
          display: "block",
          marginBlockStart: "0.83em",
          marginBlockEnd: "0.3em",
          fontWeight: "bold",
          lineHeight: 1.25,
        }}
      >
        {props.children}
      </Typography>
      <MarkdownDivider />
    </>
  );
}

export function MarkdownBlockquote(props: any): ReactElement {
  return (
    <Box sx={{ borderLeft: 3, borderColor: "#eeeeee" }}>
      <blockquote>{props.children}</blockquote>
    </Box>
  );
}

// function MarkdownCheckbox(props: any) {
//   let checked = props.checked;
//   if (checked) {
//     return (
//       <FormControlLabel
//         disabled
//         control={<Checkbox defaultChecked />}
//         label={props.label}
//       />
//     );
//   } else {
//     return (
//       <FormControlLabel disabled control={<Checkbox />} label={props.label} />
//     );
//   }
// }

export function MarkdownImage(props: any) {
  return <img src={props.src} alt={props.alt} />;
}

export function MarkdownParagraph(props: any): ReactElement {
  const keyToCheck = "$$typeof";
  const exists = props.children.some(
    (obj: { hasOwnProperty: (arg0: string) => any }) =>
      obj.hasOwnProperty(keyToCheck)
  );

  const isWarning =
    typeof props.children[0] === "string" &&
    props.children[0].includes(":::") &&
    props.children.slice(-1)[0].includes(":::");

  if (isWarning) {
    const severity = props.children[0].split(" ")[1];
    return (
      <Box
        sx={{
          display: "block",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
        }}
      >
        <Alert severity={severity}>{props.children.slice(2, -1)}</Alert>
      </Box>
    );
  }
  if (exists) {
    return (
      <Box
        sx={{
          display: "block",
          marginBlockStart: "1em",
          marginBlockEnd: "1em",
          marginInlineStart: "0px",
          marginInlineEnd: "0px",
        }}
      >
        {props.children}
      </Box>
    );
  }
  return <p>{props.children}</p>;
}
