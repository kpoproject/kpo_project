# Setup

Run setup/setup.sh
From backend root folder:

```bash
./setup/setup.sh
```

# Usage

From backend root folder:

```bash
POSTGRES_DB="libralib" POSTGRES_USER="postgres" POSTGRES_HOST="localhost" POSTGRES_PORT=5432 POSTGRES_PASSWORD="a" APP_PORT=3030 npm run devstart # Or
POSTGRES_DB="libralib" POSTGRES_USER="postgres" POSTGRES_HOST="localhost" POSTGRES_PORT=5432 POSTGRES_PASSWORD="a" APP_PORT=3030 npm run start
```

# Tests

```bash
npm run test:unit &&
npm run test:integration
```
