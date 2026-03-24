#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting BookIt backend and frontend..."
(cd "$PROJECT_ROOT/server" && npm run dev) &
(cd "$PROJECT_ROOT/client" && npm run dev) &

echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
wait
