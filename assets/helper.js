var mila = require("markdown-it-link-attributes");

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

const { parsePhoneNumberFromString } = require("libphonenumber-js");
const iso = require("iso-3166-1");
const moment = require("moment");

const mdToHtml = (string) => (string ? md.render(string) : "");

const calcLocation = (location) => {
  const array = [];

  if (!location) {
    return null;
  }

  if (location.city) {
    array.push(location.city);
  }

  if (location.region) {
    array.push(location.region);
  }

  if (location.countryCode) {
    const country = iso.whereAlpha2(location.countryCode);
    array.push(
      country && array.length < 2 ? country.country : location.countryCode,
    );
  }

  return array.length > 0 ? array.join(", ") : null;
};

const calcDate = (date) => {
  return date ? beautifyDate(date) : "Present";
};

const calcDateRange = (start, end) => {
  const array = [];

  const startDate = calcDate(start);
  const endDate = calcDate(end);

  if (startDate && endDate) {
    array.push(startDate, endDate);
  } else if (startDate) {
    array.push(startDate, "Present");
  } else if (endDate) {
    array.push(endDate);
  } else {
    return null;
  }

  return array.join(" - ");
};

const beautifyDate = (date) => moment(date, "YYYY-MM-DD").format("MMM YYYY");

const beautifyArray = (separator, array) =>
  array.filter((x) => x).join(separator);

const arrayToPhrase = (array) => {
  let str = "";
  const a = array.filter((x) => x);

  if (a.length === 1) {
    str = a[0];
  } else if (a.length === 2) {
    str = a.join(" and ");
  } else if (a.length > 2) {
    str = a.slice(0, -1).join(", ") + " and " + a.slice(-1);
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
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

const validArray = (array) => array !== undefined && array.length > 0;

const parseModules = (modules) => {
  return modules;
};

module.exports = {
  mdToHtml,
  calcLocation,
  calcDate,
  calcDateRange,
  beautifyDate,
  beautifyArray,
  arrayToPhrase,
  validArray,
  formatPhone,
  formatLink,
  parseModules,
};
