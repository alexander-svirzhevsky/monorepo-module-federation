import webpack from "webpack";
import path from 'path';
import { buildWebpack } from "@packages/build-config";
import { BuildMode, BuildPaths } from "@packages/build-config";
import packageJson from "./package.json"

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src")
  }

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? "development",
    paths: paths,
    analyzer: env.analyzer ?? false
  })

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: "about",
    filename: "remoteEntry.js",
    exposes: {
      "./Router": "./src/router/Router.tsx"
    },
    shared: {
      ...packageJson.dependencies,
    }
  }))

  return config;
};