'use client';

import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {useRouter, usePathname} from 'next/navigation'
import {useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import {VscMarkdown} from "react-icons/vsc";

interface Page {
    index: number;
    name: string;
    route: string;
}

interface Props {
    pages: {
        index: number;
        name: string;
        route: string;
        group: string;
    }[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
    currentComponent: string;
    setCurrentComponent: React.Dispatch<React.SetStateAction<string>>;
    visiblePageIndexs: number[];
    setVisiblePageIndexs: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function AppTree({
                                    pages,
                                    selectedIndex,
                                    setSelectedIndex,
                                    currentComponent,
                                    setCurrentComponent,
                                    visiblePageIndexs,
                                    setVisiblePageIndexs,
                                }: Props) {
    const router = useRouter()
    const theme = useTheme();
    // const [selectedIndex, setSelectedIndex] = useState(-1);
    let pathname = usePathname();

    const page: Page = pages.find((x) => x.route === pathname)!;

    useEffect(() => {
        if (page) {
            setSelectedIndex(page.index);
        }
    }, [page, setSelectedIndex]);

    function renderTreeItemBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return selectedIndex === index ? "rgba(144,202,249,0.16)" : "#252527";
        } else {
            return selectedIndex === index ? "#295fbf" : "#f3f3f3";
        }
    }

    function renderTreeItemColor(index: number) {
        if (theme.palette.mode === "dark") {
            return selectedIndex === index && currentComponent === "tree"
                ? "white"
                : "#bdc3cf";
        } else {
            return selectedIndex === index ? "#e2ffff" : "#69665f";
        }
    }

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{minWidth: 220}}
            defaultExpanded={["-1"]}

            // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <TreeItem
                nodeId="-1"
                label="Page"
                color="#bdc3cf"
                onClick={() => {
                    router.push("/");
                    setSelectedIndex(-1);
                }}
            >
                {pages.filter(i => i.group === 'Page').map(({index, name, route}) => (
                    <TreeItem
                        key={index}
                        nodeId={index.toString()}
                        label={name}
                        sx={{
                            color: renderTreeItemColor(index),
                            backgroundColor: renderTreeItemBgColor(index),
                            "&& .Mui-selected": {
                                backgroundColor: renderTreeItemBgColor(index),
                            },
                        }}
                        icon={<VscMarkdown color="#6997d5"/>}
                        onClick={() => {
                            if (!visiblePageIndexs.includes(index)) {
                                const newIndexs = [...visiblePageIndexs, index];
                                setVisiblePageIndexs(newIndexs);
                            }
                            router.push(route);
                            setSelectedIndex(index);
                            setCurrentComponent("tree");
                        }}
                    />
                ))}
            </TreeItem>
            <TreeItem
                nodeId="-2"
                label="Extras"
                color="#bdc3cf"
                onClick={() => {
                    router.push('/');
                    setSelectedIndex(-2);
                }}
            >
                {pages.filter(i => i.group === 'Extras').map(({index, name, route}) => (
                    <TreeItem
                        key={index}
                        nodeId={index.toString()}
                        label={name}
                        sx={{
                            color: renderTreeItemColor(index),
                            backgroundColor: renderTreeItemBgColor(index),
                            "&& .Mui-selected": {
                                backgroundColor: renderTreeItemBgColor(index),
                            },
                        }}
                        icon={<VscMarkdown color="#6997d5"/>}
                        onClick={() => {
                            if (!visiblePageIndexs.includes(index)) {
                                const newIndexs = [...visiblePageIndexs, index];
                                setVisiblePageIndexs(newIndexs);
                            }
                            router.push(route);
                            setSelectedIndex(index);
                            setCurrentComponent("tree");
                        }}
                    />
                ))}
            </TreeItem>
        </TreeView>
    );
}
