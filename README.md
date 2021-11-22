# Kirby Punctuation Section

This plugin provides a simple, **configurable** section for your Kirby project from which your clients can quickly copy commonly used characters to the clipboard.

![Preview of Kirby punctuation section plugin](./.github/kirby-punctuation-section-preview.gif)

## Requirements

- Kirby 3.6+

## Installation

### Download

Download and copy this repository to `/site/plugins/kirby-punctuation-section`.

### Git Submodule

```bash
git submodule add https://github.com/johannschopplich/kirby-punctuation-section.git site/plugins/kirby-punctuation-section
```

### Composer

```bash
composer require johannschopplich/kirby-punctuation-section
```

## Usage

Create a `section/punctuation-helper.yml` in your blueprints folder and paste the following example:

```yaml
type: punctuation
headline:
  de: Kleine Interpunktionshilfe
  en: Lil Punctuation Helper
fieldsets:
  - category: Apostroph
    chars:
      - "’"
  - category: Gedankenstrich
    chars:
      - "–"
  - category: Dt. Anführungszeichen
    chars:
      - "„"
      - "‚"
      - "‘"
      - "“"
  - category: Engl. Anführungszeichen
    chars:
      - "“"
      - "‘"
      - "’"
      - "”"
  - category: Guillemets
    chars:
      - "»"
      - "›"
      - "‹"
      - "«"
  - category: Sonstiges
    chars:
      - "…"
      - "×"
```

Now, you're already good to go! Of course, you probably want to adapt the characters to your needs.

Include the freshly created section anywhere in your pages blueprints:

```yml
sections:
  punctuation: sections/punctuation-helper
```

## License

[MIT](./LICENSE) License © 2021 [Johann Schopplich](https://github.com/johannschopplich)
