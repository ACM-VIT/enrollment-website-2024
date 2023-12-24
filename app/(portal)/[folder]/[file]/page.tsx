import { notFound } from "next/navigation";
import { pages as pagesGenerator } from "@/app/pages/pages";




function Page({params}: {params: { file: string, folder: string }}) {
    // TODO get context from layout for registrations
    const pages = pagesGenerator();
    const page = pages.find((x) => x.group === params.folder && x.route === params.file)!;

    return page?.content ?? notFound();
}
export default Page;
