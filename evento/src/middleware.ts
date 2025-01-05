import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/events/all', req.url))
}

export const config = {
  matcher: ['/events']
}