# Baby Face 2025 - Next.js Migration

Movember Baby Face Competition - Migrated from Gatsby + Firebase to Next.js + Prisma

## 🚀 Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Storage:** Vercel Blob Storage
- **Styling:** Styled Components
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or hosted)
- Vercel account (for Blob Storage)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/baby_face?schema=public"
```

### 3. Prisma Setup

Generate Prisma Client and run migrations:

```bash
npx prisma generate
npx prisma db push
```

To view and manage your database:

```bash
npx prisma studio
```

### 4. Vercel Blob Storage

1. Create a Vercel account if you don't have one
2. Install Vercel CLI: `npm i -g vercel`
3. Link your project: `vercel link`
4. Get your Blob storage token: `vercel env pull`
5. Add `BLOB_READ_WRITE_TOKEN` to your `.env` file

### 5. Environment Variables

Configure all required environment variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/baby_face"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your_token_here"

# Competition Dates (format: YYYYMMDD)
NEXT_PUBLIC_COMPETITION_START="20251117"
NEXT_PUBLIC_COMPETITION_END="20251130"

# Optional: Admin secret for sync endpoint
ADMIN_SECRET="your_secret_here"
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── api/             # API routes
│   │   ├── guesses/     # Guess management
│   │   ├── photos/      # Photo management
│   │   ├── players/     # Player management
│   │   └── stats/       # Statistics
│   ├── donate/          # Donation page
│   ├── guess/           # Game interface
│   ├── play/            # Name entry
│   ├── stats/           # Leaderboard
│   ├── sync/            # Admin photo upload
│   ├── thanks/          # Thank you page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable React components
├── contexts/            # React Context (Player state)
├── lib/                 # Utilities and helpers
│   ├── prisma.ts        # Prisma client
│   ├── blob-storage.ts  # Image upload utilities
│   ├── competition.ts   # Date logic
│   └── registry.tsx     # Styled-components SSR
├── styles/              # Global styles and themes
└── types/               # TypeScript type definitions
prisma/
└── schema.prisma        # Database schema
```

## 🎮 How to Play

1. **Setup Phase** (Admin):
   - Navigate to `/sync`
   - Upload employee baby photos
   - Photos are stored in Vercel Blob Storage and URLs in database

2. **Player Phase**:
   - Visit home page
   - Click "Play" when competition is active
   - Enter your name
   - Match baby photos to current employee names
   - Submit guesses

3. **Results Phase**:
   - View leaderboard at `/stats`
   - See who guessed correctly
   - Check per-photo statistics

## 🔄 Migration from Gatsby

### Key Changes

1. **Framework:** Gatsby → Next.js 14 App Router
2. **Database:** Firebase Firestore → PostgreSQL with Prisma
3. **State:** Redux → React Context
4. **Images:** Base64 in database → Vercel Blob Storage URLs
5. **Routing:** Gatsby Links → Next.js Links
6. **Data Fetching:** GraphQL → API Routes + Prisma

### Database Schema

```prisma
model Photo {
  id       String @id @default(cuid())
  name     String
  imageUrl String
  guesses  Guess[]
}

model Player {
  id      String @id @default(cuid())
  name    String
  guesses Guess[]
}

model Guess {
  id          String @id @default(cuid())
  playerId    String
  photoId     String
  guessedName String
  player      Player @relation(...)
  photo       Photo  @relation(...)
  
  @@unique([playerId, photoId])
}
```

### API Endpoints

- `GET /api/photos` - Fetch all photos
- `POST /api/photos` - Create new photo (admin)
- `POST /api/players` - Create player session
- `GET /api/players` - List all players with guesses
- `POST /api/guesses` - Submit a guess
- `GET /api/guesses?playerId=xxx` - Get player's guesses
- `GET /api/stats` - Get leaderboard and photo stats

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

Vercel will automatically:
- Build the Next.js application
- Set up PostgreSQL database (with Vercel Postgres addon)
- Configure Blob Storage
- Deploy to production

### Manual Deployment

1. Build the application: `npm run build`
2. Ensure DATABASE_URL points to production database
3. Run migrations: `npx prisma migrate deploy`
4. Start server: `npm start`

## 📝 Admin Tasks

### Syncing Photos

1. Place baby photos in `src/images/` directory
2. Create `src/data/participants.json` with participant data:
   ```json
   [
     {
       "name": "John Doe",
       "image": "john-doe.jpg"
     }
   ]
   ```
3. Navigate to `/sync` endpoint
4. Photos will be uploaded to Blob Storage and saved to database

### Updating Competition Dates

Edit environment variables:
- `NEXT_PUBLIC_COMPETITION_START` - Format: YYYYMMDD
- `NEXT_PUBLIC_COMPETITION_END` - Format: YYYYMMDD

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

### Image Upload Fails

- Ensure `BLOB_READ_WRITE_TOKEN` is set correctly
- Check Vercel Blob Storage quota
- Verify image file sizes are under limits

### TypeScript Errors

```bash
# Regenerate Prisma Client
npx prisma generate

# Type check
npm run build
```

## 📄 License

MIT

## 👥 Credits

- Original Gatsby version: David Johnson
- Next.js migration: 2024
- Movember Foundation
