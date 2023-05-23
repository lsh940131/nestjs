nestjs + swagger + prisma + jest + docker + jenkins

## nest cli

> nest g controller
> nest g service
> https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production

## prisma

### install

1.  npm i prisma
2.  npm i prettier-plugin-prisma
3.  install the prisma extension

### setting

1. set db url in schema.prisma
2. write the models
3. npx prisma migrate dev --name init
   > tables are created according to the models
