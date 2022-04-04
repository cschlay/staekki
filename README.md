# Staekki

Monorepo for stack recommender, could be customized to recommend e.g. shopping items.

## Docker and Native

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

## Vagrant

Ensure that you have vagrant installed and run `vagrant up`, then `vagrant ssh` and do your stuff.
You can run the scripts found in ./sh/ directory.
