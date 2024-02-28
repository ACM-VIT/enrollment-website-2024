'use client';

import {useRouter} from "next/navigation";

function Page() {
    const router = useRouter();
    return (<>
        <h1></h1>
        Too much love for us to handle. <span onClick={()=>router.back()}>Head back</span> after a few seconds.
        </>
    );
}

export default Page;