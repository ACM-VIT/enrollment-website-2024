import {pages as pagesGenerator} from "@/app/pages/pages";
import Wrapper from "@/app/(portal)/[folder]/[file]/wrapper";
import FormContainer from "@/app/components/FormContainer";
import {Domain} from "@prisma/client";
import MDContainer from "@/app/components/MDContainer";
import content from "@/app/content";
import {notFound} from "next/navigation";


async function Page({params}: { params: { file: string, folder: string } }) {
    const page = pagesGenerator().find((x) => x.group === params.folder && x.route === params.file)!;

    if (!page) return notFound();

    return <Wrapper page={page}>
        {page.type === 'md' && <MDContainer content={content[page.group][page.route]}/>}
        {page.type === 'py' && <FormContainer domain={page.route as Domain}/>}
    </Wrapper>

}

export default Page;
