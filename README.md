![Kirby Punctuation Section](./.github/kirby-punctuation-section.png)

# Kirby Punctuation Section

This plugin provides a simple, **customizable** section for your Kirby project from which your clients can quickly paste punctuation characters into their text or writer fields.

Label translations are supported as well. See [usage](#usage) below.

## Requirements

> [!INFO]
> The current version of this plugin requires Kirby 4 or higher. For Kirby 3 support, please use version 2 of Kirby Punctuation Section.

## Installation

### Composer

```bash
composer require johannschopplich/kirby-punctuation-section
```

### Download

Download and copy this repository to `/site/plugins/kirby-punctuation-section`.

### Git Submodule

```bash
git submodule add https://github.com/johannschopplich/kirby-punctuation-section.git site/plugins/kirby-punctuation-section
```

## Usage

Create a `sections/punctuation.yml` in your blueprints folder and add characters you want to provide for clipboard copying.

A bare minimum section example:

```yaml
type: punctuation
label: Lil Punctuation Helper
fieldsets:
  - category:
    label: German Quotation Marks
    chars:
      - "„"
      - "‚"
      - "‘"
      - "“"
    help: This is a description for the category
```

Now, you're already good to go! Of course, you probably want to adapt the characters to your needs.

Include the freshly created section anywhere in your pages blueprints:

```yml
sections:
  punctuation: sections/punctuation
```

> ℹ️ This Panel plugin uses the Clipboard API to write the character to the clipboard. It is only available to secure contexts, it cannot be used on `http:`-pages, only `https:`-pages.
>
> Setting a browser flag can allow HTTP pages to be interpreted as secure, which might help you for local development.

## Label Translations

Take a look at the section blueprint below for a full fledged example, including **label translations**:

```yaml
type: punctuation
label:
  de: Kleine Interpunktionshilfe
  en: Lil Punctuation Helper
fieldsets:
  - category:
    label:
      de: Apostroph
      en: Apostrophe
    chars:
      - "’"
    help:
      de: Das ist eine Beschreibung der Kategorie
      en: This is a description for the category
  - category:
    label:
      de: Gedankenstrich
      en: Hyphen
    chars:
      - "–"
  - category:
    label:
      de: Dt. Anführungszeichen
      en: German Quotation Marks
    chars:
      - "„"
      - "‚"
      - "‘"
      - "“"
  - category:
    label:
      de: Engl. Anführungszeichen
      en: English Quotation Marks
    chars:
      - "“"
      - "‘"
      - "’"
      - "”"
  - category:
    label: Guillemets
    chars:
      - "»"
      - "›"
      - "‹"
      - "«"
  - category:
    label:
      de: Sonstiges
      en: Other
    chars:
      - "…"
      - "×"
```

## License

[MIT](./LICENSE) License © 2021-PRESENT [Johann Schopplich](https://github.com/johannschopplich)
