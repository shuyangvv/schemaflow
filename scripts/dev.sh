#!/bin/bash

# Development helper script
# Usage: ./scripts/dev.sh [command]

set -e

COMMAND=${1:-start}

case $COMMAND in
    start)
        echo "🚀 Starting SchemaFlow development servers..."
        echo ""
        echo "📦 Installing dependencies..."
        pnpm install
        echo ""
        echo "🗄️  Setting up database..."
        cd apps/server && pnpm db:generate && cd ../..
        echo ""
        echo "✅ Starting servers..."
        echo "   Frontend: http://localhost:3000"
        echo "   Backend:  http://localhost:3001"
        echo ""
        pnpm dev
        ;;
    
    db:reset)
        echo "🗄️  Resetting database..."
        cd apps/server
        rm -f dev.db dev.db-journal
        pnpm db:migrate
        pnpm db:generate
        echo "✅ Database reset complete"
        ;;
    
    db:studio)
        echo "🗄️  Opening Prisma Studio..."
        cd apps/server && pnpm db:studio
        ;;
    
    test)
        echo "🧪 Running tests..."
        pnpm test
        ;;
    
    lint)
        echo "🔍 Running linters..."
        pnpm lint
        ;;
    
    build)
        echo "📦 Building..."
        pnpm build
        ;;
    
    clean)
        echo "🧹 Cleaning..."
        pnpm clean
        ;;
    
    spec)
        echo "📋 Available specs:"
        ls -1 specs/ | while read dir; do
            if [ -d "specs/$dir" ]; then
                name=$(echo "$dir" | cut -d'-' -f2-)
                number=$(echo "$dir" | cut -d'-' -f1)
                echo "  [$number] $name"
            fi
        done
        ;;
    
    help|*)
        echo "SchemaFlow Development Helper"
        echo ""
        echo "Usage: ./scripts/dev.sh [command]"
        echo ""
        echo "Commands:"
        echo "  start      Start development servers (default)"
        echo "  db:reset   Reset database to fresh state"
        echo "  db:studio  Open Prisma Studio"
        echo "  test       Run all tests"
        echo "  lint       Run linters"
        echo "  build      Build for production"
        echo "  clean      Clean node_modules and build outputs"
        echo "  spec       List available specs"
        echo "  help       Show this help"
        ;;
esac
