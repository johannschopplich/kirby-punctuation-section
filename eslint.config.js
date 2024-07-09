import antfu from "@antfu/eslint-config";

export default await antfu(
  {
    stylistic: false,
    vue: {
      // https://github.com/antfu/eslint-config/issues/367
      sfcBlocks: {
        blocks: {
          styles: false,
        },
      },
      vueVersion: 2,
    },
    ignores: ["**/assets/**", "**/vendor/**", "index.js"],
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/html-self-closing": "off",
      "vue/html-indent": "off",
    },
  },
);
