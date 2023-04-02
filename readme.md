# CubicChat Frontend

## Getting Started

### Develop

1. copy .env.template and change to .env

2. replace value in {}

3. install dependencies

   ```
   yarn
   ```

4. start database

   ```
   docker compose up -d
   ```

5. migrate prisma schema

   ```
   yarn migrate
   ```

6. generate prisma client

   ```
   yarn generate
   ```

7. start development server

   ```
   yarn dev
   ```

## Optional

Can use prisma studio to view database

```
yarn prisma studio
```

the server will run at http://localhost:3000/ if not set .env
