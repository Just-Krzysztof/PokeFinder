import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, locales, LOCALE_COOKIE, type Locale } from './config';
import { en } from '../messages/en';
import { pl } from '../messages/pl';

const messages = { en, pl };

export default getRequestConfig(async ({ requestLocale }) => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const segmentLocale = await requestLocale;

  const raw = cookieLocale ?? segmentLocale ?? defaultLocale;
  const locale: Locale = (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;

  return {
    locale,
    messages: messages[locale],
  };
});
