# Custom Slide Generator

**custom-slide-generator** is a deterministic Agent Skill and CLI engine for generating clean, minimalist, human-tailored PowerPoint (`.pptx`) presentations. It prioritizes generous negative space, strict typographic hierarchy, warm 2D vector stickers, and predictive geometry that mathematically eliminates title/text overlap.

It follows the open Agent Skills format and is designed to work with any compatible AI agent (Claude, Codex, Antigravity, Gemini, Grok, OpenCode, OpenMausBot), rather than being tied to a single platform.

---

## What it guides

* **Fixed High-Res Canvas**: High-definition widescreen proportion (`20.0" x 11.25"`), providing modern 16:9 presentations with expansive breathing room.
* **Warm Cream Background**: A single solid background fill across all slides: Ivory/Cream `#FFFBF4` (`RGB 255, 251, 244`). Never pure cold white (`#FFFFFF`) or harsh dark themes.
* **Strict Typographic Hierarchy**:
  * Slide Titles: `Open Sauce Bold` (or `DM Sans Bold`), 60pt to 64pt, rendered in soft charcoal `#222223`.
  * Body Text: `Open Sans` (or `DM Sans`), 30pt to 32pt, in solid black `#000000`.
  * Metadata & Dates: `DM Sans`, 18pt to 32pt, in muted charcoal `#343434`.
* **Strategic Keyword Bolding**: Exactly 1 to 2 key phrases per paragraph are highlighted in **bold** to guide audience scannability without visual clutter.
* **Predictive Anti-Overlap Layout**: Title boxes are not given static heights. The engine dynamically calculates the actual line-wrapped height based on font metrics (`char_width = (pt * 0.58) / 72.0`, `line_height = (pt * 1.25) / 72.0`) and starts the body at `body_start_y = title_start_y + title_height + 0.60"`, mathematically guaranteeing that titles and body text never collide.
* **2D Vector Sticker Aesthetic**: Strictly excludes hyper-realistic AI renders, shiny 3D glossy shapes, and stock photos. Uses clean 2D flat vector stickers with warm color accents (forest green `#0D6B47`, warm mustard `#E3A609`, terracotta `#DA7155`) anchored on the right flank (`X = 14.2", Y = 3.6", 4.8" x 4.8"`).
* **Two Distinct Archetypes**:
  * *Cover Slide*: Left-aligned uppercase category tag, dominant headline, presenter metadata block, and thematic right sticker.
  * *Content Slide*: Upper-right fixed date tag, wrapped title, 2 to 3 balanced content paragraphs, right-flank sticker, and dedicated presenter notes.
* **Instant Dual Delivery**: Compiles directly to PowerPoint and automatically saves a mirror copy in `~/Downloads` for instant review.

---

## Install

### Global Multi-Agent Skill Installation

Install the skill across all AI agents on your machine in a single command:

```bash
npx custom-slide-generator
```
*(or via GitHub before npm replication)*:
```bash
npx github:joaofr-tech/custom-slide-generator
```

The installer detects your local system environments and automatically registers `SKILL.md` into:
* **Claude Desktop & Claude Code** (`~/.claude/skills/custom-presentation-template`)
* **Universal Agents Standard** (`~/.agents/skills/custom-presentation-template`)
* **OpenAI Codex** (`~/.codex/skills/custom-presentation-template`)
* **OpenCode** (`~/.opencode/skills/custom-presentation-template`)
* **Gemini CLI** (`~/.gemini/skills/custom-presentation-template`)
* **Grok CLI** (`~/.grok/skills/custom-presentation-template`)
* **Continue.dev** (`~/.continue/skills/custom-presentation-template`)
* **Antigravity AI** (`~/.openmausbot/providers/antigravity/.../skills/`)
* **OpenMausBot** (`~/.openmausbot/imported-skills/`)

Once installed, your AI assistants will natively understand the template rules and generate slides in this exact visual standard on the first pass.

---

## Agent compatibility

Supported agents include **Claude Desktop**, **Claude Code**, **OpenAI Codex**, **OpenCode**, **Gemini CLI**, **Grok CLI**, **Continue.dev**, **Antigravity AI**, **OpenMausBot**, **Cursor**, and **Windsurf**. 

When asking your agent to produce slides, reference the skill:

> *"Crie uma apresentação de 5 slides sobre a Revolução Industrial seguindo a skill custom-presentation-template."*

The agent will structure the narrative, apply keyword bolding, calculate layout slots, and either output the presentation directly or invoke the built-in CLI engine.

---

## CLI Compilation Engine

You can also use `custom-slide-generator` directly as a standalone CLI compiler powered by `pptxgenjs`:

### 1. Initialize a starter template
```bash
npx custom-slide-generator --init
```
Creates `template-slide-input.json` in the current directory with sample cover and content slide structures.

### 2. Compile into PowerPoint (.pptx)
```bash
npx custom-slide-generator meu-roteiro.json -o MinhaApresentacao.pptx
```
The file is compiled and immediately copied to your `~/Downloads` folder.

---

## Repository structure

```text
custom-slide-generator/
├── SKILL.md                          # The core Agent Skill instruction document
├── bin/
│   └── cli.js                        # Executable CLI and automatic skill installer
├── lib/
│   ├── generator.js                  # pptxgenjs layout engine with anti-overlap math
│   └── installer.js                  # Multi-agent environment installer
├── examples/
│   └── migracao_humana.json          # Production reference presentation JSON
├── package.json
├── LICENSE
└── README.md
```

---

## Deterministic behavior

Unlike open-ended presentation templates that suffer from inconsistent font sizes, overlapping titles, or unpredictable image styles, **custom-slide-generator** enforces strict layout boundaries:

1. Margins are fixed (`X = 1.12"` left margin).
2. Spacing is calculated mathematically rather than guessed.
3. Illustrations are constrained to flat vector stickers on `#FFFBF4` backgrounds.
4. Presentations look consistent and ready for executive or educational delivery on the very first render.

---

## License

[MIT](LICENSE) © [joaofr-tech](https://github.com/joaofr-tech)
