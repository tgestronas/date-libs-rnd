import { getRequestConfig } from 'next-intl/server';
import { constants } from '../constants';
import type { Locale } from '@date-libs-rnd/web/shared/utils/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !constants.locales.includes(locale as Locale)) {
    locale = constants.defaultLocale;
  }

  return {
    locale,
    messages: {
      'web-shared': (await import(`../../../i18n/web/shared/${locale}.json`)).default,
    },
  };
});
