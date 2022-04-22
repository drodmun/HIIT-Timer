import type { GatsbyConfig } from "gatsby";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const gatsbyRequiredRules = path.join(process.cwd(), "node_modules", "gatsby", "dist", "utils", "eslint-rules");

// console.log('#################################################', path.resolve(process.cwd(), 'src/components'));
const config: GatsbyConfig = {
  jsxRuntime: "automatic",
  siteMetadata: {
    title: `HIIT Timer`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-material-ui",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
    }
  ]
};

export default config;
