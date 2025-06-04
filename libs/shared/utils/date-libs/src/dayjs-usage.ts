import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import durationPlugin from 'dayjs/plugin/duration';
import 'dayjs/locale/fr';
import 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(durationPlugin);

export function testDayjsUsage({
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
  const base = dayjs(baseDate).tz(timeZone).locale(locale);
  const future = dayjs(futureDate).tz(timeZone).locale(locale);
  const past = dayjs(pastDate).tz(timeZone).locale(locale);

  // 1. Форматирование
  console.log('Формат полный:', base.format('dddd, D MMMM YYYY')); // аналог 'DDD'
  console.log('Формат короткий:', base.format('YYYY-MM-DD HH:mm'));

  // 2. Операции с датами
  const plus5Days = base.add(5, 'day');
  const minus2Months = base.subtract(2, 'month');
  const diffInDays = future.diff(base, 'day');

  console.log('+5 дней:', plus5Days.toISOString());
  console.log('-2 месяца:', minus2Months.toISOString());
  console.log('Разница в днях:', diffInDays);

  // 3. Таймзоны
  //Note: в hermes не работают таймзоны без полифилла, но не крашит приложение
  console.log(`В ${timeZone}:`, base.tz(timeZone).format()); // локальное ISO
  console.log('В Asia/Tokyo:', base.tz('Asia/Tokyo').format());

  // 4. Интернационализация
  console.log('Формат fr:', base.locale('fr').format('dddd, D MMMM YYYY'));
  console.log('Формат ru:', base.locale('ru').format('dddd, D MMMM YYYY'));

  // 5. Длительности
  const duration = dayjs.duration({ hours: 1, minutes: 45 });
  const diffDuration = dayjs.duration(future.diff(past));

  console.log('Длительность 1ч 45м (ISO):', duration.toISOString());
  console.log('Длительность между датами:', diffDuration.asMilliseconds());

  // 6. Относительные даты
  console.log('Относительные даты:\n');
  console.log('До будущего:', future.from(base));
  console.log('С момента прошлого:', past.from(base));

  // 7. Humanize (человекочитаемо)
  console.log('1ч 45м humanized:', duration.humanize());
  console.log('diff:', diffDuration.humanize());
}
