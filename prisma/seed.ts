import { title } from "process";
import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Post 1",
    slug: "",
    content: "",
    user: {
      connectOrCreate: {
        where: {
          email: "john@gmail.com",
        },

        create: {
          email: "john@gmail.com",
          hashedPassword: "hashedPassword",
        },
      },
      connect: undefined,
    },
  },
];

async function main() {
  console.log(`Start seeding...`);

  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${newPost.id}`);
  }
  console.log(`seeding finished.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
