#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildPresentation } = require('../lib/generator');
const { installSkill } = require('../lib/installer');

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
======================================================
         Custom Slide Generator & Skill Tool
======================================================

Uso:
  1. Para BAIXAR e INSTALAR a skill na máquina atual:
     npx custom-slide-generator
     # ou: npx custom-slide-generator install

  2. Para GERAR uma apresentação PowerPoint (.pptx):
     npx custom-slide-generator <roteiro.json> [opções]

  3. Para CRIAR um arquivo modelo de exemplo:
     npx custom-slide-generator --init

Opções:
  -o, --output <caminho>    Nome ou caminho do arquivo .pptx de saída
  --no-downloads            Não copia automaticamente para a pasta ~/Downloads
  --install                 Força a instalação/atualização da skill para Claude e Antigravity
  --init                    Cria o arquivo 'template-slide-input.json' de exemplo
  -h, --help                Exibe esta mensagem de ajuda

Exemplos:
  # Baixa a skill na máquina:
  npx custom-slide-generator

  # Gera o slide:
  npx custom-slide-generator apresentacao.json -o MinhaApresentacao.pptx
`);
}

function generateSample() {
  const sample = {
    default_date: "Outubro, 2026",
    slides: [
      {
        type: "cover",
        tag: "Arquitetura de Sistemas",
        title: "Título Impactante da Sua Apresentação",
        author_label: "Apresentação:",
        author_val: "Seu Nome & Equipe",
        date: "Outubro, 2026",
        icon: "caminho/para/sticker_capa.png",
        note: "Texto com o roteiro que o orador deve falar durante o primeiro slide."
      },
      {
        type: "content",
        title: "Primeiro Tópico Principal",
        date: "Outubro, 2026",
        icon: "caminho/para/sticker_slide.png",
        paragraphs: [
          [
            ["Primeiro bloco explicando o conceito com ", false],
            ["palavras-chave em negrito", true],
            [" para guiar o olhar da audiência.", false]
          ],
          [
            ["Segundo bloco detalhando ", false],
            ["fatores determinísticos", true],
            [" com respiro visual equilibrado.", false]
          ]
        ],
        note: "Roteiro da fala do orador para este slide específico."
      }
    ]
  };

  const filename = 'template-slide-input.json';
  fs.writeFileSync(filename, JSON.stringify(sample, null, 2), 'utf-8');
  console.log(`\n✓ Arquivo de exemplo criado: ${path.resolve(filename)}`);
  console.log(`Você pode editá-lo e rodar:\n  npx custom-slide-generator ${filename}\n`);
}

async function main() {
  // 1. Sem argumentos ou comando 'install' -> Baixa e instala a skill
  if (args.length === 0 || args[0] === 'install' || args.includes('--install')) {
    installSkill();
    process.exit(0);
  }

  // 2. Ajuda
  if (args.includes('-h') || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  // 3. Inicializar modelo de exemplo
  if (args.includes('--init')) {
    generateSample();
    process.exit(0);
  }

  // 4. Compilar apresentação
  const inputFile = args[0];
  if (!fs.existsSync(inputFile)) {
    console.error(`\nErro: Arquivo '${inputFile}' não encontrado.`);
    console.log(`Para baixar a skill, rode: npx custom-slide-generator install`);
    console.log(`Para ver ajuda, rode: npx custom-slide-generator --help\n`);
    process.exit(1);
  }

  let outputFile = 'Apresentacao.pptx';
  const outIndex = args.findIndex(a => a === '-o' || a === '--output');
  if (outIndex !== -1 && args[outIndex + 1]) {
    outputFile = args[outIndex + 1];
  } else {
    const base = path.basename(inputFile, path.extname(inputFile));
    outputFile = `${base}.pptx`;
  }

  const copyToDownloads = !args.includes('--no-downloads');

  try {
    const rawData = fs.readFileSync(inputFile, 'utf-8');
    const jsonData = JSON.parse(rawData);

    console.log(`\nGerando apresentação a partir de '${inputFile}'...`);
    const result = await buildPresentation(jsonData, outputFile, { copyToDownloads });

    console.log(`✓ Apresentação salva: ${result.file}`);
    if (result.downloads) {
      console.log(`✓ Cópia disponível em Downloads: ${result.downloads}`);
    }
    console.log('\nPronto!');
  } catch (err) {
    console.error('\nErro ao gerar a apresentação:', err.message);
    process.exit(1);
  }
}

main();
