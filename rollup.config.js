import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const config = {
  input: ["src/Form.ts", "src/helpers/utilities.ts"],
  output: {
    dir: "dist",
    format: "es",
  },
  external: ["lodash"],
  plugins: [
    typescript(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    getBabelOutputPlugin({
      presets: ["@babel/preset-env"],
    }),
  ],
};

export default config;
