import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'uk'] as const;
const defaultLocale = 'en';

const SIGN_IN_PATH = '/signin';

function hasAccessToken(request: NextRequest) {
  return request.cookies.get('user_access_token')?.value;
}

function getLocale(request: NextRequest) {
  const language = request.headers.get('accept-language');

  return language?.startsWith('uk') ? 'uk' : defaultLocale;
}

function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split('/');

  return locales.includes(first as (typeof locales)[number])
    ? '/' + rest.join('/')
    : pathname;
}

function getLocaleFromPath(pathname: string) {
  const locale = pathname.split('/')[1];

  return locales.includes(locale as (typeof locales)[number]) ? locale : null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPath(pathname);

  if (!locale) {
    const preferredLocale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url),
    );
  }

  const route = stripLocale(pathname);

  const isAuthorized = Boolean(hasAccessToken(request));
  const isSignInPage = route === SIGN_IN_PATH;

  if (!isAuthorized && !isSignInPage) {
    return NextResponse.redirect(
      new URL(`/${locale}${SIGN_IN_PATH}`, request.url),
    );
  }

  if (isAuthorized && isSignInPage) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
