import PunctuationSection from "./components/PunctuationSection.vue";
import "./index.css";

window.panel.plugin("johannschopplich/punctuation-section", {
  sections: {
    punctuation: PunctuationSection,
  },
});
