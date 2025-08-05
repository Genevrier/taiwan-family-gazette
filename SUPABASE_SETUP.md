# Taiwan Family Gazette - Supabase Setup Guide

## Why Supabase for MVP?

✅ **Free tier**: 500MB database, 50MB file storage, 2GB bandwidth  
✅ **Zero setup**: No server management required  
✅ **Built-in auth**: Can replace NextAuth if needed  
✅ **File storage**: Built-in S3-compatible storage  
✅ **Real-time**: Built-in subscriptions  
✅ **Same Prisma**: Works exactly like PostgreSQL  

## Quick Setup (5 minutes)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (free)
4. Create new project
5. Choose a name: `taiwan-family-gazette`
6. Set a database password (save it!)
7. Choose region (closest to Taiwan: `ap-southeast-1`)

### 2. Get Your Connection Details

In your Supabase dashboard:
1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

### 3. Set Environment Variables

Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database (Supabase provides this)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
```

### 4. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase (no migrations needed for MVP)
npx prisma db push

# Optional: View your data in Supabase dashboard
npx prisma studio
```

### 5. Start Development

```bash
npm run dev
```

## Cost Comparison

| Feature | Self-hosted PostgreSQL | Supabase |
|---------|----------------------|----------|
| **Setup** | 2-4 hours | 5 minutes |
| **Monthly cost** | $5-20/month | $0 (free tier) |
| **Maintenance** | High | Zero |
| **Scaling** | Manual | Automatic |
| **Backups** | Manual setup | Automatic |
| **Monitoring** | Manual setup | Built-in |

## Free Tier Limits

- **Database**: 500MB
- **File storage**: 50MB  
- **Bandwidth**: 2GB/month
- **Auth users**: Unlimited
- **API calls**: 50,000/month

**Perfect for MVP!** You'll only pay if you exceed these limits.

## File Storage with Supabase

For production, you can use Supabase Storage instead of local files:

```typescript
// Upload file to Supabase Storage
const { data, error } = await supabase.storage
  .from('photos')
  .upload(`user-${userId}/${filename}`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('photos')
  .getPublicUrl(`user-${userId}/${filename}`);
```

## Migration Benefits

1. **No server management**
2. **Automatic backups**
3. **Built-in security**
4. **Real-time subscriptions**
5. **Auto-scaling**
6. **Better developer experience**

## Next Steps

1. **Set up Supabase project** (5 minutes)
2. **Update environment variables**
3. **Push database schema**
4. **Test the application**
5. **Deploy when ready**

Your MVP will be production-ready with zero infrastructure costs! 