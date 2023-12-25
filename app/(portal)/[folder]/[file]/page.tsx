import {pages as pagesGenerator} from "@/app/pages/pages";
import Wrapper from "@/app/(portal)/[folder]/[file]/Wrapper";


async function Page({params}: { params: { file: string, folder: string } }) {
    const page = pagesGenerator().find((x) => x.group === params.folder && x.route === params.file)!;

    return  <Wrapper page={page}>{page?.content}</Wrapper>;
}

export default Page;
