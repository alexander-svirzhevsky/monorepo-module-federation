import webpack from "webpack";
import path from 'path';
import { buildWebpack } from "@packages/build-config";
import { BuildMode, BuildPaths } from "@packages/build-config";
import packageJson from "./package.json"

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
  LOGIN_REMOTE_URL?: string;
  ABOUT_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src")
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? "development",
    paths: paths,
    analyzer: env.analyzer ?? false
  })

  const LOGIN_REMOTE_URL = env.LOGIN_REMOTE_URL ?? "http://localhost:3001"
  const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? "http://localhost:3002"

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: "home",
    filename: "remoteEntry.js",
    remotes: {
      login: `login@${LOGIN_REMOTE_URL}/remoteEntry.js`,
      about: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`
    },
    shared: {
      ...packageJson.dependencies
    }
  }))

  return config;
};