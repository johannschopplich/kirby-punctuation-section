<template>
  <section class="k-info-section">
    <k-headline class="k-info-section-headline">
      {{ headline }}
    </k-headline>

    <k-box :theme="theme">
      <k-text class="k-text-punctuation">
        <div v-for="(category, index) in text" :key="index" class="space-x-1">
          <span class="k-text-punctuation-label">{{ category.label }}:</span>
          <div class="k-text-punctuation-group space-x-1">
            <button
              v-for="(char, charIndex) in category.chars"
              :key="charIndex"
              :class="[
                'k-button k-button-punctuation',
                {
                  'is-active':
                    char === activeChar && category.label === categoryIndex,
                },
              ]"
              type="button"
              @click="writeToClipboard(char, index)"
            >
              {{ char }}
            </button>
          </div>
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
      text: [],
      theme: null,
      activeChar: null,
      categoryIndex: null,
    };
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
          : i.label?.[this.$language?.code] ?? Object.values(i.label)[0],
    }));
  },

  methods: {
    async writeToClipboard(char, categoryIndex) {
      try {
        // The Clipboard API is only available to secure contexts, it cannot be used
        // from a content script running on `http:`-pages, only `https:`-pages.
        // Setting a browser flag can allow HTTP pages to be interpreted as secure.
        await navigator.clipboard.writeText(char);
      } catch (error) {
        console.error(
          `Failed writing "${char}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`
        );
        return;
      }

      this.activeChar = char;
      this.categoryIndex = categoryIndex;
      setTimeout(() => {
        this.activeChar = null;
        this.categoryIndex = null;
      }, 2000);
    },
  },
};
</script>

<style>
.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  margin-left: var(--spacing-1);
}

.k-text-punctuation-label {
  cursor: default;
  user-select: none;
}

.k-text-punctuation-group {
  display: inline-flex;
}

.k-button-punctuation {
  background-color: white;
  border-radius: var(--rounded);
  font-size: 1.25em;
  font-family: serif;
  padding: 0 var(--spacing-2);
  transition: none;
  touch-action: manipulation;
}

.k-button-punctuation.is-active {
  background-color: var(--color-green-400);
  color: white;
  z-index: 1;
}

.k-text-punctuation-group:hover
  .k-button-punctuation:not(.is-active):not(:hover) {
  background-color: var(--color-gray-200);
}
</style>
