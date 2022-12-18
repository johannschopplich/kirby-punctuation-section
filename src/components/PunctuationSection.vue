<template>
  <section class="k-info-section">
    <k-headline class="k-info-section-headline">
      {{ headline }}
    </k-headline>

    <k-box :theme="theme">
      <k-text class="k-text-punctuation space-y-1">
        <k-grid v-for="(category, index) in text" :key="index">
          <k-column
            :width="category.help ? '1/2' : '1/1'"
            class="k-column-punctuation"
          >
            <span class="k-text-punctuation-label">{{ category.label }}:</span>
            <div class="k-text-punctuation-group space-x-1">
              <button
                v-for="(char, charIndex) in category.chars"
                :key="charIndex"
                :class="[
                  'k-button k-button-punctuation',
                  {
                    'is-active': index === categoryIndex && char === activeChar,
                  },
                ]"
                type="button"
                @click="writeToClipboard(char, index)"
              >
                {{ char }}
              </button>
            </div>
          </k-column>

          <k-column v-if="category.help" :width="category.help ? '1/2' : '1/1'">
            <k-text :html="category.help" class="k-text-punctuation-help" />
          </k-column>
        </k-grid>
      </k-text>
    </k-box>
  </section>
</template>

<script>
import SectionMixin from "~/mixins/section.js";

export default {
  mixins: [SectionMixin],

  props: {
    fieldsets: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      label: null,
      text: [],
      theme: null,
      activeChar: null,
      categoryIndex: null,
    };
  },

  async created() {
    const response = await this.load();
    this.label = response.label || response.headline;
    this.theme = response.theme || "none";
    this.text = this.fieldsets.map((i) => ({
      ...i,
      label: this.t(i.label),
      help: i.help ? this.t(i.help) : false,
    }));
  },

  methods: {
    t(value) {
      return typeof value === "string"
        ? value
        : value?.[this.$language?.code] ?? Object.values(value)[0];
    },

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

.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  margin-top: var(--spacing-1);
}

.k-column-punctuation {
  display: flex;
  align-items: center;
}

.k-text-punctuation-label {
  cursor: default;
  user-select: none;
  padding-right: 1ch;
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
  box-shadow: var(--shadow);
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
  box-shadow: none;
}

.k-text-punctuation-help {
  color: var(--color-gray-600);
}

.k-text-punctuation > .k-grid:not(:last-child) .k-text-punctuation-help {
  padding-bottom: var(--spacing-1);
}

@media screen and (min-width: 65em) {
  .k-text-punctuation > .k-grid:not(:last-child) .k-text-punctuation-help {
    padding-bottom: 0;
  }
}
</style>
