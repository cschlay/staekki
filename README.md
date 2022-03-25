# Staekki

Monorepo for stack recommender, could be customized to recommend e.g. shopping items.

```bash
docker-compose up
```

Add `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/main` to `/backend/.env`

```bash
# Console 1
cd backend
npm install
npx prisma generate
npx prisma deploy
npm run dev
```

```bash
# Console 2
cd frontend
npm install
npm run dev
```
