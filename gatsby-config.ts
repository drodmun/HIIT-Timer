/* eslint-disable @typescript-eslint/no-var-requires */
import type { GatsbyConfig } from "gatsby";

const path = require("path");

const gatsbyRequiredRules = path.join(process.cwd(), "node_modules", "gatsby", "dist", "utils", "eslint-rules");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

// console.log('#################################################', path.resolve(process.cwd(), 'src/components'));
const config: GatsbyConfig = {
  jsxRuntime: "automatic",
  siteMetadata: {
    title: `HIIT Timer`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-theme-material-ui",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@src": path.resolve(process.cwd(), "src"),
          "@components": path.resolve(process.cwd(), "src/components"),
          "@config": path.resolve(process.cwd(), "src/config"),
          "@pages": path.resolve(process.cwd(), "src/pages")
        }
      }
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be omitted or customized
        stages: ["develop"],
        extensions: ["ts", "tsx"],
        exclude: ["node_modules", "bower_components", ".cache", "public"]
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GA_TRACKING_ID // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID" // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"]
          // Defaults to https://www.googletagmanager.com
          // origin: "https://drodmun-hiit-timer.netlify.app"
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "HIIT Timer",
        short_name: "HIIT Timer",
        start_url: "/",
        background_color: "#cb18ac",
        theme_color: "#4fc2f7",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "public/static/assets/images/android-chrome-512x512.png", // This path is relative to the root of the site.
        include_favicon: true
      }
    }
  ]
};

console.log(path.resolve(process.cwd(), "public/static/assets/images/android-chrome-512x512.png"));
export default config;
