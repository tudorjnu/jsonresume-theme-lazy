import mila from 'markdown-it-link-attributes';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import moment from 'moment';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  typographer: true,
  html: true
}).enable(['link']);

md.use(mila, {
  attrs: {
    target: '_blank',
    rel: 'noopener'
  }
});

export const mdToHtml = (string?: string): string => {
  return string ? md.render(string) : '';
};

export interface Location {
  city?: string;
  countryCode?: string;
}

export const formatLocation = (location?: Location | null): string | null => {
  if (!location) return null;
  const { city, countryCode } = location;
  const parts = [city, countryCode].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
};

export const beautifyDate = (date: string): string => {
  return moment(date, 'YYYY-MM-DD').format('MMM YYYY');
};

export const formatDate = (date?: string | null): string => {
  return date ? beautifyDate(date) : 'Present';
};

export const formatPhone = (string?: string | null): string | null => {
  if (!string) return null;
  const phone = parsePhoneNumberFromString(string);
  return phone ? phone.formatInternational() : null;
};

export const formatLink = (string?: string | null): string | null => {
  if (!string) return null;
  return string.replace(/https?:\/\//g, '');
};

export const isValidArray = (array: any[] | undefined): boolean => {
  return Array.isArray(array) && array.length > 0;
};
