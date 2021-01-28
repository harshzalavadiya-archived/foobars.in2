const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const path = require("path");

const filters = require("./_11ty/filters");
const shortcodes = require("./_11ty/shortcodes");

module.exports = function (eleventyConfig) {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    let val = shortcodes[shortcodeName];
    let fn = val.isPaired ? "addPairedShortcode" : "addShortcode";
    eleventyConfig[fn](shortcodeName, val.fn);
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: (src) =>
      isAbsolutePath(src) ? src : path.join(__dirname, "../src/_includes", src),
  });

  // Collections
  const livePosts = (post) => post.date <= new Date() && !post.data.draft;
  eleventyConfig.addCollection("posts", (collection) => {
    return collection
      .getFilteredByGlob("**/posts/*.md")
      .filter(livePosts)
      .reverse();
  });

  eleventyConfig.addCollection("snippets", (collection) => {
    return collection.getFilteredByGlob("**/snippets/*.md").reverse();
  });

  // Transforms
  eleventyConfig.addTransform("htmlmin", filters.htmlmin);

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: "",
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  eleventyConfig
    .addPassthroughCopy({ "src/_includes/assets": "assets" })
    .addPassthroughCopy("src/manifest.json")
    .addPassthroughCopy("src/favicon.ico")
    .addPassthroughCopy("src/_redirects");

  return {
    templateFormats: ["njk", "md", "html", "11ty.js"],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "www",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};

function isAbsolutePath(src) {
  if (typeof src !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof src}\``);
  }

  if (/^[a-zA-Z]:\\/.test(src)) {
    return false;
  }

  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(src);
}
