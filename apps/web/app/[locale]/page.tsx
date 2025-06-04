import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';
import { mockDateInputs, testTemporalUsage } from '@date-libs-rnd/shared/utils/date-libs';

export default function Index(): ReactElement {
  const t = useTranslations('web-shared.HOME_PAGE');

  //testLuxonUsage(mockDateInputs);
  testTemporalUsage(mockDateInputs);

  return <div>{t('HOME_PAGE_TEXT')}</div>;
}
