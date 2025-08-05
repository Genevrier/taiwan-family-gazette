const puppeteer = require('puppeteer');

export async function generateGazette(photos) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { size: A4; margin: 0; }
        body { font-family: 'Noto Sans TC', sans-serif; }
        .page { page-break-after: always; padding: 20mm; }
        .header { text-align: center; margin-bottom: 20px; }
        .photo-container { margin: 20px 0; }
        .photo { max-width: 100%; height: auto; }
        .description { margin-top: 10px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="page">
        <h1 class="header">家庭月報 - ${new Date().toLocaleDateString('zh-TW')}</h1>
        ${photos.map(photo => `
          <div class="photo-container">
            <img src="${photo.url}" class="photo" />
            <p class="description">${photo.description}</p>
          </div>
        `).join('')}
      </div>
    </body>
    </html>
  `;
  
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();
  
  return pdf;
}
