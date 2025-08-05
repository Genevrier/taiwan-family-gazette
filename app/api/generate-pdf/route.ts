import { NextResponse } from 'next/server';
import { generatePDF } from '@/lib/pdf-generator';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll('photos') as File[];
    const descriptions = formData.getAll('descriptions') as string[];

    // Créer des fichiers temporaires pour les photos
    const photoPaths = await Promise.all(
      photos.map(async (photo, index) => {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = join(tmpdir(), `photo-${index}-${Date.now()}.jpg`);
        await writeFile(tempPath, buffer);
        return {
          path: tempPath,
          description: descriptions[index]
        };
      })
    );

    // Générer le PDF
    const pdfBuffer = await generatePDF(photoPaths);

    // Renvoyer le PDF généré
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=taiwan-family-gazette-${new Date().toISOString().split('T')[0]}.pdf`
      }
    });
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
}
