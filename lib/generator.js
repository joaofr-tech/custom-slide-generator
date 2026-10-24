const path = require('path');
const fs = require('fs');
const os = require('os');
const pptxgen = require('pptxgenjs');

// Cores e Parâmetros Determinísticos
const COLOR_BG = 'FFFBF4';
const COLOR_TITLE = '222223';
const COLOR_BODY = '000000';
const COLOR_MUTED = '343434';

const FONT_TITLE = 'Open Sauce Bold';
const FONT_BODY = 'Open Sans';
const FONT_META = 'DM Sans';

function estimateTitleHeight(text, fontSizePt = 60, boxWidthIn = 12.5) {
  const charWidthIn = (fontSizePt * 0.58) / 72.0;
  const charsPerLine = Math.max(1, Math.floor(boxWidthIn / charWidthIn));
  const words = text.split(/\s+/);
  let lines = 1;
  let curLen = 0;
  for (const w of words) {
    if (curLen + w.length + 1 <= charsPerLine) {
      curLen += w.length + 1;
    } else {
      lines++;
      curLen = w.length;
    }
  }
  const lineHeightIn = (fontSizePt * 1.25) / 72.0;
  return lines * lineHeightIn;
}

async function buildPresentation(jsonData, outputPath, options = {}) {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'CUSTOM_20x1125', width: 20.0, height: 11.25 });
  pptx.layout = 'CUSTOM_20x1125';

  const slides = jsonData.slides || [];
  const defaultDate = jsonData.default_date || 'Outubro, 2026';

  for (const slideData of slides) {
    const slide = pptx.addSlide();
    slide.background = { color: COLOR_BG };

    // Notas do Orador
    if (slideData.note) {
      slide.addNotes(slideData.note);
    }

    // Data no Canto Superior Direito
    const dateStr = slideData.date || defaultDate;
    slide.addText(dateStr, {
      x: 16.03,
      y: 0.83,
      w: 2.84,
      h: 0.40,
      fontSize: 18,
      fontFace: FONT_META,
      color: COLOR_MUTED,
      align: 'right',
      margin: 0
    });

    if (slideData.type === 'cover') {
      // 1. Tag / Categoria Superior
      slide.addText(slideData.tag || 'Projeto', {
        x: 1.12,
        y: 2.40,
        w: 12.0,
        h: 0.90,
        fontSize: 64,
        fontFace: FONT_TITLE,
        color: COLOR_TITLE,
        bold: true,
        margin: 0
      });

      // 2. Título Principal da Capa
      slide.addText(slideData.title, {
        x: 1.12,
        y: 3.60,
        w: 12.2,
        h: 4.20,
        fontSize: 56,
        fontFace: FONT_TITLE,
        color: COLOR_TITLE,
        bold: false,
        margin: 0
      });

      // 3. Metadados do Apresentador
      if (slideData.author_label) {
        slide.addText(slideData.author_label, {
          x: 1.12,
          y: 8.38,
          w: 4.0,
          h: 0.55,
          fontSize: 28,
          fontFace: FONT_META,
          color: COLOR_MUTED,
          margin: 0
        });

        if (slideData.author_val) {
          slide.addText(slideData.author_val, {
            x: 1.12,
            y: 8.98,
            w: 8.0,
            h: 1.20,
            fontSize: 32,
            fontFace: FONT_META,
            color: COLOR_MUTED,
            bold: true,
            margin: 0
          });
        }
      }

      // 4. Ilustração/Sticker da Capa
      if (slideData.icon && fs.existsSync(slideData.icon)) {
        slide.addImage({
          path: slideData.icon,
          x: 13.8,
          y: 3.2,
          w: 4.8,
          h: 4.8
        });
      }
    } else {
      // SLIDE DE CONTEÚDO
      const titleText = slideData.title;
      const titleFontPt = 60;
      const boxWidth = 12.5;
      const titleStartY = 1.80;

      const calcHeight = estimateTitleHeight(titleText, titleFontPt, boxWidth);
      slide.addText(titleText, {
        x: 1.12,
        y: titleStartY,
        w: boxWidth,
        h: calcHeight,
        fontSize: titleFontPt,
        fontFace: FONT_TITLE,
        color: COLOR_TITLE,
        bold: true,
        margin: 0
      });

      // Cálculo Dinâmico Anti-Sobreposição
      const bodyStartY = titleStartY + calcHeight + 0.60;
      const availableH = 10.60 - bodyStartY;
      const paragraphs = slideData.paragraphs || [];
      const numP = Math.max(1, paragraphs.length);
      const slotH = availableH / numP;

      let curY = bodyStartY;
      for (const pTokens of paragraphs) {
        // pTokens pode ser string ou array de tuplas [texto, isBold]
        let textRuns = [];
        if (typeof pTokens === 'string') {
          textRuns = [{ text: pTokens, options: { fontSize: 30, fontFace: FONT_BODY, color: COLOR_BODY } }];
        } else if (Array.isArray(pTokens)) {
          textRuns = pTokens.map(chunk => {
            if (Array.isArray(chunk)) {
              return {
                text: chunk[0],
                options: {
                  fontSize: 30,
                  fontFace: FONT_BODY,
                  color: COLOR_BODY,
                  bold: Boolean(chunk[1])
                }
              };
            }
            return { text: String(chunk), options: { fontSize: 30, fontFace: FONT_BODY, color: COLOR_BODY } };
          });
        }

        slide.addText(textRuns, {
          x: 1.12,
          y: curY,
          w: 12.0,
          h: slotH - 0.20,
          margin: 0
        });

        curY += slotH;
      }

      // Sticker / Imagem do Slide
      if (slideData.icon && fs.existsSync(slideData.icon)) {
        slide.addImage({
          path: slideData.icon,
          x: 14.2,
          y: 3.6,
          w: 4.8,
          h: 4.8
        });
      }
    }
  }

  // Grava o arquivo
  const resolvedOut = path.resolve(outputPath);
  await pptx.writeFile({ fileName: resolvedOut });

  // Cópia opcional automática para Downloads
  if (options.copyToDownloads !== false) {
    try {
      const userHome = os.homedir();
      const downloadsDir = path.join(userHome, 'Downloads');
      if (fs.existsSync(downloadsDir)) {
        const dst = path.join(downloadsDir, path.basename(resolvedOut));
        fs.copyFileSync(resolvedOut, dst);
        return { file: resolvedOut, downloads: dst };
      }
    } catch (e) {
      // silencioso se downloads não estiver acessível
    }
  }

  return { file: resolvedOut };
}

module.exports = {
  buildPresentation,
  estimateTitleHeight
};
