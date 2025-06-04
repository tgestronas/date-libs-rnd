import { Temporal } from '@js-temporal/polyfill';

export function testTemporalUsage({
  baseDate,
  futureDate,
  pastDate,
  timeZone,
}: {
  baseDate: Date;
  futureDate: Date;
  pastDate: Date;
  timeZone: string;
}) {
  const base = Temporal.Instant.from(baseDate.toISOString()).toZonedDateTimeISO(timeZone);
  const future = Temporal.Instant.from(futureDate.toISOString()).toZonedDateTimeISO(timeZone);
  const past = Temporal.Instant.from(pastDate.toISOString()).toZonedDateTimeISO(timeZone);

  // 1. Форматирование
  console.log('Формат полный:', base.toPlainDate().toString());
  console.log('Формат короткий:', `${base.year}-${base.month}-${base.day} ${base.hour}:${base.minute}`);

  // 2. Операции с датами
  const plus5Days = base.add({ days: 5 });
  const minus2Months = base.subtract({ months: 2 });
  const diffInDays = Temporal.Duration.from(future.since(base)).days;

  console.log('+5 дней:', plus5Days.toString());
  console.log('-2 месяца:', minus2Months.toString());
  console.log('Разница в днях:', diffInDays);

  // 3. Таймзоны
  console.log('В Europe/Minsk:', base.withTimeZone(timeZone).toString());
  console.log('В Asia/Tokyo:', base.withTimeZone('Asia/Tokyo').toString());

  // 4. Интернационализация
  const dateFormatter = new Intl.DateTimeFormat('fr', { dateStyle: 'full', timeZone });
  console.log('Формат fr:', dateFormatter.format(baseDate));

  const dateFormatterRu = new Intl.DateTimeFormat('ru', { dateStyle: 'full', timeZone });
  console.log('Формат ru:', dateFormatterRu.format(baseDate));

  // 5. Длительности
  const duration = Temporal.Duration.from({ hours: 1, minutes: 45 });
  const diffDuration = future.since(past, { largestUnit: 'days' });

  console.log('Длительность 1ч 45м:', duration.toString());
  console.log('Длительность между датами:', diffDuration.total({ unit: 'milliseconds' }));

  // 6. Относительные даты
  console.log('До будущего:', future.since(base).toString());
  console.log('С момента прошлого:', base.since(past).toString());

  // 7. Humanize — пока нет встроенного humanize в Temporal
}
