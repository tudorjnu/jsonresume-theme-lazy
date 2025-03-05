var mila = require("markdown-it-link-attributes");
const { parsePhoneNumberFromString } = require("libphonenumber-js");
const iso = require("iso-3166-1");
const moment = require("moment");

const md = require("markdown-it")({
  typographer: true,
  html: true,
}).enable(["link"]);

md.use(mila, {
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
});

const mdToHtml = (string) => (string ? md.render(string) : "");

const formatLocation = (location) => {
  if (!location) return null;

  const { city, countryCode } = location;
  const country = countryCode
    ? iso.whereAlpha2(countryCode)?.country || countryCode
    : null;

  const parts = [city, country].filter(Boolean);

  return parts.length ? parts.join(", ") : null;
};

const beautifyDate = (date) => moment(date, "YYYY-MM-DD").format("MMM YYYY");

const formatDate = (date) => {
  return date ? beautifyDate(date) : "Present";
};

const formatPhone = (string) => {
  if (!string) {
    return null;
  }
  return parsePhoneNumberFromString(string).formatInternational();
};

const formatLink = (string) => {
  if (!string) {
    return null;
  }
  return string.replace(/https?:\/\//g, "");
};

const isValidArray = (array) => array !== undefined && array.length > 0;

module.exports = {
  mdToHtml,
  isValidArray,
  formatLocation,
  formatDate,
  formatPhone,
  formatLink,
};
