import {notFound} from "next/navigation";
import {pages} from "@/app/pages/pages";

function Page({params}: {params: { file: string, folder: string }}) {
    const page = pages.find((x) => x.group === params.folder && x.route === params.file)!;

    return page?.content ?? notFound();
}

export default Page;
