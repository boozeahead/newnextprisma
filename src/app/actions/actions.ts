"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../client";
import { Prisma } from "../../../generated/prisma";

export async function createPost(formData: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formData.get("content") as string,
        user: {
          connect: {
            email: "John@gmail.com",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      {
        if (error.code === "P2002") {
          console.log("This is unique constraint violation error");
        }
      }
    }
  }

  revalidatePath("/posts");
}

export async function editPost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.post.delete({
    where: {
      id,
    },
  });
}
