import React, {useContext} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {useRouter} from "next/navigation";
import {useTheme} from "@mui/material/styles";
import {VscMarkdown} from "react-icons/vsc";
import PagesContext from "@/lib/PagesContext";
import {FaPython} from "react-icons/fa";

const groupBy = function (xs: any[], key: string | number | Function) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x);
        return rv;
    }, {});
};

export default function AppTree({focusApptree}: { focusApptree: boolean }) {
    const {pages, currentPage, unsavedChanges} = useContext(PagesContext);
    const router = useRouter();
    const theme = useTheme();

    function renderTreeItemBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index
                ? "rgba(144,202,249,0.16)"
                : "#252527";
        } else {
            return currentPage?.index === index ? "#295fbf" : "#f3f3f3";
        }
    }

    function renderTreeItemColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index && focusApptree
                ? "white"
                : "#bdc3cf";
        } else {
            return currentPage?.index === index ? "#e2ffff" : "#69665f";
        }
    }

    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{minWidth: 220}}
            defaultExpanded={["-1"]}
        >
            {Object.keys(groupBy(pages, "group")).map(
                (group) =>
                    pages.filter((i) => i.group === group).length > 0 && (
                        <TreeItem
                            key={group}
                            nodeId={group}
                            label={group}
                            color="#bdc3cf"
                        >
                            {pages
                                .filter((i) => i.group === group)
                                .map(({index, name, route, type}) => (
                                    <TreeItem
                                        key={index}
                                        nodeId={index.toString()}
                                        label={name}
                                        sx={{
                                            color: renderTreeItemColor(index),
                                            backgroundColor:
                                                renderTreeItemBgColor(index),
                                            "&& .Mui-selected": {
                                                backgroundColor:
                                                    renderTreeItemBgColor(
                                                        index
                                                    ),
                                            },
                                        }}
                                        icon={
                                            <>
                                                {type === "md" && (
                                                    <VscMarkdown color="#6997d5"/>
                                                )}
                                                {type === "py" && (
                                                    <FaPython color="#6997d5"/>
                                                )}
                                            </>
                                        }
                                        onClick={() => {
                                            if (!unsavedChanges) return router.push(`/${group}/${route}`);
                                            if (currentPage?.index !== index && window.confirm("You have unsaved changes. Are you sure you want to leave?"))
                                                router.push(`/${group}/${route}`);
                                        }}
                                    />
                                ))}
                        </TreeItem>
                    )
            )}
        </TreeView>
    );
}
