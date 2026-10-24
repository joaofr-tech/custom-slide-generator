# Custom Slide Generator & Universal Agent Skill 🎨📊

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16.0.0-green.svg)](https://nodejs.org/)
[![Multi-Agent](https://img.shields.io/badge/Multi--Agent-Claude%20%7C%20Antigravity%20%7C%20Codex%20%7C%20Grok-blue)](https://github.com/joaofr-tech/custom-slide-generator)

> **CLI + Skill Multi-Agente** para gerar apresentações PowerPoint (.pptx) com design determinístico profissional, proporção Widescreen expandida (`20.0" x 11.25"`), fundo creme marfim (`#FFFBF4`), tipografia moderna com negritos estratégicos e stickers vetoriais 2D minimalistas.

---

## ⚡ Instalação Universal da Skill (Claude, Codex, Antigravity, etc.)

Para instalar a skill em **todos os assistentes e agentes de IA** do seu computador:

```bash
npx custom-slide-generator
# ou
npx custom-slide-generator install
```

O instalador detecta e registra a skill automaticamente em:
- **Claude Desktop & Claude Code** (`~/.claude/skills`)
- **Universal Agents Protocol** (`~/.agents/skills`)
- **OpenAI Codex** (`~/.codex/skills`)
- **OpenCode** (`~/.opencode/skills`)
- **Gemini CLI** (`~/.gemini/skills`)
- **Grok CLI** (`~/.grok/skills`)
- **Continue.dev** (`~/.continue/skills`)
- **Antigravity AI**
- **OpenMausBot**

A partir desse momento, qualquer uma dessas IAs já saberá como estruturar e gerar apresentações seguindo o template!

---

## 🚀 Como Compilar Apresentações

### 1. Criar um modelo de exemplo
```bash
npx custom-slide-generator --init
```
Gera o arquivo `template-slide-input.json`.

### 2. Gerar o PowerPoint (.pptx)
```bash
npx custom-slide-generator meu-roteiro.json -o Apresentacao.pptx
```
*(O arquivo gerado é salvo no diretório atual e uma cópia é automaticamente enviada para a pasta `Downloads`).*

---

## 📐 Especificações Visuais do Template

| Elemento | Padrão Determinístico |
| :--- | :--- |
| **Dimensões do Slide** | Widescreen expandido `20.0" x 11.25"` (16:9 de alta resolução) |
| **Cor de Fundo** | Marfim / Creme sólido: `#FFFBF4` (RGB 255, 251, 244) |
| **Títulos** | `Open Sauce Bold` (60pt - 64pt), cor `#222223` |
| **Corpo do Texto** | `Open Sans` (30pt - 32pt), cor `#000000` |
| **Negritos** | Destacar estrategicamente 1 a 2 conceitos-chave por parágrafo |
| **Prevenção de Sobreposição** | Cálculo dinâmico preditivo da altura do título com quebras de linha reais |
| **Ilustrações** | Exclusivamente stickers vetoriais 2D planos (`X: 14.2", Y: 3.6", 4.8" x 4.8"`). Sem renders 3D nem fotos reais. |

---

## 📦 Publicação no NPM

Para publicar sob a sua conta no registro público do npm:
```bash
npm login
npm publish --access public
```

---

## 📄 Licença
Distribuído sob a licença [MIT](LICENSE).
