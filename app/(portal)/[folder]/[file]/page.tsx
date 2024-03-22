import {pages as pagesGenerator} from "@/app/pages/pages";
import Wrapper from "@/app/(portal)/[folder]/[file]/wrapper";
import FormContainer from "@/app/components/FormContainer";
import {PrismaClient} from "@prisma/client";
import MDContainer from "@/app/components/MDContainer";
import content from "@/app/content";
import {notFound} from "next/navigation";
import {auth} from "@/lib/auth";
import JSON from "@/app/components/JSONContainer";
import Txt from "@/app/components/TXT";

async function Page({params}: { params: { file: string, folder: string } }) {
    const prisma = new PrismaClient();
    const roundUser = await prisma.roundUser.findMany({
        where: {
            user: {
                email: (await auth())!.user!.email!
            }
        },
        include: { round: true },
        orderBy: {
            round: {
                number: 'desc'
            }
        }
    })
    const page = pagesGenerator(roundUser).find((x) => x.group === params.folder && x.route === params.file)!;

    if (!page) return notFound();

    return <Wrapper page={page}>
        {page.type === 'md' && <MDContainer content={content[page.group][page.route]}/>}
        {page.type === 'py' && <FormContainer roundId={page.roundId!}/>}
        {page.type === 'txt' && <Txt roundId={page.roundId!}/>}
        {page.type === 'json' && <JSON roundId={page.roundId!}/>}
    </Wrapper>

}

export default Page;
