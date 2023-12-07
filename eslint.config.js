import antfu from "@antfu/eslint-config";

export default await antfu({
  stylistic: false,
  unocss: true,
  ignores: ["**/vendor/**", "index.js"],
});
