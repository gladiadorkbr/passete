import createMDX from "@next/mdx"

import { env } from "~/lib/env"

import type { NextConfig } from "next"

const config: NextConfig = {
  transpilePackages: ["lucide-react"],
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: { mdxRs: true },
  async rewrites() {
    return [
      {
        source: "/api/bridge/:endpoint*",
        destination: `${env.BRIDGE_DOMAIN}/:endpoint*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        // discord server
        source: "/redirect/discord",
        destination: "https://discord.com/invite/mZjRBKS29X",
        permanent: false,
      },
      {
        // dashboard oauth
        source: "/redirect/oauth",
        destination: `https://discord.com/api/oauth2/authorize?client_id=${env.DISCORD_ID}&response_type=code&scope=identify&redirect_uri=${env.BASE_URL}/dashboard/guilds`,
        permanent: false,
      },
      {
        // bot invite
        source: "/redirect/invite",
        destination: `https://discord.com/oauth2/authorize?client_id=${env.DISCORD_ID}&response_type=code&scope=bot%20applications.commands&permissions=17666911472`,
        permanent: false,
      },
      {
        // old donation redirect
        source: "/redirect/donate",
        destination: `${env.BASE_URL}/redirect/buymeacoffee`,
        permanent: false,
      },
      {
        // donation page 1
        source: "/redirect/buymeacoffee",
        destination: "https://www.buymeacoffee.com/notcharliee",
        permanent: false,
      },
      {
        // donation page 2
        source: "/redirect/ko-fi",
        destination: "https://ko-fi.com/mikaelareid",
        permanent: false,
      },
      {
        // developer page
        source: "/redirect/developer",
        destination: "https://github.com/mikaeladev",
        permanent: false,
      },
      {
        // github repo
        source: "/redirect/github",
        destination: "https://github.com/mikaeladev/phase",
        permanent: false,
      },
      {
        // terms page
        source: "/terms",
        destination: "/docs/terms",
        permanent: true,
      },
      {
        // privacy page
        source: "/privacy",
        destination: "/docs/privacy",
        permanent: true,
      },
      {
        // dashboard page
        source: "/dashboard",
        destination: "/dashboard/guilds",
        permanent: false,
      },
      {
        // dashboard page
        source: "/dashboard/modules",
        destination: "/dashboard/guilds",
        permanent: false,
      },
    ]
  },
}

const withMDX = createMDX()

export default withMDX(config)
