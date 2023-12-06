import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

const buildDevServer = ({ port }: BuildOptions): DevServerConfiguration => {
  return {
    port: port ?? 3000,
    open: true,
    // cause we use router wich uses historyApi
    historyApiFallback: true,
    // hot module replacement
    hot: true
  }
}

export default buildDevServer;