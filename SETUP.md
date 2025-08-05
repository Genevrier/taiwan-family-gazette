# Taiwan Family Gazette - Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/taiwan_family_gazette"
   NEXTAUTH_URL="http://localhost:3001"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Features Added

### Authentication
- ✅ User registration and login
- ✅ Session management with NextAuth.js
- ✅ Protected routes and API endpoints
- ✅ Password hashing with bcrypt

### Database
- ✅ PostgreSQL database with Prisma ORM
- ✅ User management (users table)
- ✅ Photo storage and management (photos table)
- ✅ Report creation and management (reports table)
- ✅ Report-Photo relationships (report_photos table)

### User Interface
- ✅ Sign in page (`/auth/signin`)
- ✅ Sign up page (`/auth/signup`)
- ✅ Dashboard (`/dashboard`) - shows user's photos and reports
- ✅ Protected upload functionality
- ✅ Report creation interface

### API Endpoints
- ✅ `/api/auth/register` - User registration
- ✅ `/api/photos` - Photo upload and retrieval
- ✅ `/api/reports` - Report creation and retrieval
- ✅ `/api/generate-pdf` - PDF generation from database photos

## Database Schema

### Users
- id (CUID)
- email (unique)
- name (optional)
- password (hashed)
- createdAt, updatedAt

### Photos
- id (CUID)
- filename, originalName
- mimeType, size
- path (file system path)
- description (optional)
- userId (foreign key)
- createdAt, updatedAt

### Reports
- id (CUID)
- title
- date
- status (DRAFT, PUBLISHED, ARCHIVED)
- userId (foreign key)
- createdAt, updatedAt

### ReportPhotos (junction table)
- id (CUID)
- reportId (foreign key)
- photoId (foreign key)
- order (for photo ordering)

## Usage

1. **Register a new account** at `/auth/signup`
2. **Sign in** at `/auth/signin`
3. **Upload photos** through the dashboard
4. **Create reports** by selecting photos and adding descriptions
5. **Generate PDFs** from your reports

## Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected API endpoints
- ✅ User-specific data isolation
- ✅ Input validation and sanitization

## File Storage

Photos are stored in the system's temporary directory and referenced in the database. For production, consider using cloud storage services like AWS S3 or Google Cloud Storage. 