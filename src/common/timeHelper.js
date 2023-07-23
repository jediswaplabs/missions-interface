import { format, formatDistanceToNow } from 'date-fns';
import { enGB, hi } from 'date-fns/locale';

const locales = {
  en: enGB,
  hi,
};

const getTimeAgo = (timestamp, locale = 'en') => {
  if (!timestamp) { return ''; }
  try {
    const result = formatDistanceToNow(timestamp, {
      addSuffix: true,
      locale: locales[locale],
    });
    return result;
  } catch (e) {
    console.error(e);
    return '';
  }
};

const convertDate = (params) => {
  const {
    date,
    formatString = 'yyyy-MM-dd HH:mm', // see https://date-fns.org/v2.29.3/docs/format
    locale = 'en',
  } = params;

  try {
    const result = format(date, formatString, { locale: locales[locale] });
    return result;
  } catch (e) {
    console.error(e);
    return '';
  }
};

const subtractDays = (numOfDays, date = new Date()) => {
  date.setDate(date.getDate() - numOfDays);
  return Number(date);
};

export {
  getTimeAgo,
  convertDate,
  subtractDays,
};
