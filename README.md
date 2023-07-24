nestjs + swagger + prisma + jest + docker + jenkins

## node -v

18.15.0

## nest cli

1. npm i @nestjs/cli
2. nest generate \<schematic> \<path/name> [options]  
   `nest g co v1/test`

## prisma

- install

  1.  npm i prisma
  2.  npm i prettier-plugin-prisma
  3.  install the prisma extension

- setting

  1.  set db url in schema.prisma
  2.  write the models
  3.  npx prisma migrate dev --name init

- etc
  - Prisma is fine for simple queries, but there are performance issues for complex queries. So, I will use it for db schema management. mysql2 will be used for db queries.
