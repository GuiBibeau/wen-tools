export default {
  projectLink: "https://github.com/shuding/nextra", // GitHub link in the navbar
  docsRepositoryBase: "https://github.com/shuding/nextra/blob/master", // base URL for the docs repository
  titleSuffix: " – Nextra",
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Gui Bibeau.`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <>
      <span>Wen Tools</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Wen Connect: The easiest way to build Dapps"
      />
      <meta
        name="og:title"
        content="Wen Connect: The easiest way to build Dapps"
      />
    </>
  ),
};
