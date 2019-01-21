module.exports = {
  siteMetadata: {
    title: `Piano triennale ICT 2019-2021 - Guida dinamica`,
    description: `Piano triennale ICT 2019-2021 - Guida dinamica`,
    author: `AGID`
  },
  pathPrefix: '/pt-guida-dinamica',
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-plugin-stylelint`,
      options: { files: [`**/*.scss`] }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // Relative to the root of the site.
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
      },
    },
    // this (optional) plugin enables PWA + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
