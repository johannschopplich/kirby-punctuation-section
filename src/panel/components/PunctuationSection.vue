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
      clipboard: false,
      activeChar: null,
      categoryIndex: null,
      lastFocusedElement: null,
      lastSelection: null,
    };
  },

  watch: {
    lastFocusedElement(value) {
      console.log(value);
    },
  },

  async created() {
    document.addEventListener("focus", this.trackEditableFocus, {
      capture: true,
    });
    document.addEventListener("blur", this.trackEditableFocus, {
      capture: true,
    });

    const response = await this.load();
    this.label = response.label;
    this.theme = response.theme || "none";
    this.clipboard = response.clipboard || false;
    this.text = this.fieldsets.map((i) => ({
      ...i,
      label: this.t(i.label),
      help: i.help ? this.t(i.help) : false,
    }));
  },

  beforeDestroy() {
    document.removeEventListener("focus", this.trackEditableFocus, {
      capture: true,
    });
    document.removeEventListener("blur", this.trackEditableFocus, {
      capture: true,
    });
  },

  methods: {
    t(value) {
      return typeof value === "string"
        ? value
        : value?.[this.$language?.code] ?? Object.values(value)[0];
    },

    trackEditableFocus(event) {
      const element = event.target;

      if (element.isContentEditable) {
        this.lastFocusedElement = element;
        this.lastSelection = window.getSelection().getRangeAt(0).cloneRange();
      } else if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA"
      ) {
        this.lastFocusedElement = element;
        this.lastSelection = {
          start: event.target.selectionStart,
          end: event.target.selectionEnd,
        };
      }
    },

    async writeToClipboard(char, categoryIndex) {
      this.activeChar = char;
      this.categoryIndex = categoryIndex;
      setTimeout(() => {
        this.activeChar = null;
        this.categoryIndex = null;
      }, 2000);

      if (this.clipboard) {
        try {
          // The Clipboard API is only available to secure contexts, it cannot be used
          // from a content script running on `http:`-pages, only `https:`-pages.
          // Setting a browser flag can allow HTTP pages to be interpreted as secure.
          await navigator.clipboard.writeText(char);
        } catch (error) {
          const message = `Failed writing "${char}" to clipboard. The Clipboard API is only available to secure contexts (HTTPS).`;
          console.error(message);
          this.$store.dispatch("notification/error", message);
        }
      } else if (this.lastFocusedElement) {
        if (this.lastFocusedElement.isContentEditable) {
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(this.lastSelection);

          const range = selection.getRangeAt(0);
          const textNode = document.createTextNode(char);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
        } else if (
          this.lastFocusedElement.tagName === "INPUT" ||
          this.lastFocusedElement.tagName === "TEXTAREA"
        ) {
          const start = this.lastFocusedElement.selectionStart;
          const end = this.lastFocusedElement.selectionEnd;

          this.lastFocusedElement.value =
            this.lastFocusedElement.value.substring(0, start) +
            char +
            this.lastFocusedElement.value.substring(end);

          // Set caret position after the inserted character
          this.lastFocusedElement.selectionStart =
            this.lastFocusedElement.selectionEnd = start + char.length;

          // Restore focus position
          this.lastFocusedElement.focus();
        }
      }
    },
  },
};
</script>

<template>
  <k-section :headline="label">
    <k-box :theme="theme">
      <div class="space-y-2">
        <div v-for="(category, index) in text" :key="index">
          <div class="flex items-center gap-2">
            <span>{{ category.label }}:</span>
            <div class="flex items-center gap-1">
              <k-button
                v-for="(char, charIndex) in category.chars"
                :key="charIndex"
                variant="filled"
                size="xs"
                :class="[
                  index === categoryIndex &&
                    char === activeChar &&
                    'outline outline-2 outline-[var(--color-focus)]',
                ]"
                @click="writeToClipboard(char, index)"
              >
                {{ char }}
              </k-button>
            </div>
          </div>

          <k-text
            v-if="category.help"
            :html="category.help"
            class="text-[var(--color-text-dimmed)]"
          />
        </div>
      </div>
    </k-box>
  </k-section>
</template>
