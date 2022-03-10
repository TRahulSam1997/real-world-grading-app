import { PrismaClient } from "@prisma/client";
import { add } from "date-fns";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  await prisma.courseEnrollment.deleteMany({});
  await prisma.testResult.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.test.deleteMany({});
  await prisma.course.deleteMany({});

  const grace = await prisma.user.create({
    data: {
      email: "grace@hey.com",
      firstName: "Grace",
      lastName: "Bell",
      social: {
        facebook: "gracebell",
        twitter: "gracebell",
      },
    },
  });

  // console.log(user);

  const weekFromNow = add(new Date(), { days: 7 });
  const twoWeeksFromNow = add(new Date(), { days: 14 });
  const monthFromNow = add(new Date(), { days: 28 });

  const course = await prisma.course.create({
    data: {
      name: "CRUD with Prisma in the real world",
      courseDetails:
        "Learn how to use Prisma to build a real world CRUD application",
      tests: {
        create: [
          {
            date: weekFromNow,
            name: "First Test",
          },
          {
            date: twoWeeksFromNow,
            name: "Second Test",
          },
          {
            date: monthFromNow,
            name: "Final Exam",
          },
        ],
      },
      members: {
        create: {
          role: "TEACHER",
          user: {
            connect: { email: grace.email },
          },
        },
      },
    },
    include: {
      tests: true,
      members: { include: { user: true } },
    },
  });

  // console.log(course);

  const shakuntala = await prisma.user.create({
    data: {
      email: "devi@prisma.io",
      firstName: "Shakuntala",
      lastName: "Devi",
      social: {
        twitter: "dev1",
      },
      courses: {
        create: {
          role: "STUDENT",
          course: {
            connect: { id: course.id },
          },
        },
      },
    },
  });

  const david = await prisma.user.create({
    data: {
      email: "david@prisma.io",
      firstName: "David",
      lastName: "Deutsch",
      social: {
        twitter: "daviddeutsch",
      },
      courses: {
        create: {
          role: "STUDENT",
          course: {
            connect: { id: course.id },
          },
        },
      },
    },
  });

  const testResults = [800, 950, 700];

  let counter = 0;
  for (const test of course.tests) {
    const shakuntalaTestResult = await prisma.testResult.create({
      data: {
        gradedBy: { connect: { email: grace.email } },
        student: { connect: { email: shakuntala.email } },
        test: { connect: { id: test.id } },
        result: testResults[counter],
      },
    });
    counter++;
  }

  // const results = await prisma.testResult.aggregate({
  //   where: {
  //     testId: shakuntala.id,
  //   },
  //   avg: { result: true },
  //   max: { result: true },
  //   min: { result: true },
  //   count: true,
  // });

  // console.log(results);
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
