import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

// Dynamic import to avoid build-time issues
let prisma: any = null;

async function getPrisma() {
  if (!prisma) {
    try {
      const { prisma: PrismaClient } = await import('@/lib/db');
      prisma = PrismaClient;
    } catch (error) {
      console.error('Failed to initialize Prisma client:', error);
      throw new Error('Database connection failed');
    }
  }
  return prisma;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Get user from Supabase auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const prismaClient = await getPrisma();
    const photos = await prismaClient.photo.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        originalName: true,
        description: true,
        createdAt: true,
        mimeType: true,
        size: true
      }
    });

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient();
    
    // Get user from Supabase auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const descriptions = formData.getAll('descriptions') as string[];

    const uploadedPhotos = [];
    const prismaClient = await getPrisma();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const description = descriptions[i] || '';

      if (!file) continue;

      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop();
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${extension}`;
      
      // Save file to temporary directory
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = join(tmpdir(), filename);
      await writeFile(filePath, buffer);

      // Save to database
      const photo = await prismaClient.photo.create({
        data: {
          filename,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          path: filePath,
          description,
          userId: user.id
        }
      });

      uploadedPhotos.push(photo);
    }

    return NextResponse.json({
      message: 'Photos uploaded successfully',
      photos: uploadedPhotos
    });
  } catch (error) {
    console.error('Error uploading photos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 