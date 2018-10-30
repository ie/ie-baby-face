const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Baby | Face',
    description: 'IE Baby Face Competition'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src/images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'src', 'data'),
        name: 'data',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'baby-face',
        short_name: 'starter',
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'minimal-ui'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
  ],
}
