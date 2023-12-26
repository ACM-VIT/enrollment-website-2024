import React, {useContext} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {TreeItem, TreeView} from "@mui/x-tree-view";
import {useRouter} from 'next/navigation'
import {useTheme} from "@mui/material/styles";
import {VscMarkdown} from "react-icons/vsc";
import PagesContext from "@/lib/PagesContext";

const groupBy = function (xs: any[], key: string | number | Function) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x);
        return rv;
    }, {});
};

export default function AppTree({focusApptree}: { focusApptree: boolean}) {
    const {pages, currentPage} = useContext(PagesContext);
    const router = useRouter()
    const theme = useTheme();
    // const [selectedIndex, setSelectedIndex] = useState(-1);
    // let pathname = usePathname();

    // const page = pages.find((x) => `${x.group}/${x.route}` === pathname)!;

    // useEffect(() => {
    //     if (page) {
    //         setSelectedIndex(page.index);
    //     }
    // }, [page, setSelectedIndex]);

    function renderTreeItemBgColor(index: number) {
        if (theme.palette.mode === "dark") {
            return currentPage?.index === index ? "rgba(144,202,249,0.16)" : "#252527";
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
            // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >

            {Object.keys(groupBy(pages, 'group')).map((group) => (
                pages.filter(i => i.group === group).length > 0 &&
                <TreeItem
                    key={group}
                    nodeId={group}
                    label={group}
                    color="#bdc3cf"
                    // onClick={() => {
                    //     router.push('/');
                    //     setSelectedIndex(-1);
                    // }}
                >
                    {pages.filter(i => i.group === group).map(({index, name, route}) => (
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
                                // if (!visiblePageIndexs.includes(index)) {
                                //     const newIndexs = [...visiblePageIndexs, index];
                                //     setVisiblePageIndexs(newIndexs);
                                // }
                                router.push(`/${group}/${route}`);
                                // setSelectedIndex(index);
                            }}
                        />
                    ))}
                </TreeItem>
            ))}
        </TreeView>
    );
}
