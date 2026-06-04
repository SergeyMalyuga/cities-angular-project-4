/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard-scss"],
  rules: {
    "no-duplicate-selectors": [
      true,
      {
        message: "Обнаружены дублирующиеся селекторы",
      },
    ],
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?(__[a-z0-9-]+)?(_--[a-z0-9-]+)?$",
      {
        message: "Expected class selector to be kebab-case or BEM notation",
      },
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "use",
          "forward",
          "mixin",
          "include",
          "function",
          "return",
        ],
      },
    ],
  },
};
