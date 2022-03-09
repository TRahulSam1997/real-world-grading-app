import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'grace@hey.com',
      firstName: 'Grace',
      lastName: 'Bell',
      social: {
        facebook: 'gracebell',
        twitter: 'gracebell'
      }
    }
  })

}

main()
  .catch((e: Error) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect()
  })
