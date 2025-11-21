# Baby Face 2025 🍼

Movember Baby Face Competition - A fun guessing game where colleagues match baby photos to current employees.

## 🎮 About

This is the 2025 edition of the IE Baby Face competition, rebuilt from Gatsby to Next.js. Players guess which baby photo belongs to which colleague, with proceeds going to Movember.

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and Blob storage credentials

# Set up database
npx prisma db push

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📚 Full Documentation

See [MIGRATION_README.md](./MIGRATION_README.md) for complete setup instructions, architecture details, and deployment guide.

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL + Prisma
- **Storage:** Cloudinary
- **Styling:** Styled Components
- **Language:** TypeScript

## 🚀 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ie/ie-baby-face)

## 📝 License

MIT
