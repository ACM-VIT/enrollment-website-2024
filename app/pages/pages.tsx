import MDContainer from "@/app/components/MDContainer";
import content from "../content";
import FormContainer from "@/app/components/FormContainer";
import {Domain, Registration} from "@prisma/client";

export const pages = (registrations: Registration[] | undefined = undefined) => {

    const formVisibility = (domain: Domain) => {
        if (!registrations) return true;

        let x = registrations.find(x => x.domain === domain);
        return Boolean(x && !x.formSubmittedAt);
    }

    return [
        { index: 0, group: 'domain', content: <MDContainer content={content.domain.research} />, name: 'research.md', route: 'research', visible: true },
        { index: 1, group: 'domain', content: <MDContainer content={content.domain.web} />, name: 'web.md', route: 'web', visible: true },
        { index: 2, group: 'domain', content: <MDContainer content={content.domain.app} />, name: 'app.md', route: 'app', visible: true },
        { index: 3, group: 'domain', content: <MDContainer content={content.domain.management} />, name: 'management.md', route: 'management', visible: true },
        { index: 4, group: 'domain', content: <MDContainer content={content.domain.cc} />, name: 'cc.md', route: 'cc', visible: true },
        { index: 5, group: 'domain', content: <MDContainer content={content.domain.design} />, name: 'design.md', route: 'design', visible: true },
        { index: 6, group: 'extras', content: <MDContainer content={content.extras.events} />, name: 'events.md', route: 'events', visible: true },
        { index: 7, group: 'extras', content: <MDContainer content={content.extras.faqs} />, name: 'faqs.md', route: 'faqs', visible: true },
        { index: 8, group: 'extras', content: <MDContainer content={content.extras.whois} />, name: 'whois.md', route: 'whois', visible: true },
        { index: 9, group: 'forms', content: <FormContainer domain={'research'} />, name: 'research.py', route: 'research', visible: formVisibility('research') },
        { index: 10, group: 'forms', content: <FormContainer domain={'web'} />, name: 'web.py', route: 'web', visible: formVisibility('web') },
        { index: 11, group: 'forms', content: <FormContainer domain={'app'} />, name: 'app.py', route: 'app', visible: formVisibility('app') },
        { index: 12, group: 'forms', content: <FormContainer domain={'management'} />, name: 'management.py', route: 'management', visible: formVisibility('management') },
        { index: 13, group: 'forms', content: <FormContainer domain={'cc'} />, name: 'cc.py', route: 'cc', visible: formVisibility('cc') },
        { index: 14, group: 'forms', content: <FormContainer domain={'design'} />, name: 'design.py', route: 'design', visible: formVisibility('design') },
    ].filter(x => x.visible);
}

// export const pages = [
//     { index: 0, group: 'domain', content: <MDContainer content={content.domain.research} />, name: 'research.acm', route: 'research', visible: true },
//     { index: 1, group: 'domain', content: <MDContainer content={content.domain.web} />, name: 'web.acm', route: 'web', visible: true },
//     { index: 2, group: 'domain', content: <MDContainer content={content.domain.app} />, name: 'app.acm', route: 'app', visible: true },
//     { index: 3, group: 'domain', content: <MDContainer content={content.domain.management} />, name: 'management.acm', route: 'management', visible: true },
//     { index: 4, group: 'domain', content: <MDContainer content={content.domain.cc} />, name: 'cc.acm', route: 'cc', visible: true },
//     { index: 5, group: 'domain', content: <MDContainer content={content.domain.design} />, name: 'design.acm', route: 'design', visible: true },
//     { index: 6, group: 'extras', content: <MDContainer content={content.extras.events} />, name: 'events.acm', route: 'events', visible: true },
//     { index: 7, group: 'extras', content: <MDContainer content={content.extras.faqs} />, name: 'faqs.acm', route: 'faqs', visible: true },
//     { index: 8, group: 'extras', content: <MDContainer content={content.extras.whois} />, name: 'whois.acm', route: 'whois', visible: true },
//     { index: 9, group: 'forms', content: <FormContainer domain={'cc'} />, name: 'abc.acm', route: 'abc', visible: true },
// ];