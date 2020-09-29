const s = 1000,
  m = s * 60,
  h = m * 60,
  d = h * 24,
  w = d * 7,
  y = d * 365.25;

module.exports = (ms, options = { long: false, full: false }) => {
  if (typeof ms === "string") {
    const all = ms.match(
      /(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)+/gi
    );
    if (!all || !all.length) return;
    return all.map((t) => getStrTime(t)).reduce((prev, curr) => prev + curr, 0);
  } else if (typeof ms === "number")
    return getIntTime(ms, options.long, options.full);

  throw new TypeError(
    `var ms must be typeof string|number, instead got ${typeof ms}`
  );
};

const getIntTime = (input, long = false, full = false) => {
  const calculations = {
    week: Math.floor(input / (1000 * 60 * 60 * 24 * 7)),
    day: Math.floor(input / (1000 * 60 * 60 * 24)),
    hour: Math.floor((input / (1000 * 60 * 60)) % 24),
    minute: Math.floor((input / (1000 * 60)) % 60),
    second: Math.floor((input / 1000) % 60),
  };

  const arr = [];

  for (const key of Object.keys(calculations)) {
    const val = calculations[key];

    if (val > 0)
      arr.push(
        `${val}${long ? " " : ""}${!long ? key.slice(0, 1) : key}${
          val > 1 && long ? "s" : ""
        }`
      );
  }

  return full ? arr.join(" ") : arr[0];
};

const getStrTime = (input) => {
  // alot of this was just stolen from https://github.com/vercel/ms/blob/master/index.js, i'm only expanding on this
  const match = /(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)+?/gi.exec(
    input
  );

  if (!match || !match.length) return;

  const n = parseFloat(match[1]);
  const type = (match[2] || "ms").toLowerCase();

  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n * y;
    case "weeks":
    case "week":
    case "w":
      return n * w;
    case "days":
    case "day":
    case "d":
      return n * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n * s;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n;
    default:
      return undefined;
  }
};
