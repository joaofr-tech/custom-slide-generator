const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_MD_CONTENT = `---
name: custom-presentation-template
description: Gera apresentações PowerPoint (.pptx) seguindo estritamente o padrão visual determinístico do usuário (fundo #FFFBF4, proporção widescreen expandida 20x11.25 polegadas, tipografia Open Sauce Bold / Open Sans, ilustrações vetoriais estilo sticker 2D e cálculo preditivo de altura para evitar sobreposição de títulos e textos). Suporta execução via Node.js CLI (npx custom-slide-generator) e Python.
---

# Padrão Determinístico de Apresentações (Template Minimalista com Stickers)

Use sempre este padrão quando o usuário solicitar a criação, formatação ou transformação de textos em apresentações PowerPoint (.pptx).

## 1. Grid e Proporções Fundamentais
- **Dimensões do Slide:** 20.0 x 11.25 polegadas (Widescreen 16:9 de alta resolução).
- **Fundo:** Retângulo cobrindo todo o slide com preenchimento sólido cor de marfim/creme: RGB(255, 251, 244) (\`#FFFBF4\`).
- **Margem Esquerda Fixa:** \`X = 1.12 polegadas\` para todos os títulos e caixas de texto.
- **Data/Metadado Fixo:** Canto superior direito em todos os slides: \`X = 16.03", Y = 0.83", W = 2.84", H = 0.40"\` com alinhamento à direita, fonte \`DM Sans\`, 18pt, cor \`#343434\`.

## 2. Tipografia e Paleta de Cores
- **Títulos Principais:** \`Open Sauce Bold\` (ou \`DM Sans Bold / Montserrat\`), 60pt a 64pt, cor \`#222223\` (RGB 34, 34, 35).
- **Corpo de Texto:** \`Open Sans\` (ou \`DM Sans\`), 30pt a 32pt, cor \`#000000\`.
  - **Negrito Estratégico:** Destacar 1 a 2 termos-chave por parágrafo em negrito para escaneabilidade imediata.
- **Metadados / Subtítulos:** \`DM Sans\`, 28pt a 32pt, cor \`#343434\`.

## 3. Regra Inviolável de Layout: Prevenção de Sobreposição
Nunca use posições Y estáticas para o corpo do texto abaixo do título.
O título começa em \`Y = 1.80 polegadas\` com largura \`12.5 polegadas\`.
1. **Calcular a altura real do título:**
   - \`char_width = (font_size_pt * 0.58) / 72.0\`
   - \`chars_per_line = int(12.5 / char_width)\`
   - Contar as quebras de linha reais do título: \`line_height = (font_size_pt * 1.25) / 72.0\`.
2. **Definir o início do corpo:**
   - \`body_start_y = title_start_y + title_height + 0.60 polegadas\` de respiro.
3. **Distribuir os parágrafos:**
   - O corpo deve conter de 2 a 3 parágrafos objetivos, distribuídos uniformemente no espaço vertical restante.

## 4. Ilustrações (Estilo Sticker / Vetorial Plano)
- **O que NUNCA usar:** Fotos reais de pessoas/equipamentos e renders 3D hiper-realistas com gradientes complexos.
- **O que SEMPRE usar:** Ícones e ilustrações 2D planas (*flat vector sticker*), com contornos limpos e borda sutil, paleta quente (verde floresta \`#0D6B47\`, mostarda \`#E3A609\`, terracota \`#DA7155\`, creme).
- **Posição:** Coluna direita (\`X = 14.2 polegadas, Y = 3.6 polegadas\`, dimensões aproximadas \`4.8 x 4.8 polegadas\`), garantindo respiro e espaço negativo amplo.

## 5. Ferramentas e Execução (Node.js CLI & Python)

### Opção A: Executar via Node.js CLI / NPX (Recomendado)
\`\`\`bash
# Compilar apresentação a partir de um JSON estruturado:
npx custom-slide-generator dados_apresentacao.json -o Apresentacao.pptx

# Ou se instalado globalmente:
custom-slide-generator dados_apresentacao.json -o Apresentacao.pptx
\`\`\`
Para criar um arquivo modelo de exemplo:
\`\`\`bash
npx custom-slide-generator --init
\`\`\`

### Opção B: Executar via Python (python-pptx)
\`\`\`bash
python scripts/generate_templated_slide.py dados_apresentacao.json Apresentacao.pptx
\`\`\`
`;

function installSkill() {
  const home = os.homedir();
  console.log('\n======================================================');
  console.log('   Instalador Universal de Skill Multi-Agente          ');
  console.log('   (Claude, Antigravity, OpenMaus, Codex, Grok, etc.) ');
  console.log('======================================================\n');

  const targets = [
    // 1. Claude Desktop & Claude Code
    { name: 'Claude Desktop / Claude Code', dir: path.join(home, '.claude', 'skills', 'custom-presentation-template') },
    // 2. Universal Agents Protocol
    { name: 'Universal Agents (.agents)', dir: path.join(home, '.agents', 'skills', 'custom-presentation-template') },
    // 3. Gemini CLI / Google DeepMind
    { name: 'Gemini CLI (.gemini)', dir: path.join(home, '.gemini', 'skills', 'custom-presentation-template') },
    // 4. Grok CLI (.grok)
    { name: 'Grok CLI (.grok)', dir: path.join(home, '.grok', 'skills', 'custom-presentation-template') },
    // 5. Continue.dev (.continue)
    { name: 'Continue.dev (.continue)', dir: path.join(home, '.continue', 'skills', 'custom-presentation-template') },
    // 6. OpenAI Codex (.codex)
    { name: 'OpenAI Codex (.codex)', dir: path.join(home, '.codex', 'skills', 'custom-presentation-template') },
    // 7. OpenCode (.opencode)
    { name: 'OpenCode (.opencode)', dir: path.join(home, '.opencode', 'skills', 'custom-presentation-template') },
    // 8. OpenMausBot (Auto-discovery)
    { name: 'OpenMausBot (imported-skills)', dir: path.join(home, '.openmausbot', 'imported-skills', 'custom-presentation-template') },
    // 9. OpenMausBot Canonical
    { name: 'OpenMausBot (skills mestre)', dir: path.join(home, '.openmausbot', 'skills', 'custom-presentation-template') }
  ];

  // 10. Provedores Antigravity (se existirem na máquina)
  const providersBase = path.join(home, '.openmausbot', 'providers', 'antigravity');
  if (fs.existsSync(providersBase)) {
    try {
      const hashes = fs.readdirSync(providersBase);
      for (const h of hashes) {
        const hashDir = path.join(providersBase, h);
        if (fs.statSync(hashDir).isDirectory()) {
          for (const sub of ['config', 'antigravity-cli']) {
            targets.push({
              name: `Antigravity (${sub})`,
              dir: path.join(hashDir, sub, 'skills', 'custom-presentation-template')
            });
          }
        }
      }
    } catch (e) {}
  }

  let successCount = 0;
  for (const t of targets) {
    try {
      // Se a pasta pai do ecossistema existir ou se for uma das principais, instala
      const parentEco = path.dirname(path.dirname(t.dir));
      if (fs.existsSync(parentEco) || t.name.includes('Claude') || t.name.includes('Agents') || t.name.includes('Codex') || t.name.includes('OpenCode')) {
        fs.mkdirSync(t.dir, { recursive: true });
        fs.writeFileSync(path.join(t.dir, 'SKILL.md'), SKILL_MD_CONTENT, 'utf-8');
        console.log(`✓ Instalado em [${t.name}]:\n  ${t.dir}\n`);
        successCount++;
      }
    } catch (err) {
      // continua para os outros
    }
  }

  console.log('------------------------------------------------------');
  console.log(`✓ Concluído com sucesso! Skill instalada em ${successCount} ambientes.`);
  console.log('Seus agentes (Claude, Antigravity, OpenMaus, Codex, Grok,');
  console.log('Gemini, Continue) agora conhecem a skill nativamente!');
  console.log('------------------------------------------------------\n');
}

module.exports = {
  installSkill,
  SKILL_MD_CONTENT
};
