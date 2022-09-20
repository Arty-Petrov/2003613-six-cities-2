import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import minMax from 'dayjs/plugin/minMax.js';
import {nanoid} from 'nanoid';

dayjs.extend(minMax);
dayjs.extend(duration);

export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const generatePassword = (): string =>
  nanoid(10);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

export const generateRandomDate = (dateOneYYYMMDD: string, dateTwoYYYYMMDD: string): string => {
  const regex = /(\d{4})(\d{2})(\d{2})/gm;
  const subst = '$1-$2-$3';
  const dateOne = dateOneYYYMMDD.replace(regex, subst);
  const dateTwo = dateTwoYYYYMMDD.replace(regex, subst);
  const startDate = dayjs.min(dayjs(dateOne), dayjs(dateTwo));
  const endDate = dayjs.max(dayjs(dateOne), dayjs(dateTwo));
  const daysBetween = dayjs(endDate).diff(startDate,'days');
  const daysOffset = generateRandomValue(0, daysBetween);

  return dayjs(startDate).add(daysOffset, 'days').toISOString();
};

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length -1)];

