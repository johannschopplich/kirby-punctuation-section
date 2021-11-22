<template>
  <section class="k-info-section">
    <k-headline class="k-info-section-headline">
      {{ headline }}
    </k-headline>

    <k-box :theme="theme" @click="handleClick">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <k-text v-html="text" />
    </k-box>
  </section>
</template>

<script>
import SectionMixin from "~/mixins/section.js";

export default {
  mixins: [SectionMixin],

  props: {
    fieldsets: Object,
  },

  data() {
    return {
      headline: null,
      text: null,
      theme: null,
    };
  },

  async created() {
    const response = await this.load();
    this.headline = response.headline;
    this.theme = response.theme || "none";
    this.text = this.fieldsets
      .map(
        ({ category, chars }) =>
          `${category}: ${chars
            .map(
              (i) =>
                `<button class="k-button-character" type="button">${i}</button>`
            )
            .join(" ")}`
      )
      .join("<br>");
  },

  methods: {
    async handleClick({ target }) {
      if (!target.matches("button")) return;

      try {
        // The Clipboard API is only available to secure contexts, it cannot be used
        // from a content script running on `http:`-pages, only `https:`-pages.
        // Setting a browser flag can allow HTTP pages to be interpreted as secure.
        await navigator.clipboard.writeText(target.textContent);
      } catch (error) {
        console.error(
          `Failed writing "${target.textContent}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`
        );
      }
    },
  },
};
</script>

<style>
.k-button-character {
  background-color: var(--color-gray-300, #ddd);
  border-radius: var(--rounded-sm, 0.125rem);
  font-size: 1.25em;
  font-family: serif;
  padding: 0 var(--spacing-2, 0.5rem);
  touch-action: manipulation;
}

.k-button-character:hover,
.k-button-character:focus {
  background-color: var(--color-focus);
  color: white;
}

.k-button-character:not(:active):hover {
  transform: scale(1.25);
}
</style>
