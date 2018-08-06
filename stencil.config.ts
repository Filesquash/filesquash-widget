import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "filesquash",
  outputTargets: [{ type: "dist" }, { type: "www" }],
  plugins: [sass()],
  globalScript: "src/global/index.ts"
};
