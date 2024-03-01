import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
    redis: kv,
    // 5 requests from the same IP in 10 seconds
    limiter: Ratelimit.slidingWindow(10, '10 s'),
});

// Define which routes you want to rate limit
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|blocked).*)',
};

export default async function middleware(request: NextRequest) {
    const a = Math.random().toString(36).substring(7);
    console.log('P1: Middleware', a, new Date().toISOString(), request.url, request.ip);
    // You could alternatively limit based on user ID or similar
    const ip = request.ip ?? '127.0.0.1';
    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
        ip
    );
    console.log('P2: Middleware', a, new Date().toISOString(), request.url, request.ip);
    return success
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/blocked', request.url));
}