'use client';

import Link, { type LinkProps } from 'next/link';
import type { UrlObject } from 'url';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useI18n } from '@/shared/providers/i18n/i18n.context';
import {
  localizePath,
  shouldLocalizePath,
} from '@/shared/lib/localized-path.utils';

type LocalizedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: ReactNode;
  };

function localizeHref(
  href: LinkProps['href'],
  lang: string,
): LinkProps['href'] {
  if (typeof href === 'string') {
    return localizePath(href, lang);
  }

  const pathname = href.pathname;

  if (!pathname || !shouldLocalizePath(pathname)) {
    return href;
  }

  return {
    ...href,
    pathname: localizePath(pathname, lang),
  } satisfies UrlObject;
}

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { lang } = useI18n();

  return <Link href={localizeHref(href, lang)} {...props} />;
}

export default LocalizedLink;
