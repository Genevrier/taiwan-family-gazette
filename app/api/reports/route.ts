import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

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
    const reports = await prismaClient.report.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        date: true,
        status: true,
        createdAt: true
      }
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
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

    const { title, date, photoIds } = await request.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: 'Title and date are required' },
        { status: 400 }
      );
    }

    const prismaClient = await getPrisma();

    // Create the report
    const report = await prismaClient.report.create({
      data: {
        title,
        date: new Date(date),
        userId: user.id,
        status: 'DRAFT'
      }
    });

    // If photo IDs are provided, link them to the report
    if (photoIds && photoIds.length > 0) {
      const reportPhotos = photoIds.map((photoId: string, index: number) => ({
        reportId: report.id,
        photoId,
        order: index
      }));

      await prismaClient.reportPhoto.createMany({
        data: reportPhotos
      });
    }

    return NextResponse.json({
      message: 'Report created successfully',
      report
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 