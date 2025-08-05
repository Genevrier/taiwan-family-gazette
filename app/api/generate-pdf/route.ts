import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const descriptions = formData.getAll('descriptions') as string[];

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });
    
    const page = await browser.newPage();
    
    // Generate photos HTML
    const photosHtml = await Promise.all(
      photos.map(async (photo, index) => {
        const base64 = await fileToBase64(photo);
        return `
          <div class="photo-container">
            <img src="${base64}" class="photo" alt="Family photo" />
            <p class="description">${descriptions[index] || ''}</p>
          </div>
        `;
      })
    );
    
    // Generate complete HTML
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body { 
            font-family: 'Noto Sans TC', sans-serif;
            color: #333;
          }
          
          .page {
            padding: 20mm;
            max-width: 210mm;
            margin: 0 auto;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: #f3f4f6;
            border-radius: 10px;
          }
          
          .header h1 {
            color: #2563eb;
            margin-bottom: 10px;
            font-size: 28px;
          }
          
          .date {
            color: #6b7280;
            font-size: 16px;
          }
          
          .photo-container {
            margin: 30px 0;
            page-break-inside: avoid;
          }
          
          .photo {
            width: 100%;
            max-height: 400px;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .description {
            margin-top: 15px;
            font-size: 16px;
            line-height: 1.8;
            color: #374151;
            text-align: center;
          }
          
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="header">
            <h1>台灣家庭月報</h1>
            <p class="date">${new Date().toLocaleDateString('zh-TW', { 
              year: 'numeric', 
              month: 'long' 
            })}</p>
          </div>
          
          ${photosHtml.join('')}
          
          <div class="footer">
            <p>用愛連結每一刻 ❤️</p>
            <p>台灣家庭月報 - ${new Date().getFullYear()}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({ 
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });
    
    await browser.close();
    
    // Return PDF as response
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="family-gazette-${Date.now()}.pdf"`
      }
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
