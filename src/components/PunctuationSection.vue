<template>
  <section class="k-info-section">
    <k-headline class="k-info-section-headline">
      {{ headline }}
    </k-headline>

    <k-box :theme="theme">
      <k-text>
        <div
          v-for="(category, index) in text"
          :key="index"
          class="k-text-punctuation"
        >
          <span>{{ category.label }}:</span>
          <button
            v-for="(char, charIndex) in category.chars"
            :key="charIndex"
            class="k-button k-button-punctuation"
            type="button"
            @click="writeToClipboard(char)"
          >
            {{ char }}
          </button>
        </div>
      </k-text>
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

  computed: {
    currentLanguage() {
      // `this.$language` is only available in Kirby 3.6+
      return this.$store.state?.languages?.current ?? this?.$language;
    },
  },

  async created() {
    const response = await this.load();
    this.headline = response.headline;
    this.theme = response.theme || "none";
    this.text = this.fieldsets.map((i) => ({
      ...i,
      label:
        typeof i.label === "string"
          ? i.label
          : i.label?.[this.currentLanguage?.code] ?? Object.values(i.label)[0],
    }));
  },

  methods: {
    async writeToClipboard(char) {
      try {
        // The Clipboard API is only available to secure contexts, it cannot be used
        // from a content script running on `http:`-pages, only `https:`-pages.
        // Setting a browser flag can allow HTTP pages to be interpreted as secure.
        await navigator.clipboard.writeText(char);
      } catch (error) {
        console.error(
          `Failed writing "${char}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`
        );
      }
    },
  },
};
</script>

<style>
.k-text-punctuation > *:not(:last-child) {
  margin-right: var(--spacing-1, 0.25rem);
}

.k-button-punctuation {
  background-color: var(--color-gray-300, #ddd);
  border-radius: var(--rounded-sm, 0.125rem);
  font-size: 1.25em;
  font-family: serif;
  padding: 0 var(--spacing-2, 0.5rem);
  transition: none;
  touch-action: manipulation;
}

.k-button-punctuation:hover,
.k-button-punctuation:focus {
  background-color: var(--color-focus);
  color: white;
  z-index: 1;
}

.k-button-punctuation:not(:active):hover {
  transform: scale(1.25);
}
</style>
