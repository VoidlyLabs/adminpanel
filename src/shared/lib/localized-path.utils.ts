const locales = ['en', 'uk'] as const;

export function getLocaleFromPath(pathname: string) {
  const locale = pathname.split('/')[1];

  return locales.includes(locale as (typeof locales)[number]) ? locale : null;
}

export function stripLocaleFromPath(pathname: string) {
  const [, first, ...rest] = pathname.split('/');

  return locales.includes(first as (typeof locales)[number])
    ? `/${rest.join('/')}`
    : pathname;
}

export function shouldLocalizePath(path: string) {
  return (
    path.startsWith('/') && !path.startsWith('//') && !getLocaleFromPath(path)
  );
}

export function localizePath(path: string, lang: string) {
  return shouldLocalizePath(path) ? `/${lang}${path}` : path;
}

export function localizePathFromWindow(path: string) {
  if (typeof window === 'undefined') {
    return path;
  }

  const lang = getLocaleFromPath(window.location.pathname);

  return lang ? localizePath(path, lang) : path;
}
