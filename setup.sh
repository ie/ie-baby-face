#!/bin/bash

# Baby Face Migration Setup Script

echo "🚀 Setting up Baby Face Next.js Application"
echo "=========================================="

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Clean old dependencies
echo ""
echo "🧹 Cleaning old Gatsby dependencies..."
rm -rf node_modules package-lock.json .cache public

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check for .env file
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration:"
    echo "   - DATABASE_URL"
    echo "   - BLOB_READ_WRITE_TOKEN"
    echo "   - Competition dates"
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Prompt for database setup
echo ""
echo "📊 Database Setup"
echo "=================="
read -p "Do you want to push the database schema now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma db push
    echo "✅ Database schema created"
else
    echo "⏭️  Skipped. Run 'npx prisma db push' when ready"
fi

echo ""
echo "✨ Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "  1. Update .env with your configuration"
echo "  2. Run 'npm run dev' to start development server"
echo "  3. Visit http://localhost:3000"
echo ""
echo "For more information, see MIGRATION_README.md"
