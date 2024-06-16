import { generateHash } from '../server/utils/generate-hash'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
  const petya = await prisma.user.upsert({
    where: { email: 'petyamaiko@gmail.com' },
    update: {},
    create: {
      name: 'Petya',
      surname: 'Maiko',
      middleName: 'Vadimovich',
      email: 'petyamaiko@gmail.com',
      phone: '0989999999',
      password: generateHash('123')
    }
  })
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      name: 'Alice',
      surname: 'Alice Surname',
      middleName: 'Alice MiddleName',
      email: 'alice@prisma.io',
      phone: '0988888888',
      password: generateHash('123')
    }
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      name: 'Bob',
      surname: 'Bob Surname',
      middleName: 'Bob MiddleName',
      email: 'bob@prisma.io',
      phone: '0987777777',
      password: generateHash('123')
    }
  })
  console.log({ petya, alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
