import {Container, TableBody, TableFooter, TableHead} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

import {
    MarkdownBlockquote,
    MarkdownCode,
    MarkdownDivider,
    MarkdownH1,
    MarkdownH2,
    MarkdownImage,
    MarkdownLink,
    MarkdownParagraph,
    MarkdownTable,
    MarkdownTableCell,
    MarkdownTableRow
} from "./md";

interface Props {
    content: string;
}

export default function MDContainer({content}: Props) {

    // const content = fs.readFileSync(path, "utf-8");
    return (
        <Container>
            <ReactMarkdown

                components={{
                    code: MarkdownCode,
                    a: MarkdownLink,
                    p: MarkdownParagraph,
                    table: MarkdownTable,
                    thead: TableHead,
                    tbody: TableBody,
                    th: MarkdownTableCell,
                    tr: MarkdownTableRow,
                    td: MarkdownTableCell,
                    tfoot: TableFooter,
                    h1: MarkdownH1,
                    h2: MarkdownH2,
                    hr: MarkdownDivider,
                    // br: MarkdownBr,
                    // input: MarkdownCheckbox,
                    img: MarkdownImage,
                    blockquote: MarkdownBlockquote,
                }}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </Container>
    );
}
