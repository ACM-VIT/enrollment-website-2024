import {Prisma} from "@prisma/client";
import RoundUserGetPayload = Prisma.RoundUserGetPayload;

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
    type: string;
    roundId?: string;
}


const groupBy = function (xs: any[], key: string | number | Function) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        (rv[v] = rv[v] || []).push(x);
        return rv;
    }, {});
};
const map1: { [key: string]: number } = {
    research: 100,
    web: 200,
    app: 300,
    management: 400,
    cc: 500,
    design: 600,
}, map2: { [key: string]: string } = {
    form: 'forms',
    task: 'tasks',
}, map3: { [key: string]: string } = {
    form: 'py',
    task: 'cpp',
}
export const pages = (
    userRounds: RoundUserGetPayload<{ include: { round: true } }>[] | undefined = undefined
) => {


    const rounds : Page[] = Object.entries(groupBy(userRounds!, (x: RoundUserGetPayload<{
        include: { round: true }
    }>) => x.round.domain)).map(([key, value]) => {
        const entry = (value as RoundUserGetPayload<{ include: { round: true } }>[]);
        if(!entry[0].round.active) return null;
        if(entry[0].status !== 'pending') return null;
        return {
            index: map1[key] + entry[0].round.number,
            group: map2[entry[0].round.type],
            type: map3[entry[0].round.type],
            name:`${key}.${map3[entry[0].round.type]}`,
            route: key,
            roundId: entry[0].round.id
        }
    }).filter(x=>x!==null) as Page[];
    return [
        {
            index: 0,
            group: "domain",
            type: "md",
            name: "research.md",
            route: "research",
        },
        {
            index: 1,
            group: "domain",
            type: "md",
            name: "web.md",
            route: "web",
        },
        {
            index: 2,
            group: "domain",
            type: "md",
            name: "app.md",
            route: "app",
        },
        {
            index: 3,
            group: "domain",
            type: "md",
            name: "management.md",
            route: "management",
        },
        {
            index: 4,
            group: "domain",
            type: "md",
            name: "cc.md",
            route: "cc",
        },
        {
            index: 5,
            group: "domain",
            type: "md",
            name: "design.md",
            route: "design",
        },
        {
            index: 6,
            group: "extras",
            type: "md",
            name: "events.md",
            route: "events",
        },
        {
            index: 7,
            group: "extras",
            type: "md",
            name: "faqs.md",
            route: "faqs",
        },
        {
            index: 8,
            group: "extras",
            type: "md",
            name: "whois.md",
            route: "whois",
        },
        {
            index: 15,
            group: "instructions",
            type: "md",
            name: "instructions.md",
            route: "instructions",
        },
        ...rounds,
    ] as Page[]
};
