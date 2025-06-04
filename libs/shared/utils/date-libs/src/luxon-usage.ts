import { DateTime, Duration } from 'luxon';

export function testLuxonUsage({
  baseDate,
  futureDate,
  pastDate,
  locale,
  timeZone,
}: {
  baseDate: Date;
  futureDate: Date;
  pastDate: Date;
  locale: string;
  timeZone: string;
}) {
  const isIntlListFormatAvailable = typeof Intl?.ListFormat === 'function';

  const base = DateTime.fromJSDate(baseDate).setLocale(locale).setZone(timeZone);
  const future = DateTime.fromJSDate(futureDate).setLocale(locale).setZone(timeZone);
  const past = DateTime.fromJSDate(pastDate).setLocale(locale).setZone(timeZone);

  // 1. Форматирование
  console.log('Формат полный:', base.toFormat('DDD'));
  console.log('Формат короткий:', base.toFormat('yyyy-MM-dd HH:mm'));

  // 2. Операции с датами
  const plus5Days = base.plus({ days: 5 });
  const minus2Months = base.minus({ months: 2 });
  const diffInDays = future.diff(base, 'days').days;

  console.log('+5 дней:', plus5Days.toISO());
  console.log('-2 месяца:', minus2Months.toISO());
  console.log('Разница в днях:', diffInDays);

  // 3. Таймзоны
  console.log('В Europe/Minsk:', base.setZone(timeZone).toString());
  console.log('В Asia/Tokyo:', base.setZone('Asia/Tokyo').toString());

  // 4. Интернационализация
  console.log('Формат fr:', base.setLocale('fr').toLocaleString(DateTime.DATE_FULL));
  console.log('Формат ru:', base.setLocale('ru').toLocaleString(DateTime.DATE_FULL));

  // 5. Длительности
  const duration = Duration.fromObject({ hours: 1, minutes: 45 });
  const diffDuration = future.diff(past, ['days', 'hours', 'minutes']);

  console.log('Длительность 1ч 45м (ISO):', duration.toISO());
  console.log('Длительность между датами:', diffDuration.toMillis());

  // 6. Относительные даты
  console.log('Относительные даты: \n');
  console.log('До будущего:', future.toRelative());
  console.log('С момента прошлого:', past.toRelative());

  // 7. Humanize

  // NOTE: С Hermes проблема с Intl.ListFormat, нужен полифилл
  if (isIntlListFormatAvailable) {
    console.log('1ч 45м humanized:', duration.toHuman({ listStyle: 'narrow' }));
    console.log('2д 3ч из diff:', diffDuration.toHuman({ listStyle: 'narrow' }));
  }
}
