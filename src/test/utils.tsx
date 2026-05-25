import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale, type Locale } from '@/i18n/config';
import { en } from '@/messages/en';
import { pl } from '@/messages/pl';
import type { ReactElement } from 'react';

export * from '@testing-library/react';

const messages = { en, pl };

interface Options extends Omit<RenderOptions, 'wrapper'> {
  locale?: Locale;
}

export function renderWithIntl(
  ui: ReactElement,
  { locale = defaultLocale, ...options }: Options = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    ),
    ...options,
  });
}
