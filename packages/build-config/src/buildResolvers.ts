import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

const buildResolvers = ({ paths }: BuildOptions): Configuration["resolve"] => {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      // use absolute path while doing import @/src/...
      "@": paths.src
    }
  }
}

export default buildResolvers;