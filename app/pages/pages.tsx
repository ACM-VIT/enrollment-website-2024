import MDContainer from "@/app/components/MDContainer";
import content from "../content";

export const pages = [
    {index: 0, group: 'domain', content: <MDContainer content={content.domain.research}/>, name: 'research.acm', route: 'research', visible: true},
    {index: 1, group: 'domain', content: <MDContainer content={content.domain.web}/>, name: 'web.acm', route: 'web', visible: true},
    {index: 2, group: 'domain', content: <MDContainer content={content.domain.app}/>, name: 'app.acm', route: 'app', visible: true},
    {index: 3, group: 'domain', content: <MDContainer content={content.domain.management}/>, name: 'management.acm', route: 'management', visible: true},
    {index: 4, group: 'domain', content: <MDContainer content={content.domain.cc}/>, name: 'cc.acm', route: 'cc', visible: true},
    {index: 5, group: 'domain', content: <MDContainer content={content.domain.design}/>, name: 'design.acm', route: 'design', visible: true},
    {index: 6, group: 'extras', content: <MDContainer content={content.extras.events}/>, name: 'events.acm', route: 'events', visible: true},
    {index: 7, group: 'extras', content: <MDContainer content={content.extras.faqs}/>, name: 'faqs.acm', route: 'faqs', visible: true},
    {index: 8, group: 'extras', content: <MDContainer content={content.extras.whois}/>, name: 'whois.acm', route: 'whois', visible: true},
];
