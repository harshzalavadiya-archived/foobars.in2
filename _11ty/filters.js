const htmlmin = require("html-minifier");
const makeSynchronous = require("make-synchronous");
const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const markdown = require("markdown-it")({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
}).use(require("markdown-it-anchor"), {
  level: [2],
  permalink: false,
});

const parseDate = (str) => {
  if (str instanceof Date) {
    return str;
  }
  const date = DateTime.fromISO(str, { zone: "utc" });
  return date.toJSDate();
};

module.exports = {
  htmlmin: (content, outputPath) => {
    if (outputPath.indexOf(".html") > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  },

  cssmin: (code) => new CleanCSS({}).minify(code).styles,

  jsmin: makeSynchronous(async (code = "", opts = {}) => {
    const Terser = require("terser");
    try {
      const minified = await Terser.minify(code, opts);
      return minified.code;
    } catch (err) {
      console.error(err);
      // Unexpected minify error. Return unminified code.
      return code;
    }
  }),

  markdownify: (str) => markdown.render(str || ""),

  addYear: (_collection) => {
    let collection = _collection.slice();

    collection = collection.map((post) => {
      return {
        ...post,
        year: DateTime.fromJSDate(parseDate(post.date)).toFormat("yyyy"),
      };
    });

    return collection;
  },

  groupByYear: (collection) => {
    let yearMap = new Map();

    for (let item of collection) {
      let year = DateTime.fromJSDate(parseDate(item.date)).toFormat("yyyy");
      // let currentItems = ;

      // if (Array.isArray(currentItems)) {
      //     currentItems.push(item)
      // } else {
      yearMap.set(year, [item, ...(yearMap.get(year) || [])]);
      //}
    }

    return [...yearMap];
  },

  mailHref: (str) => {
    if (/\S+@\S+\.\S+/.test(str)) {
      return `mailto:${str}`;
    }

    return str;
  },

  markdownify_inline: (str) => markdown.renderInline(str),

  strip_html: (str) =>
    str.replace(
      /<script.*?<\/script>|<!--.*?-->|<style.*?<\/style>|<.*?>/g,
      ""
    ),

  date_formatted: (obj) => {
    const date = parseDate(obj);
    return DateTime.fromJSDate(date).toFormat("DD");
  },

  permalink: (str) => str.replace(/\.html/g, ""),

  take: (arr, n = 1) => arr.slice(0, n),

  hostname: (href) => {
    const match = href.match(
      /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    );
    const hostUrl = match[3];
    return hostUrl.replace(/(?:www\.)?/g, "");
  },
};
