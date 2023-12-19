import MDContainer from "@/app/components/MDContainer";

export const pages = [
    {
        index: 0,
        group: 'domain',
        content: <MDContainer path={"./content/domains/research.md"}/>,
        name: 'research.acm',
        route: 'research',
        visible: true
    },
    {
        index: 1,
        group: 'domain',
        content: <MDContainer path={"./content/domains/web.md"}/>,
        name: 'web.acm',
        route: 'web',
        visible: true
    },
    {
        index: 2,
        group: 'domain',
        content: <MDContainer path={"./content/domains/app.md"}/>,
        name: 'app.acm',
        route: 'app',
        visible: true
    },
    {
        index: 3,
        group: 'domain',
        content: <MDContainer path={"./content/domains/management.md"}/>,
        name: 'management.acm',
        route: 'management',
        visible: true
    },
    {
        index: 4,
        group: 'domain',
        content: <MDContainer path={"./content/domains/cc.md"}/>,
        name: 'cc.acm',
        route: 'cc',
        visible: true
    },
    {
        index: 5,
        group: 'domain',
        content: <MDContainer path={"./content/domains/design.md"}/>,
        name: 'design.acm',
        route: 'design',
        visible: true
    },
    {
        index: 6,
        group: 'extras',
        content: <MDContainer path={"./content/extras/events.md"}/>,
        name: 'events.acm',
        route: 'events',
        visible: true
    },
    {
        index: 7,
        group: 'extras',
        content: <MDContainer path={"./content/extras/faqs.md"}/>,
        name: 'faqs.acm',
        route: 'faqs',
        visible: true
    },
    {
        index: 8,
        group: 'extras',
        content: <MDContainer path={"./content/extras/whois.md"}/>,
        name: 'whois.acm',
        route: 'whois',
        visible: true
    },
];
