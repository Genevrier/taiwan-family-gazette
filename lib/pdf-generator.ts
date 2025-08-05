import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';
import { join } from 'path';

interface PhotoInfo {
  path: string;
  description: string;
}

export async function generatePDF(photos: PhotoInfo[]): Promise<Buffer> {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // Lire le template HTML
    const templatePath = join(process.cwd(), 'templates', 'gazette.html');
    let template = readFileSync(templatePath, 'utf-8');

    // Remplacer les variables dans le template
    const date = new Date().toLocaleDateString('zh-TW');
    const photosHtml = photos
      .map(photo => `
        <div class="photo-container">
          <img src="file://${photo.path}" class="photo" />
          ${photo.description ? `<p class="photo-description">${photo.description}</p>` : ''}
        </div>
      `)
      .join('');

    template = template
      .replace('{{date}}', date)
      .replace('{{photos}}', photosHtml)
      .replace('{{year}}', new Date().getFullYear().toString());

    await page.setContent(template, {
      waitUntil: 'networkidle0'
    });

    // Générer le PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    return pdf;
  } finally {
    await browser.close();
  }
}
