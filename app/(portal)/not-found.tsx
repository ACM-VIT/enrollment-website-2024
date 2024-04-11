'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
function NotFound() {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/');
    }, [router]);

    return (
        <></>
    );
}

export default NotFound;