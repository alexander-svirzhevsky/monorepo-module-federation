import path from 'path';
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { BuildOptions } from './types/types';

const buildPlugins = ({ mode, paths, analyzer }: BuildOptions): Configuration['plugins'] => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const plugins: Configuration['plugins'] = [new HtmlWebpackPlugin({
    template: paths.html,
    publicPath: "/"
  })]

  if (isDev) {
    // to refresh page while adding new code without reloading (keep state) HMR
    plugins.push(new ReactRefreshWebpackPlugin())
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "styles/[id].[contenthash].css",
    }))
    // package helps us to find ts errors after bundle (makes bundle process faster)
    // plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if (analyzer) {
    // to analize our bundle size in terms of memory
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins;
}

export default buildPlugins;