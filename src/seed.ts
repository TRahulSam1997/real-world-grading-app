import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  await prisma.user.deleteMany({});

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

  // console.log(user);

  const weekFromNow = add(new Date(), { days: 7 })
  const twoWeeksFromNow = add(new Date(), { days: 14 })
  const monthFromNow = add(new Date(), { days: 28 })

  const course = await prisma.course.create({
    data: {
      name: 'CRUD with Prisma in the real world',
      courseDetails: 'Learn how to use Prisma to build a real world CRUD application',
      tests: {
        create: [
          {
            date: weekFromNow,
            name: 'First Test'
          },
          {
            date: twoWeeksFromNow,
            name: 'Second Test'
          },
          {
            date: monthFromNow,
            name: 'Final Exam'
          },
        ]
      }
    }
  })

  console.log(course);

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