#!/bin/bash

# Clean up NextAuth related files
echo "Cleaning up NextAuth files..."

# Remove NextAuth API route directory
if [ -d "src/app/api/auth" ]; then
  rm -rf src/app/api/auth
  echo "✅ Removed src/app/api/auth directory"
fi

echo "✅ Cleanup completed!"