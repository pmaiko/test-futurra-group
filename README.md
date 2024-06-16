node 20.10.0


{
    // https://nuxt.com/docs/guide/concepts/typescript
    "extends": "./.nuxt/tsconfig.json",
    "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext"
}

database
npx prisma studio
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma migrate resolve --rolled-back "последняя_миграция"
