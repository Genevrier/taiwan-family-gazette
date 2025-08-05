import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier n\'a été téléchargé' },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer un nom de fichier unique
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, fileName);

    // Sauvegarder le fichier
    await writeFile(filePath, buffer);

    // Retourner l'URL du fichier
    return NextResponse.json({ 
      url: `/uploads/${fileName}`,
      success: true 
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    return NextResponse.json(
      { error: 'Erreur lors du téléchargement du fichier' },
      { status: 500 }
    );
  }
}
