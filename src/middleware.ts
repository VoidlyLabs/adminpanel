import { NextRequest, NextResponse } from 'next/server';

const SIGN_IN_PATH = '/signin';

function hasAccessToken(request: NextRequest) {
  return request.cookies.get('user_access_token')?.value;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isSignInPage = pathname === SIGN_IN_PATH;
  const isAuthorized = hasAccessToken(request);

  if (!isAuthorized && !isSignInPage) {
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = SIGN_IN_PATH;
    signInUrl.search = '';

    return NextResponse.redirect(signInUrl);
  }

  if (isAuthorized && isSignInPage) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/';
    homeUrl.search = '';

    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
