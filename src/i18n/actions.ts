'use server';

import { cookies } from 'next/headers';
import { locales, LOCALE_COOKIE, type Locale } from './config';

export async function setLocale(locale: Locale) {
  if (!(locales as readonly string[]).includes(locale)) return;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  });
}
