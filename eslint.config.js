import antfu from "@antfu/eslint-config";

export default await antfu(
  {
    stylistic: false,
    vue: {
      vueVersion: 2,
    },
    ignores: ["**/vendor/**", "index.js"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-indent": "off",
    },
  },
);
