node 20.10.0

## Старт проекту
### Створюємо .env
```
cp .env.example .env
```

### Встановити залежності
```
npm ci
```

### Збірка для виробництва та запуску сервера
```
npm run build
npm run start
```

## database
```
npx prisma studio
npx prisma migrate dev
npx prisma migrate dev --name init
npx prisma migrate resolve --rolled-back "последняя_миграция"
```
