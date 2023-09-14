/* This function is used to prevent the user from entering anything other than numbers in a form field. */
exports.isNumber = (evt) => {
  evt = evt ? evt : window.event;
  let charCode = evt.which ? evt.which : evt.keyCode;
  if (
    charCode > 31 &&
    (charCode < 48 || charCode > 57) &&
    (charCode === 46 || charCode === 44)
  ) {
    evt.preventDefault();
  } else {
    return true;
  }
};

/* This function is used to format a number to a currency format. */
exports.formatCurrency = (amount, decimal, currency) => {
  if (amount === undefined) return;
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: decimal,
  });
  return value.format(amount);
};

/* This function takes a time in milliseconds and returns a string in the format of `day : hour : min :
seconds` */
exports.calculateHour = (time) => {
  let timeToMilliseconds = new Date(time).getTime();
  let currentTime = Date.now();
  let ellapsedTime = currentTime - timeToMilliseconds;
  const hour = Math.floor(ellapsedTime / (1000 * 60 * 60)) % 24;
  return hour;
};

/* This function takes a time in milliseconds and returns a string in the format of `day : hour : min :
seconds` */
exports.calculateMin = (time) => {
  let timeToMilliseconds = new Date(time).getTime();
  let currentTime = Date.now();
  let ellapsedTime = currentTime - timeToMilliseconds;
  const min = Math.floor(ellapsedTime / (1000 * 60)) % 60;
  return min;
};

/* This function takes a date as an argument and returns a string in the format of `hh:mm:ss` */
exports.getTimeLeft = (countDownDate) => {
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;
  if (distance < 0) return "EXPIRED";
  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const pad = function (num) {
    return num < 10 ? "0" + num : num;
  };
  return `${days} : ${pad(hours)}  :  ${pad(minutes)}:  ${pad(seconds)}`;
};

/* A function that takes a string as an argument and returns the string with each word capitalized. */
exports.capitalizeEachWord = (string) => {
  if (!string) return;
  let words = string.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(" ");
};

/* Taking a string as an argument and returning the string with each word capitalized. */
exports.abbreviate = (string) => {
  if (!string) return;
  let letters = string.split(" ").map((word) => {
    return word.charAt(0).toUpperCase();
  });
  return letters.join(" . ");
};

/* This function takes a string as an argument and returns the string with the first letter
capitalized. */
exports.capitalize = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/* This function takes a string as an argument and returns the string with the first letter
capitalized. */
exports.truncate = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  } else {
    return text;
  }
};

/* This function takes a string as an argument and returns the string with the first letter
capitalized. */
exports.removeUnderscore = (value) => {
  if (!value) return "";
  if (!value.includes("_")) return value;
  const splitValue = value.split("_");
  if (splitValue.length === 1) return splitValue;
  return splitValue.join(" ");
};

exports.getRandomColour = function () {
  const activityColours = [
    "#3C7CBC",
    "#00BB5D",
    "#F7B633",
    "#070E14",
    "#DA0A0A",
  ];
  const number = Math.floor(Math.random() * activityColours.length);
  return activityColours[number];
};

/* This function is used to convert a number to a locale string. */
exports.convertToLocale = function (price) {
  if (price) {
    return price.toLocaleString();
  }
};

/* This function is used to check if a string is empty or not. */
exports.blankString = function (str) {
  return !str || /^\s*$/.test(str);
};

exports.vestingFrequency = function (value) {
  let frequency = null;
  switch (value) {
    case "Daily":
      frequency = 1;
      break;
    case 1:
      frequency = "Daily";
      break;
    case 30:
      frequency = "Monthly";
      break;
    case "Monthly":
      frequency = 30;
      break;
    case 91:
      frequency = "Quarterly";
      break;
    case "Quarterly":
      frequency = 91;
      break;
    case 182:
      frequency = "Bi-annually";
      break;
    case "Bi-annually":
      frequency = 182;
      break;
    case 365:
      frequency = "Yearly";
      break;
    case "Yearly":
      frequency = 365;
      break;
  }
  return frequency;
};
