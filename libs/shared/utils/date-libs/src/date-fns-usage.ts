import {
  format,
  formatISO,
  formatDistanceToNow,
  addDays,
  subMonths,
  differenceInDays,
  intervalToDuration,
  formatDuration,
} from 'date-fns';
import { enUS, fr, ru } from 'date-fns/locale';
import { formatInTimeZone } from 'date-fns-tz';

export function testDateFnsUsage({
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
  // 1. Форматирование
  console.log('Формат полный:', format(baseDate, 'PPP'));
  console.log('Формат короткий:', format(baseDate, 'yyyy-MM-dd HH:mm'));

  // 2. Операции с датами
  const plus5Days = addDays(baseDate, 5);
  const minus2Months = subMonths(baseDate, 2);
  const diffInDays = differenceInDays(futureDate, baseDate);

  console.log('+5 дней:', formatISO(plus5Days));
  console.log('-2 месяца:', formatISO(minus2Months));
  console.log('Разница в днях:', diffInDays);

  // 3. Таймзоны (через date-fns-tz)
  console.log(`В ${timeZone}:`, formatInTimeZone(baseDate, timeZone, "yyyy-MM-dd'T'HH:mmXXX"));
  console.log('В Asia/Tokyo:', formatInTimeZone(baseDate, 'Asia/Tokyo', "yyyy-MM-dd'T'HH:mmXXX"));

  // 4. Интернационализация
  console.log('Формат fr:', format(baseDate, 'PPP', { locale: fr }));
  console.log('Формат ru:', format(baseDate, 'PPP', { locale: ru }));

  // 5. Длительности
  const oneHour45 = intervalToDuration({
    start: 0,
    end: 0 + 1 * 60 * 60 * 1000 + 45 * 60 * 1000,
  });
  const diffDur = intervalToDuration({ start: pastDate, end: futureDate });

  console.log('Длительность 1ч 45м (ISO):', 'PT1H45M');
  console.log('Длительность между датами (мс):', futureDate.getTime() - pastDate.getTime());

  // 6. Относительные даты
  console.log('Относительные даты:');
  console.log('До будущего:', formatDistanceToNow(futureDate, { addSuffix: true, locale: enUS }));
  console.log('С момента прошлого:', formatDistanceToNow(pastDate, { addSuffix: true, locale: enUS }));

  // 7. Humanize
  console.log('1ч 45м humanized:', formatDuration(oneHour45, { locale: enUS }));
  console.log('diff duration:', formatDuration(diffDur, { locale: enUS }));
}
